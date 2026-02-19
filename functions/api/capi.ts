interface Env {
  META_PIXEL_ID: string;
  META_CAPI_TOKEN: string;
}

interface CAPIRequestBody {
  event_name: string;
  event_id: string;
  event_time: number;
  event_source_url: string;
  user_agent: string;
  fbp?: string;
  fbc?: string;
  email?: string;
  custom_data?: Record<string, any>;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = await request.json() as CAPIRequestBody;

    const clientIp =
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-forwarded-for') ||
      undefined;

    const userData: Record<string, any> = {
      client_user_agent: body.user_agent,
    };
    if (clientIp) userData.client_ip_address = clientIp;
    if (body.fbp) userData.fbp = body.fbp;
    if (body.fbc) userData.fbc = body.fbc;
    if (body.email) userData.em = [body.email.trim().toLowerCase()];

    const capiPayload = {
      data: [
        {
          event_name: body.event_name,
          event_id: body.event_id,
          event_time: body.event_time,
          action_source: 'website',
          event_source_url: body.event_source_url,
          user_data: userData,
          ...(body.custom_data ? { custom_data: body.custom_data } : {}),
        },
      ],
    };

    await fetch(
      `https://graph.facebook.com/v19.0/${env.META_PIXEL_ID}/events?access_token=${env.META_CAPI_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(capiPayload),
      }
    );

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ ok: false }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
