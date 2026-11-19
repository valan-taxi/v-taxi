/**
 * Sends a partner / driver application.
 *
 * If `VITE_APPLICATION_ENDPOINT` is set (e.g. a Formspree / Google Apps
 * Script / own API URL) the application is POSTed there as JSON.
 * When it is not configured the call resolves immediately so the page keeps
 * working; the success screen then hands the details to the booking office
 * over WhatsApp.
 */
export async function submitApplication(kind, values) {
  const endpoint = import.meta.env?.VITE_APPLICATION_ENDPOINT;

  if (!endpoint) {
    await new Promise((resolve) => setTimeout(resolve, 700));
    return { delivered: false };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        type: kind,
        submittedAt: new Date().toISOString(),
        source: window.location.href,
        ...values,
      }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Request failed (${res.status})`);
    return { delivered: true };
  } finally {
    clearTimeout(timer);
  }
}
