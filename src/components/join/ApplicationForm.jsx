import React, { useId, useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Loader2,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";
import confetti from "canvas-confetti";
import { BOOKING_OFFICE } from "../../data/landingData";
import { submitApplication } from "../../lib/submitApplication";
import { Label, inputBase } from "../formUI";

/* ------------------------------------------------------------------ */
/*  Validators (exported so each page can compose its own fields)       */
/* ------------------------------------------------------------------ */
export const normalizeMobile = (value = "") => {
  const digits = value.replace(/[\s\-().]/g, "");
  return digits.replace(/^(\+?91|0)(?=\d{10}$)/, "");
};

export const v = {
  required: (label) => (value) =>
    value.trim() ? "" : `Please enter ${label}`,
  name: (value) => {
    const t = value.trim();
    if (!t) return "Please enter your name";
    if (t.length < 2) return "Name looks too short";
    if (!/^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]*$/u.test(t))
      return "Use letters only (no digits or symbols)";
    return "";
  },
  mobile: (value) => {
    if (!value.trim()) return "Please enter your mobile number";
    return /^[6-9]\d{9}$/.test(normalizeMobile(value))
      ? ""
      : "Enter a valid 10-digit Indian mobile number";
  },
  email: (required) => (value) => {
    const t = value.trim();
    if (!t) return required ? "Please enter your email address" : "";
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t)
      ? ""
      : "Enter a valid email address";
  },
  select: (label) => (value) => (value ? "" : `Please select ${label}`),
  cabs: (value) => {
    const t = value.trim();
    if (!t) return "";
    if (!/^\d+$/.test(t)) return "Enter a whole number";
    const n = Number(t);
    return n >= 1 && n <= 500 ? "" : "Enter a number between 1 and 500";
  },
  licence: (value) => {
    const t = value.replace(/[\s-]/g, "");
    if (!t) return "Please enter your driving licence number";
    if (!/^[A-Za-z0-9/]{8,20}$/.test(t))
      return "Enter 8–20 letters/digits (e.g. TN01 20190001234)";
    return "";
  },
};

