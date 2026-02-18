/**
 * Meta Conversions API (CAPI) — Netlify Serverless Function
 *
 * Sends events server-side to Meta so tracking works even when:
 *  - Ad blockers kill the pixel
 *  - iOS/Safari ITP strips cookies
 *  - Browser extensions block fbevents.js
 *
 * Setup: Add these environment variables in Netlify dashboard:
 *   META_CAPI_ACCESS_TOKEN  — from Meta Events Manager → Settings → Generate Access Token
 *   META_PIXEL_ID           — 1423356802700638 (or override if needed)
 */

import type { Handler, HandlerEvent } from '@netlify/functions';
import crypto from 'crypto';

const PIXEL_ID = process.env.META_PIXEL_ID || '1423356802700638';
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN || '';
const API_VERSION = 'v19.0';

interface CAPIPayload {
  event_name: string;
  event_time: number;
  event_source_url: string;
  user_agent: string;
  [key: string]: any;
}

function hashSHA256(value: string): string {
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

const handler: Handler = async (event: HandlerEvent) => {
  // Only POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // If no access token configured, return silently (pixel still works client-side)
  if (!ACCESS_TOKEN) {
    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'skipped', reason: 'No META_CAPI_ACCESS_TOKEN configured' }),
    };
  }

  try {
    const payload: CAPIPayload = JSON.parse(event.body || '{}');
    const clientIP = event.headers['x-forwarded-for']?.split(',')[0]?.trim() || event.headers['client-ip'] || '';

    const eventData: Record<string, any> = {
      event_name: payload.event_name,
      event_time: payload.event_time || Math.floor(Date.now() / 1000),
      event_source_url: payload.event_source_url,
      action_source: 'website',
      user_data: {
        client_ip_address: clientIP,
        client_user_agent: payload.user_agent || event.headers['user-agent'] || '',
        // Facebook Browser ID (fbp) and Click ID (fbc) can be forwarded from cookies
        ...(payload.fbp && { fbp: payload.fbp }),
        ...(payload.fbc && { fbc: payload.fbc }),
      },
    };

    // Add custom_data if there are extra params
    const reservedKeys = ['event_name', 'event_time', 'event_source_url', 'user_agent', 'fbp', 'fbc'];
    const customData: Record<string, any> = {};
    for (const [key, value] of Object.entries(payload)) {
      if (!reservedKeys.includes(key)) {
        customData[key] = value;
      }
    }
    if (Object.keys(customData).length > 0) {
      eventData.custom_data = customData;
    }

    const response = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [eventData] }),
      },
    );

    const result = await response.json();

    return {
      statusCode: response.ok ? 200 : 400,
      body: JSON.stringify(result),
    };
  } catch (error: any) {
    console.error('CAPI Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

export { handler };
