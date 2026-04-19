interface SecretRequest {
  length?: number;
  format?: 'hex' | 'base64';
  output?: 'text' | 'json';
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

function generateSecret(length: number, format: 'hex' | 'base64'): string {
  const randomBytes = new Uint8Array(length);
  crypto.getRandomValues(randomBytes);
  if (format === 'base64') {
    return btoa(String.fromCharCode(...randomBytes));
  }
  return Array.from(randomBytes, b => b.toString(16).padStart(2, '0')).join('');
}

Deno.serve(async (req: Request) => {
  try {
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 200, headers: corsHeaders });
    }

    if (req.method !== "GET" && req.method !== "POST") {
      return new Response("Method not allowed", {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "text/plain" },
      });
    }

    let length = 32;
    let format: 'hex' | 'base64' = 'hex';
    let output: 'text' | 'json' = 'text';

    if (req.method === "POST") {
      try {
        const body: SecretRequest = await req.json();
        if (body.length) length = Math.min(Math.max(body.length, 16), 128);
        if (body.format === 'hex' || body.format === 'base64') format = body.format;
        if (body.output === 'json') output = 'json';
      } catch {
        // use defaults
      }
    } else {
      const url = new URL(req.url);
      const lp = url.searchParams.get('length');
      const fp = url.searchParams.get('format');
      const op = url.searchParams.get('output');
      if (lp) {
        const n = parseInt(lp, 10);
        if (!isNaN(n)) length = Math.min(Math.max(n, 16), 128);
      }
      if (fp === 'hex' || fp === 'base64') format = fp;
      if (op === 'json') output = 'json';
    }

    const secret = generateSecret(length, format);

    if (output === 'json') {
      return new Response(
        JSON.stringify({ secret, length, format, timestamp: new Date().toISOString() }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(secret, {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "text/plain; charset=utf-8" },
    });

  } catch (error) {
    console.error('Error generating secret:', error);
    return new Response("Internal server error", {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "text/plain" },
    });
  }
});
