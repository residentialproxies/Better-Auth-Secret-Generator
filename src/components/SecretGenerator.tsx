import React, { useState, useCallback } from 'react';
import { Copy, RefreshCw, Check, Key, Zap, Shield } from 'lucide-react';

interface SecretLength {
  label: string;
  bytes: number;
  description: string;
}

const SECRET_LENGTHS: SecretLength[] = [
  { label: 'Standard (32 bytes)', bytes: 32, description: 'Recommended for most applications' },
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
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Secret Length
              </label>
              <div className="space-y-2">
                {SECRET_LENGTHS.map((length) => (
                  <label
                    key={length.bytes}
                    className="flex items-center space-x-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors"
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
                        <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {length.label}
                        </span>
                        <span className="text-xs text-gray-500">
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
              <label className="block text-sm font-semibold text-gray-900">
                Generated Secret
              </label>
              <div className="flex items-center text-xs text-gray-500">
                <Key className="h-3 w-3 mr-1" />
                <span>{selectedLength.bytes * 2} characters</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 pr-12 font-mono text-sm break-all min-h-[80px] flex items-center">
                {secret ? (
                  <span className="text-gray-900 leading-relaxed">{secret}</span>
                ) : (
                  <span className="text-gray-400">Generating secret...</span>
                )}
              </div>
              
              {secret && (
                <button
                  onClick={copyToClipboard}
                  className="absolute top-3 right-3 p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Shield className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800 mb-1">Security Note</p>
                  <p className="text-amber-700">
                    Store this secret securely in your environment variables. Never commit it to version control or expose it in client-side code.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CLI Reference */}
      <div className="bg-gray-900 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
          <Key className="h-5 w-5" />
          <span>CLI Alternative</span>
        </h3>
        <p className="text-gray-300 mb-4">
          You can also generate secrets using the Better Auth CLI:
        </p>
        <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm">
          <code className="text-green-400">npx @better-auth/cli secret</code>
        </div>
        <p className="text-gray-400 text-sm mt-3">
          This command automatically adds the secret to your .env.local file
        </p>
      </div>
    </section>
  );
};

export default SecretGenerator;