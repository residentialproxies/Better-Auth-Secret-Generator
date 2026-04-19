interface SecretRequest {
  length?: number;
  format?: 'hex' | 'base64';
}

interface SecretResponse {
  secret: string;
  length: number;
  format: string;
  timestamp: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req: Request) => {
  try {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    // Only allow GET and POST methods
    if (req.method !== "GET" && req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    let length = 32; // Default to 32 bytes (Better Auth standard)
    let format: 'hex' | 'base64' = 'hex'; // Default to hex format

    // Parse request parameters
    if (req.method === "POST") {
      try {
        const body: SecretRequest = await req.json();
        if (body.length) {
          length = Math.min(Math.max(body.length, 16), 128); // Clamp between 16 and 128 bytes
        }
        if (body.format && (body.format === 'hex' || body.format === 'base64')) {
          format = body.format;
        }
      } catch {
        // If JSON parsing fails, use defaults
      }
    } else if (req.method === "GET") {
      const url = new URL(req.url);
      const lengthParam = url.searchParams.get('length');
      const formatParam = url.searchParams.get('format');
      
      if (lengthParam) {
        const parsedLength = parseInt(lengthParam, 10);
        if (!isNaN(parsedLength)) {
          length = Math.min(Math.max(parsedLength, 16), 128);
        }
      }
      
      if (formatParam && (formatParam === 'hex' || formatParam === 'base64')) {
        format = formatParam;
      }
    }

    // Generate cryptographically secure random bytes
    const randomBytes = new Uint8Array(length);
    crypto.getRandomValues(randomBytes);

    // Convert to requested format
    let secret: string;
    if (format === 'base64') {
      // Convert to base64
      const binaryString = String.fromCharCode(...randomBytes);
      secret = btoa(binaryString);
    } else {
      // Convert to hex (default)
      secret = Array.from(randomBytes, byte => 
        byte.toString(16).padStart(2, '0')
      ).join('');
    }

    const response: SecretResponse = {
      secret,
      length,
      format,
      timestamp: new Date().toISOString(),
    };

    return new Response(
      JSON.stringify(response),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error) {
    console.error('Error generating secret:', error);
    
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        message: "Failed to generate secret"
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
});