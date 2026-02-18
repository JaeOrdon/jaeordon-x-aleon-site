/**
 * Meta Pixel + Conversions API (CAPI) tracking utility
 * Pixel ID: 1423356802700638
 *
 * Client-side: fires fbq() events via the pixel script in index.html
 * Server-side: sends the same events to Meta CAPI via a Netlify function
 */

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

const PIXEL_ID = '1423356802700638';

// ── Client-side pixel helpers ──────────────────────────────────────────

function fbq(...args: any[]) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq(...args);
  }
}

// ── Server-side CAPI helper ────────────────────────────────────────────

async function sendCAPI(eventName: string, params: Record<string, any> = {}) {
  try {
    await fetch('/.netlify/functions/meta-capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: window.location.href,
        user_agent: navigator.userAgent,
        ...params,
      }),
    });
  } catch {
    // Silently fail — don't break the site if CAPI is down
  }
}

// ── Dual-fire: sends to both pixel + CAPI ──────────────────────────────

function trackEvent(eventName: string, params: Record<string, any> = {}) {
  // Client-side pixel
  fbq('track', eventName, params);
  // Server-side CAPI
  sendCAPI(eventName, params);
}

function trackCustomEvent(eventName: string, params: Record<string, any> = {}) {
  fbq('trackCustom', eventName, params);
  sendCAPI(eventName, params);
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
export function trackNewsletterSignup() {
  trackEvent('Lead', {
    content_name: 'Newsletter Signup',
    content_category: 'Email',
  });
  trackCustomEvent('NewsletterSignup', {});
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
