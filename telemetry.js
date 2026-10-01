// ============================================================================
// telemetry.js -- optional, best-effort crash reporting + light analytics.
// Kept in its own file so index.html doesn't get bloated with this.
//
// Both features are OFF by default (empty endpoint URLs below) -- shipping
// this file as-is is a total no-op. Fill in one or both endpoints whenever
// you're ready and reporting/tracking will start working with no other code
// changes needed anywhere else.
//
// Everything in this file fails silently. A misconfigured or unreachable
// endpoint must NEVER be able to throw back into the game or block anything --
// every call is fire-and-forget with its own try/catch and a timeout.
// ============================================================================

// --- 1) Crash reporting ------------------------------------------------
// Easiest zero-backend option: a Discord webhook.
//   Discord -> your server -> Server Settings -> Integrations -> Webhooks
//   -> New Webhook -> Copy Webhook URL -> paste it below.
// Any other endpoint that accepts a JSON POST also works (see sendJSON).
const ERROR_WEBHOOK_URL = '';

// Called automatically by the crash-safety-net inline script in index.html
// whenever an uncaught error or rejected promise fires (see handleFailure()
// there). `info` = { message, source, lineno, colno, stack, booted, ts, ua }.
window.reportErrorToWebhook = function (info) {
  if (!ERROR_WEBHOOK_URL) return;
  const lines = [
    '\uD83D\uDEA8 SectorDefenseTD crash',
    `**${info.message}**`,
    `${info.source}:${info.lineno}:${info.colno}`,
    `Booted before crash: ${info.booted}`,
    `Time: ${info.ts}`,
    `UA: ${info.ua}`
  ];
  if (info.stack) lines.push('```' + info.stack.slice(0, 800) + '```');
  // Discord's webhook format is {content: "..."}; if you swap in a different
  // endpoint, adjust this payload shape to match what it expects.
  sendJSON(ERROR_WEBHOOK_URL, { content: lines.join('\n') });
};

// --- 2) Lightweight gameplay analytics ----------------------------------
// Where players go, what they click -- level starts/clears/fails, towers
// built, upgrades bought, tutorial progress, etc. Call trackEvent(name,
// params) from index.html at the relevant spots (a handful of call sites
// already do, guarded through the safeTrack() wrapper there).
//
// Defaults to Google Analytics 4's Measurement Protocol format, since GA4 is
// free and gives you real dashboards/funnels without needing the heavy
// gtag.js script (which would mean a network dependency on every page load --
// exactly what we just removed for fonts). To use it:
//   1. Create a free GA4 property at analytics.google.com
//   2. Admin -> Data Streams -> your stream -> Measurement Protocol API
//      secrets -> Create -> copy the secret
//   3. Set ANALYTICS_ENDPOINT_URL below to:
//      https://www.google-analytics.com/mp/collect?measurement_id=G-XXXXXXX&api_secret=YOUR_SECRET
// Any other JSON-accepting analytics endpoint works too -- adjust the payload
// shape in trackEvent() below to match.
const ANALYTICS_ENDPOINT_URL = '';
const ANALYTICS_CLIENT_ID_KEY = 'sectorDefenseTD_analytics_cid';

function getAnalyticsClientId() {
  try {
    let cid = localStorage.getItem(ANALYTICS_CLIENT_ID_KEY);
    if (!cid) {
      cid = 'cid_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2);
      localStorage.setItem(ANALYTICS_CLIENT_ID_KEY, cid);
    }
    return cid;
  } catch (e) {
    return 'cid_unknown';
  }
}

function trackEvent(name, params) {
  if (!ANALYTICS_ENDPOINT_URL) return;
  sendJSON(ANALYTICS_ENDPOINT_URL, {
    client_id: getAnalyticsClientId(),
    events: [{ name: name, params: params || {} }]
  });
}

// --- shared fire-and-forget POST helper ---------------------------------
function sendJSON(url, body) {
  if (!url) return;
  try {
    const controller = ('AbortController' in window) ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), 5000) : null;
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller ? controller.signal : undefined
    }).catch(() => { /* offline / unreachable -- silently drop, never retry-spam */ })
      .finally(() => { if (timeoutId) clearTimeout(timeoutId); });
  } catch (e) {
    // fetch not available, or something else went wrong constructing the
    // request -- telemetry must never be able to break the game.
  }
}
