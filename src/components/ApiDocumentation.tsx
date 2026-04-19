import React, { useState } from 'react';
import { Code, Copy, Check, Terminal, Globe, Zap, Bot } from 'lucide-react';

const ApiDocumentation: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // ignore
    }
  };

  const apiBase = 'https://better-auth-secret.com/api';

  const examples = [
    {
      id: 'basic',
      title: 'Basic — Plain Text',
      badge: 'GET',
      badgeColor: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      description: 'Returns a raw secret string — ideal for AI agents, shell scripts, and automation.',
      curl: `curl "${apiBase}"`,
      responseType: 'text/plain',
      response: 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
    },
    {
      id: 'json',
      title: 'JSON Output',
      badge: 'GET',
      badgeColor: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      description: 'Add ?output=json for a structured response with metadata.',
      curl: `curl "${apiBase}?output=json"`,
      responseType: 'application/json',
      response: JSON.stringify({
        secret: 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
        length: 32,
        format: 'hex',
        timestamp: '2024-01-15T10:30:00.000Z',
      }, null, 2),
    },
    {
      id: 'length',
      title: 'Custom Length',
      badge: 'GET',
      badgeColor: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      description: 'Specify byte length (16–128). Default is 32 bytes.',
      curl: `curl "${apiBase}?length=64"`,
      responseType: 'text/plain',
      response: 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12345678',
    },
    {
      id: 'base64',
      title: 'Base64 Format',
      badge: 'GET',
      badgeColor: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      description: 'OpenSSL-compatible Base64 output (same as openssl rand -base64 32).',
      curl: `curl "${apiBase}?format=base64"`,
      responseType: 'text/plain',
      response: 'YWJjZGVmZ2hpams1Njc4OTBhYmNkZWZnaGlqa2xtbm9w',
    },
    {
      id: 'post',
      title: 'POST with JSON Body',
      badge: 'POST',
      badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
      description: 'Send options as a JSON payload for programmatic control.',
      curl: `curl -X POST "${apiBase}" \\\n  -H "Content-Type: application/json" \\\n  -d '{"length": 48, "format": "hex", "output": "json"}'`,
      responseType: 'application/json',
      response: JSON.stringify({
        secret: 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456789012345678901234567890abcd',
        length: 48,
        format: 'hex',
        timestamp: '2024-01-15T10:30:00.000Z',
      }, null, 2),
    },
  ];

  return (
    <section className="max-w-6xl mx-auto py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Terminal className="h-4 w-4" />
          <span>REST API</span>
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Better Auth Secret API
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          A single GET request returns a ready-to-use secret string. Designed for AI agents,
          CI/CD pipelines, shell scripts, and any HTTP client.
        </p>
      </div>

      {/* Endpoint + AI callout */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 mb-12 transition-colors duration-200">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-2">
          <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span>Endpoint</span>
        </h3>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6 flex items-center justify-between gap-4">
          <code className="text-lg font-mono text-gray-900 dark:text-gray-100 break-all">
            {apiBase}
          </code>
          <button
            onClick={() => copyToClipboard(apiBase, 'endpoint')}
            className="flex-shrink-0 p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600 rounded-lg transition-all duration-200"
            title="Copy endpoint"
          >
            {copiedKey === 'endpoint' ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>

        {/* AI agent callout */}
        <div className="bg-gray-900 rounded-xl p-5 mb-6 flex items-start gap-4">
          <Bot className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-blue-300 mb-1">AI Agent Usage</p>
            <p className="text-sm text-gray-300 mb-3">
              A plain <code className="text-green-400">GET</code> request returns only the secret — no JSON to parse, no extra fields. Perfect for tool calls in LLM agents.
            </p>
            <div className="bg-gray-800 rounded-lg px-4 py-3 flex items-center justify-between gap-4">
              <code className="text-green-400 text-sm font-mono break-all">{`curl "${apiBase}"`}</code>
              <button
                onClick={() => copyToClipboard(`curl "${apiBase}"`, 'ai-curl')}
                className="flex-shrink-0 p-1.5 text-gray-400 hover:text-green-400 rounded transition-colors"
                title="Copy"
              >
                {copiedKey === 'ai-curl' ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Response: <code className="text-gray-300">a1b2c3d4e5f6789012345678901234567890abcdef…</code></p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Methods</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                <code className="font-mono">GET</code> — query string params
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                <code className="font-mono">POST</code> — JSON body
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Parameters</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <code className="font-mono bg-gray-100 dark:bg-gray-600 px-2 py-0.5 rounded flex-shrink-0">length</code>
                <span>Bytes 16–128, default 32</span>
              </li>
              <li className="flex items-start gap-2">
                <code className="font-mono bg-gray-100 dark:bg-gray-600 px-2 py-0.5 rounded flex-shrink-0">format</code>
                <span>hex | base64, default hex</span>
              </li>
              <li className="flex items-start gap-2">
                <code className="font-mono bg-gray-100 dark:bg-gray-600 px-2 py-0.5 rounded flex-shrink-0">output</code>
                <span>text | json, default text</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Examples */}
      <div className="space-y-6">
        {examples.map((ex) => (
          <div key={ex.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-200">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{ex.title}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${ex.badgeColor}`}>{ex.badge}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">{ex.responseType}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{ex.description}</p>
              </div>
            </div>
            <div className="p-6 grid lg:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5" /> Request
                  </h4>
                  <button
                    onClick={() => copyToClipboard(ex.curl, `curl-${ex.id}`)}
                    className="p-1.5 text-gray-400 hover:text-blue-500 rounded-lg transition-colors"
                    title="Copy"
                  >
                    {copiedKey === `curl-${ex.id}` ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
                <div className="bg-gray-900 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <pre className="text-green-400 whitespace-pre-wrap">{ex.curl}</pre>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                    <Code className="h-3.5 w-3.5" /> Response
                  </h4>
                  <button
                    onClick={() => copyToClipboard(ex.response, `resp-${ex.id}`)}
                    className="p-1.5 text-gray-400 hover:text-blue-500 rounded-lg transition-colors"
                    title="Copy"
                  >
                    {copiedKey === `resp-${ex.id}` ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
                <div className="bg-gray-900 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <pre className="text-gray-300 whitespace-pre-wrap break-all">{ex.response}</pre>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom info cards */}
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">Performance</h3>
          </div>
          <ul className="space-y-2 text-blue-700 dark:text-blue-400 text-sm">
            <li>• Sub-100ms response times globally</li>
            <li>• Cryptographically secure (Web Crypto API)</li>
            <li>• No rate limiting for reasonable usage</li>
            <li>• Edge-deployed worldwide</li>
          </ul>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bot className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">AI & Automation</h3>
          </div>
          <ul className="space-y-2 text-green-700 dark:text-green-400 text-sm">
            <li>• Plain text default — zero parsing needed</li>
            <li>• CORS enabled for web clients</li>
            <li>• No authentication required</li>
            <li>• Compatible with all HTTP clients & LLM tools</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ApiDocumentation;
