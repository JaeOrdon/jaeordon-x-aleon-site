/**
 * Meta Pixel + Conversions API (CAPI) tracking utility
 * Pixel ID: 908766851903323 (jaeordon.com dataset)
 *
 * Client-side: fires fbq() events via the pixel script in index.html
 * Server-side: sends the same events to Meta CAPI via Cloudflare Pages Function
 * Deduplication: every event gets a matching eventID in both channels
 */

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

const PIXEL_ID = '908766851903323';

function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : undefined;
}

// ── Client-side pixel helpers ──────────────────────────────────────────

function fbq(...args: any[]) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq(...args);
  }
}

// ── Server-side CAPI helper ────────────────────────────────────────────

async function sendCAPI(eventName: string, eventId: string, params: Record<string, any> = {}) {
  try {
    await fetch('/api/capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: eventName,
        event_id: eventId,
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: window.location.href,
        user_agent: navigator.userAgent,
        fbp: getCookie('_fbp'),
        fbc: getCookie('_fbc'),
        ...params,
      }),
    });
  } catch {
    // Silently fail — don't break the site if CAPI is down
  }
}

// ── Dual-fire with deduplication ──────────────────────────────────────

function trackEvent(eventName: string, params: Record<string, any> = {}) {
  const eventId = generateEventId();
  fbq('track', eventName, params, { eventID: eventId });
  sendCAPI(eventName, eventId, params);
}

function trackCustomEvent(eventName: string, params: Record<string, any> = {}) {
  const eventId = generateEventId();
  fbq('trackCustom', eventName, params, { eventID: eventId });
  sendCAPI(eventName, eventId, params);
}

// ── Public tracking functions ──────────────────────────────────────────

/** Track clicks to Spotify, Apple Music, Bandcamp, SoundCloud, YouTube */
export function trackMusicLinkClick(platform: string, url: string, context?: string) {
  trackEvent('ViewContent', {
    content_name: `${platform} Link Click`,
    content_category: 'Music',
    content_type: 'music_link',
  });
  trackCustomEvent('MusicLinkClick', {
    platform,
    url,
    context: context || 'unknown',
  });
}

/** Track when a release card is clicked */
export function trackReleaseClick(title: string, platform: string, releaseType: string) {
  trackEvent('ViewContent', {
    content_name: title,
    content_category: 'Release',
    content_type: releaseType,
  });
  trackCustomEvent('ReleaseClick', {
    title,
    platform,
    release_type: releaseType,
  });
}

/** Track newsletter signup */
export function trackNewsletterSignup(email?: string) {
  trackEvent('Subscribe', {
    content_name: 'Newsletter Signup',
    content_category: 'Email',
  });
  trackCustomEvent('NewsletterSignup', { email });
}

/** Track "Listen Now" CTA in navbar */
export function trackListenNowClick() {
  trackEvent('ViewContent', {
    content_name: 'Listen Now CTA',
    content_category: 'Music',
    content_type: 'cta',
  });
  trackCustomEvent('ListenNowClick', {
    destination: 'spotify',
  });
}

/** Track social media link clicks in footer */
export function trackSocialClick(platform: string, url: string) {
  trackCustomEvent('SocialClick', {
    platform,
    url,
  });
}

/** Track hero section CTA clicks */
export function trackHeroCTAClick(label: string, destination: string) {
  trackEvent('ViewContent', {
    content_name: `Hero CTA: ${label}`,
    content_category: 'CTA',
  });
  trackCustomEvent('HeroCTAClick', {
    label,
    destination,
  });
}
