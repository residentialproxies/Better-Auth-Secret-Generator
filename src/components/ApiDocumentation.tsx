import React, { useState } from 'react';
import { Code, Copy, Check, Terminal, Globe, Zap } from 'lucide-react';

const ApiDocumentation: React.FC = () => {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const copyToClipboard = async (text: string, endpoint: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedEndpoint(endpoint);
      setTimeout(() => setCopiedEndpoint(null), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const apiBaseUrl = `${window.location.origin}/functions/v1/generate-secret`;

  const examples = [
    {
      title: 'Basic GET Request',
      description: 'Generate a standard 32-byte hex secret',
      method: 'GET',
      url: apiBaseUrl,
      curl: `curl "${apiBaseUrl}"`,
      response: {
        secret: "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
        length: 32,
        format: "hex",
        timestamp: "2024-01-15T10:30:00.000Z"
      }
    },
    {
      title: 'Custom Length',
      description: 'Generate a 48-byte secret',
      method: 'GET',
      url: `${apiBaseUrl}?length=48`,
      curl: `curl "${apiBaseUrl}?length=48"`,
      response: {
        secret: "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456789012345678901234567890abcd",
        length: 48,
        format: "hex",
        timestamp: "2024-01-15T10:30:00.000Z"
      }
    },
    {
      title: 'Base64 Format',
      description: 'Generate a secret in Base64 format (like OpenSSL)',
      method: 'GET',
      url: `${apiBaseUrl}?format=base64`,
      curl: `curl "${apiBaseUrl}?format=base64"`,
      response: {
        secret: "YWJjZGVmZ2hpams1Njc4OTBhYmNkZWZnaGlqa2xtbm9w",
        length: 32,
        format: "base64",
        timestamp: "2024-01-15T10:30:00.000Z"
      }
    },
    {
      title: 'POST Request',
      description: 'Generate with JSON payload',
      method: 'POST',
      url: apiBaseUrl,
      curl: `curl -X POST "${apiBaseUrl}" \\
  -H "Content-Type: application/json" \\
  -d '{"length": 64, "format": "hex"}'`,
      response: {
        secret: "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12345678",
        length: 64,
        format: "hex",
        timestamp: "2024-01-15T10:30:00.000Z"
      }
    }
  ];

  return (
    <section className="max-w-6xl mx-auto py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Terminal className="h-4 w-4" />
          <span>REST API</span>
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Better Auth Secret API
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Integrate secret generation into your development workflow with our REST API. 
          Perfect for CI/CD pipelines, automation scripts, and development tools.
        </p>
      </div>

      {/* API Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 mb-12 transition-colors duration-200">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-2">
          <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span>API Endpoint</span>
        </h3>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <code className="text-lg font-mono text-gray-900 dark:text-gray-100">
              {apiBaseUrl}
            </code>
            <button
              onClick={() => copyToClipboard(apiBaseUrl, 'endpoint')}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600 rounded-lg transition-all duration-200"
              title="Copy endpoint URL"
            >
              {copiedEndpoint === 'endpoint' ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Supported Methods</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <code className="font-mono text-sm">GET</code>
                <span>- Query parameters</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <code className="font-mono text-sm">POST</code>
                <span>- JSON payload</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Parameters</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-center space-x-2">
                <code className="font-mono text-sm bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">length</code>
                <span>- Bytes (16-128, default: 32)</span>
              </li>
              <li className="flex items-center space-x-2">
                <code className="font-mono text-sm bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">format</code>
                <span>- hex | base64 (default: hex)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Examples */}
      <div className="space-y-8">
        {examples.map((example, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-200">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {example.title}
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  example.method === 'GET' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                }`}>
                  {example.method}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">{example.description}</p>
            </div>
            
            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Request */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                      <Terminal className="h-4 w-4" />
                      <span>Request</span>
                    </h4>
                    <button
                      onClick={() => copyToClipboard(example.curl, `curl-${index}`)}
                      className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600 rounded-lg transition-all duration-200"
                      title="Copy cURL command"
                    >
                      {copiedEndpoint === `curl-${index}` ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <div className="bg-gray-900 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-green-400 whitespace-pre-wrap">{example.curl}</pre>
                  </div>
                </div>

                {/* Response */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                      <Code className="h-4 w-4" />
                      <span>Response</span>
                    </h4>
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(example.response, null, 2), `response-${index}`)}
                      className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600 rounded-lg transition-all duration-200"
                      title="Copy response JSON"
                    >
                      {copiedEndpoint === `response-${index}` ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <div className="bg-gray-900 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-gray-300">
                      {JSON.stringify(example.response, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rate Limiting & Security */}
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 transition-colors duration-200">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">Performance</h3>
          </div>
          <ul className="space-y-2 text-blue-700 dark:text-blue-400 text-sm">
            <li>• Fast response times (&lt;100ms)</li>
            <li>• Cryptographically secure generation</li>
            <li>• No rate limiting for reasonable usage</li>
            <li>• Global edge deployment</li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 transition-colors duration-200">
          <div className="flex items-center space-x-2 mb-4">
            <Code className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">Integration</h3>
          </div>
          <ul className="space-y-2 text-green-700 dark:text-green-400 text-sm">
            <li>• CORS enabled for web apps</li>
            <li>• JSON and query parameter support</li>
            <li>• Compatible with all HTTP clients</li>
            <li>• No authentication required</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ApiDocumentation;