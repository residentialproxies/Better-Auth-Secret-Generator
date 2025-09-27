import React, { useState, useCallback } from 'react';
import { Copy, RefreshCw, Check, Key, Zap, Shield } from 'lucide-react';

interface SecretLength {
  label: string;
  bytes: number;
  description: string;
}

const SECRET_LENGTHS: SecretLength[] = [
  { label: 'Standard (32 bytes)', bytes: 32, description: 'Official Better Auth recommendation (openssl rand -base64 32)' },
  { label: 'Enhanced (48 bytes)', bytes: 48, description: 'Higher security for sensitive data' },
  { label: 'Maximum (64 bytes)', bytes: 64, description: 'Maximum security for enterprise use' },
];

const SecretGenerator: React.FC = () => {
  const [secret, setSecret] = useState<string>('');
  const [selectedLength, setSelectedLength] = useState<SecretLength>(SECRET_LENGTHS[0]);
  const [copied, setCopied] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const generateSecret = useCallback(async () => {
    setIsGenerating(true);
    
    // Add slight delay for better UX
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
      const array = new Uint8Array(selectedLength.bytes);
      window.crypto.getRandomValues(array);
      const secretString = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
      setSecret(secretString);
    } catch (error) {
      console.error('Failed to generate secret:', error);
      // Fallback for older browsers
      const fallbackSecret = Array.from({ length: selectedLength.bytes * 2 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      setSecret(fallbackSecret);
    } finally {
      setIsGenerating(false);
    }
  }, [selectedLength.bytes]);

  const copyToClipboard = useCallback(async () => {
    if (!secret) return;
    
    try {
      await navigator.clipboard.writeText(secret);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = secret;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [secret]);

  React.useEffect(() => {
    generateSecret();
  }, [generateSecret]);

  return (
    <section className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Zap className="h-4 w-4" />
          <span>Fast & Secure Generation</span>
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Generate Secure Better Auth Secrets
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Create cryptographically secure secrets for your Better Auth TypeScript applications. 
          Used for encryption, signing, and hashing in your authentication system.
        </p>
      </div>

      {/* Generator Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 mb-12 transition-colors duration-200">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Secret Length
              </label>
              <div className="space-y-2">
                {SECRET_LENGTHS.map((length) => (
                  <label
                    key={length.bytes}
                    className="flex items-center space-x-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <input
                      type="radio"
                      name="secretLength"
                      checked={selectedLength.bytes === length.bytes}
                      onChange={() => setSelectedLength(length)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {length.label}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {length.description}
                        </span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={generateSecret}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`h-5 w-5 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Generating...' : 'Generate New Secret'}</span>
            </button>
          </div>

          {/* Generated Secret */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
                Generated Secret
              </label>
              <div className="flex items-center text-xs text-gray-500">
                <Key className="h-3 w-3 mr-1" />
                <span>{selectedLength.bytes * 2} characters</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3 pr-12 font-mono text-sm break-all min-h-[80px] flex items-center transition-colors duration-200">
                {secret ? (
                  <span className="text-gray-900 dark:text-gray-100 leading-relaxed">{secret}</span>
                ) : (
                  <span className="text-gray-400">Generating secret...</span>
                )}
              </div>
              
              {secret && (
                <button
                  onClick={copyToClipboard}
                  className="absolute top-3 right-3 p-1.5 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  title={copied ? 'Copied!' : 'Copy to clipboard'}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>

            {copied && (
              <div className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-md">
                <Check className="h-4 w-4" />
                <span>Secret copied to clipboard!</span>
              </div>
            )}

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 transition-colors duration-200">
              <div className="flex items-start space-x-2">
                <Shield className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800 dark:text-amber-300 mb-1">Security Note</p>
                  <p className="text-amber-700 dark:text-amber-400">
                    Store this secret securely in your environment variables. Never commit it to version control or expose it in client-side code.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CLI Reference */}
      <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-6 text-white border border-gray-700 dark:border-gray-600 transition-colors duration-200">
        <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
          <Key className="h-5 w-5" />
          <span>Official Better Auth Command</span>
        </h3>
        <p className="text-gray-300 mb-4">
          Better Auth officially recommends using OpenSSL to generate secrets:
        </p>
        <div className="space-y-3">
          <div className="bg-gray-800 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm border border-gray-700 dark:border-gray-600 transition-colors duration-200">
            <div className="text-green-400 text-xs mb-1 font-semibold">✓ Official Better Auth Recommendation:</div>
            <code className="text-green-400">openssl rand -base64 32</code>
            <div className="text-gray-400 text-xs mt-1">→ Generates Base64 format (~44 characters)</div>
          </div>
          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
            <div className="text-blue-300 text-sm font-medium mb-2">Alternative Methods:</div>
            <div className="space-y-2">
              <div>
                <code className="text-blue-400 text-sm">npx @better-auth/cli secret</code>
                <div className="text-gray-400 text-xs">Better Auth CLI tool</div>
              </div>
              <div>
                <code className="text-purple-400 text-sm">This Web Tool</code>
                <div className="text-gray-400 text-xs">Browser-based generation (hexadecimal format)</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-4 mt-4">
          <div className="flex items-start space-x-2">
            <Shield className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-amber-300 font-medium mb-1">Security Note</p>
              <p className="text-amber-200">
                All methods generate equally secure 256-bit secrets. Choose based on your development environment and preferences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecretGenerator;