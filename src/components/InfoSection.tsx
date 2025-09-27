import React from 'react';
import { Shield, Lock, Key, Hash, FileText, AlertTriangle } from 'lucide-react';

const InfoSection: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Understanding Better Auth Secrets
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn how Better Auth secrets secure your TypeScript applications through encryption, 
          signing, and hashing operations.
        </p>
      </div>

      {/* Purpose Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
            <Lock className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Encryption</h3>
          <p className="text-gray-600 leading-relaxed">
            Encrypts sensitive data including session tokens, user credentials, and other confidential 
            information to protect against unauthorized access.
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
            <FileText className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Signing</h3>
          <p className="text-gray-600 leading-relaxed">
            Digitally signs tokens and authentication data to ensure authenticity and integrity, 
            preventing tampering and unauthorized modifications.
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
            <Hash className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Hashing</h3>
          <p className="text-gray-600 leading-relaxed">
            Hashes passwords and sensitive information before storage, adding an essential layer 
            of security to your authentication system.
          </p>
        </div>
      </div>

      {/* Implementation Guide */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <Key className="h-6 w-6 text-blue-600" />
          <span>Implementation Guide</span>
        </h3>
        
        <div className="space-y-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">1. Environment Configuration</h4>
            <p className="text-gray-600 mb-4">
              Add your generated secret to your environment variables:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
              <code className="text-green-400">
                # .env.local<br/>
                BETTER_AUTH_SECRET=your_generated_secret_here
              </code>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">2. Better Auth Configuration</h4>
            <p className="text-gray-600 mb-4">
              Configure Better Auth with your secret:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <code className="text-gray-300">
                <span className="text-purple-400">import</span> &#123; betterAuth &#125; <span className="text-purple-400">from</span> <span className="text-green-400">"better-auth"</span>;<br/><br/>
                <span className="text-purple-400">export const</span> <span className="text-blue-400">auth</span> = <span className="text-yellow-400">betterAuth</span>(&#123;<br/>
                &nbsp;&nbsp;<span className="text-red-400">secret</span>: <span className="text-blue-400">process</span>.<span className="text-blue-400">env</span>.<span className="text-red-400">BETTER_AUTH_SECRET</span>,<br/>
                &nbsp;&nbsp;<span className="text-gray-500">// ... other configuration options</span><br/>
                &#125;);
              </code>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">3. Production Deployment</h4>
            <p className="text-gray-600 mb-4">
              Ensure your secret is properly configured in your production environment:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Set the environment variable in your hosting platform</li>
              <li>Use your platform's secret management system when available</li>
              <li>Never hardcode secrets in your application code</li>
              <li>Consider secret rotation for enhanced security</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Security Best Practices */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-6 w-6 text-red-600 mt-1" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-red-800 mb-4">Security Best Practices</h3>
            <div className="grid md:grid-cols-2 gap-6 text-red-700">
              <div>
                <h4 className="font-semibold mb-2">✓ Do:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Store secrets in environment variables</li>
                  <li>• Use strong, randomly generated secrets</li>
                  <li>• Rotate secrets periodically</li>
                  <li>• Use different secrets for different environments</li>
                  <li>• Keep secrets confidential and secure</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">✗ Don't:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Commit secrets to version control</li>
                  <li>• Expose secrets in client-side code</li>
                  <li>• Use weak or predictable secrets</li>
                  <li>• Share secrets via unsecure channels</li>
                  <li>• Hardcode secrets in your application</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;