/* ------------------------------------------------------------------ */
/*  Field                                                               */
/* ------------------------------------------------------------------ */
function Field({ field, value, error, onChange, onBlur, fieldRef }) {
  const id = useId();
  const errId = `${id}-err`;
  const common = {
    id,
    name: field.name,
    value,
    onChange: (e) => onChange(field.name, e.target.value),
    onBlur: () => onBlur(field.name),
    "aria-invalid": error ? "true" : "false",
    "aria-describedby": error ? errId : undefined,
    ref: fieldRef,
  };
  const stateCls = error
    ? "!border-red-400 !bg-red-50/40 focus:!ring-red-500/15"
    : "";

  return (
    <div className={`min-w-0 ${field.full ? "sm:col-span-2" : ""}`}>
      <label htmlFor={id} className="block">
        <Label required={field.required} hint={field.hint}>
          {field.label}
        </Label>
      </label>

      {field.type === "select" ? (
        <div className="relative">
          <select
            {...common}
            className={`${inputBase} ${stateCls} cursor-pointer appearance-none pr-10 ${
              value ? "" : "text-slate-400"
            }`}
          >
            <option value="">{field.placeholder || "Select"}</option>
            {field.options.map((opt) => (
              <option key={opt} value={opt} className="text-slate-800">
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      ) : (
        <input
          {...common}
          type={field.type === "tel" ? "tel" : field.type || "text"}
          inputMode={field.inputMode}
          autoComplete={field.autoComplete}
          maxLength={field.maxLength}
          placeholder={field.placeholder}
          className={`${inputBase} ${stateCls}`}
        />
      )}

      <p
        id={errId}
        role={error ? "alert" : undefined}
        className={`grid transition-all duration-300 ${
          error ? "mt-1.5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <span className="flex min-h-0 items-center gap-1.5 overflow-hidden text-[11px] font-medium text-red-600">
          {error && <AlertCircle className="h-3 w-3 shrink-0" />}
          {error}
        </span>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Form                                                                */
/* ------------------------------------------------------------------ */
/**
 * Config-driven application form with inline validation, animated errors,
 * submit state and a success screen with WhatsApp / call hand-off.
 */
export default function ApplicationForm({
  kind, // "partner" | "driver"
  fields,
  consentLabel,
  submitLabel,
  successTitle,
  successText,
  whatsappIntro,
}) {
  const initial = () =>
    Object.fromEntries(fields.map((f) => [f.name, f.defaultValue ?? ""]));

  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | done
  const [submitError, setSubmitError] = useState("");
  const [shake, setShake] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const refs = useRef({});

  const runValidation = (name, value) => {
    const f = fields.find((x) => x.name === name);
    return f?.validate ? f.validate(value) : "";
  };

  const handleChange = (name, raw) => {
    const f = fields.find((x) => x.name === name);
    let value = raw;
    if (f?.digitsOnly) value = raw.replace(/\D/g, "");
    if (f?.upper) value = raw.toUpperCase();
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: runValidation(name, value) }));
    }
  };

  const handleBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: runValidation(name, values[name]) }));
  };

  const triggerShake = () => {
    setShake(false);
    requestAnimationFrame(() => setShake(true));
    setTimeout(() => setShake(false), 600);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    const nextErrors = {};
    fields.forEach((f) => {
      nextErrors[f.name] = runValidation(f.name, values[f.name]);
    });
    setErrors(nextErrors);
    setTouched(Object.fromEntries(fields.map((f) => [f.name, true])));

    const firstBad = fields.find((f) => nextErrors[f.name]);
    if (firstBad || !consent) {
      setConsentError(!consent);
      triggerShake();
      refs.current[firstBad?.name]?.focus();
      return;
    }

    setSubmitError("");
    setStatus("sending");
    try {
      const payload = Object.fromEntries(
        fields.map((f) => [
          f.name,
          f.name === "mobile"
            ? normalizeMobile(values[f.name])
            : values[f.name].trim(),
        ]),
      );
      const result = await submitApplication(kind, payload);
      setDelivered(result.delivered);
      setStatus("done");
      confetti({ particleCount: 110, spread: 75, origin: { y: 0.55 } });
    } catch {
      setStatus("idle");
      setSubmitError(
        "We couldn't send your application. Please check your connection and try again, or call our office.",
      );
    }
  };

  const handleReset = () => {
    setValues(initial());
    setErrors({});
    setTouched({});
    setConsent(false);
    setConsentError(false);
    setSubmitError("");
    setStatus("idle");
  };

  const summary = fields
    .filter((f) => values[f.name]?.trim())
    .map((f) => `${f.label.replace(/\*$/, "")}: ${values[f.name].trim()}`)
    .join("\n");
  const waHref = `https://wa.me/${BOOKING_OFFICE.whatsapp}?text=${encodeURIComponent(
    `${whatsappIntro}\n${summary}`,
  )}`;

  if (status === "done") {
    return (
      <div className="px-6 py-12 text-center sm:px-10 animate-scale-in" role="status">
        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50/80 p-2 shadow-sm ring-8 ring-emerald-50/60">
          <img
            src="/images/icons/enquiry-success.png"
            alt=""
            className="h-14 w-14 object-contain"
            width="56"
            height="56"
          />
          <CheckCircle2 className="absolute -bottom-2 -right-2 h-7 w-7 rounded-full bg-white text-emerald-500" />
        </div>
        <h3 className="mt-6 font-display text-2xl text-navy-900">
          {successTitle}
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
          {successText}
          {!delivered && (
            <>
              {" "}
              For the fastest response, send these details to our office on
              WhatsApp.
            </>
          )}
        </p>

        <div className="mx-auto mt-7 flex max-w-sm flex-col gap-2.5 sm:flex-row">
          <a
            href={`tel:${BOOKING_OFFICE.phone1Raw}`}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-navy-900 text-xs font-bold text-white transition hover:bg-navy-800"
          >
            <Phone className="h-4 w-4 text-crimson-400" />
            Call {BOOKING_OFFICE.phone1}
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] text-xs font-bold text-white transition hover:brightness-105"
          >
            <MessageSquare className="h-4 w-4" />
            WhatsApp office
          </a>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="mt-6 text-xs font-bold text-crimson-600 hover:underline"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`space-y-6 p-6 sm:p-10 ${shake ? "form-shake" : ""}`}
    >
      <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
        {fields.map((f) => (
          <Field
            key={f.name}
            field={f}
            value={values[f.name]}
            error={errors[f.name]}
            onChange={handleChange}
            onBlur={handleBlur}
            fieldRef={(el) => {
              refs.current[f.name] = el;
            }}
          />
        ))}
      </div>

      <div>
        <label
          className={`flex cursor-pointer items-start gap-3 rounded-xl p-3.5 transition ${
            consentError ? "bg-red-50 ring-1 ring-red-300" : "bg-slate-50"
          }`}
        >
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (e.target.checked) setConsentError(false);
            }}
            aria-invalid={consentError}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-crimson-600 focus:ring-crimson-500"
          />
          <span className="text-xs leading-relaxed text-slate-600">
            {consentLabel}
          </span>
        </label>
        {consentError && (
          <p
            role="alert"
            className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-red-600"
          >
            <AlertCircle className="h-3 w-3" />
            Please accept to continue
          </p>
        )}
      </div>

      {submitError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-700"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {submitError}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-shine flex h-12 w-full items-center justify-center gap-2 rounded-xl v-gradient-crimson text-sm font-extrabold text-white shadow-glow-crimson transition hover:brightness-105 active:scale-[0.99] disabled:cursor-wait disabled:opacity-80"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {submitLabel}
            </>
          )}
        </button>
        <p className="mt-2.5 text-center text-[11px] text-slate-400">
          Used only to process this application. No spam.
        </p>
      </div>
    </form>
  );
}
