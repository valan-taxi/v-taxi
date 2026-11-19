import React, { useMemo, useSyncExternalStore } from "react";

/**
 * Minimal History-API router (no dependency).
 *
 * - `useLocation()`   -> { path, hash }
 * - `navigate(to)`    -> client-side navigation
 * - `<Link to="…">`   -> anchor that navigates without a page reload
 * - `goToSection(id)` -> scroll to a home-page section, navigating home first
 *                        when called from another page.
 */

const NAV_EVENT = "vtaxi:navigate";

const subscribe = (callback) => {
  window.addEventListener("popstate", callback);
  window.addEventListener(NAV_EVENT, callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener(NAV_EVENT, callback);
  };
};

const getSnapshot = () =>
  window.location.pathname + window.location.search + window.location.hash;
const getServerSnapshot = () => "/";

export const normalizePath = (pathname = "/") => {
  const clean = pathname.replace(/\/+$/, "").toLowerCase();
  return clean === "" ? "/" : clean;
};

export function useLocation() {
  const full = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return useMemo(() => {
    const hashIndex = full.indexOf("#");
    const hash = hashIndex >= 0 ? full.slice(hashIndex + 1) : "";
    const beforeHash = hashIndex >= 0 ? full.slice(0, hashIndex) : full;
    const queryIndex = beforeHash.indexOf("?");
    const pathname =
      queryIndex >= 0 ? beforeHash.slice(0, queryIndex) : beforeHash;
    return { path: normalizePath(pathname), hash };
  }, [full]);
}

export function navigate(to, { replace = false } = {}) {
  if (typeof window === "undefined") return;

  const target = new URL(to, window.location.origin);
  const current = window.location.pathname + window.location.search;
  const next = target.pathname + target.search;

  // Same page: just scroll (to the hash target, or the top).
  if (current === next) {
    if (target.hash) {
      if (window.location.hash !== target.hash) {
        window.history.pushState({}, "", next + target.hash);
        window.dispatchEvent(new Event(NAV_EVENT));
      } else {
        document
          .getElementById(target.hash.slice(1))
          ?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      if (window.location.hash) {
        window.history.pushState({}, "", next);
        window.dispatchEvent(new Event(NAV_EVENT));
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return;
  }

  const method = replace ? "replaceState" : "pushState";
  window.history[method]({}, "", next + target.hash);
  window.dispatchEvent(new Event(NAV_EVENT));
}

export function goToSection(id) {
  if (typeof window === "undefined") return;
  if (normalizePath(window.location.pathname) === "/") {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    return;
  }
  navigate(`/#${id}`);
}

const isModifiedEvent = (e) =>
  e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;

export function Link({ to, onClick, target, children, ...rest }) {
  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || isModifiedEvent(e) || target === "_blank") return;
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} target={target} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
