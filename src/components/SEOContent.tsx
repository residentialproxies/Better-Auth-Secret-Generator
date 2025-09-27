import React from 'react';
import { Shield, Zap, Code, Users } from 'lucide-react';

const SEOContent: React.FC = () => {
  return (
    <section className="max-w-4xl mx-auto py-16">
      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Fast Generation</h3>
          <p className="text-sm text-gray-600">
            Generate secure secrets instantly using Web Crypto API
          </p>
        </div>

        <div className="text-center p-6">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Cryptographically Secure</h3>
          <p className="text-sm text-gray-600">
            Uses browser's secure random number generation
          </p>
        </div>

        <div className="text-center p-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Code className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">TypeScript Ready</h3>
          <p className="text-sm text-gray-600">
            Perfect for Better Auth TypeScript applications
          </p>
        </div>

        <div className="text-center p-6">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-orange-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Developer Friendly</h3>
          <p className="text-sm text-gray-600">
            Simple interface with implementation examples
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 transition-colors duration-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              What's the difference between this tool and the official OpenSSL command?
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border-l-4 border-blue-500">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Better Auth officially recommends using <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200">openssl rand -base64 32</code> 
                to generate secrets. <strong className="text-gray-900 dark:text-gray-100">Key differences:</strong>
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">OpenSSL command:</h4>
                  <p className="text-green-700 dark:text-green-400 text-sm">Generates 32 random bytes, then converts to Base64 format (~44 characters)</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Our tool:</h4>
                  <p className="text-blue-700 dark:text-blue-400 text-sm">Generates 32 random bytes, then converts to hexadecimal format (64 characters)</p>
                </div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <p className="text-amber-800 dark:text-amber-300 text-sm font-medium">
                  Both methods have the <strong>same entropy</strong> (256 bits) and identical security, just different encoding formats. Better Auth accepts secrets in any format.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              What is Better Auth?
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border-l-4 border-purple-500">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Better Auth is a universal authentication and authorization framework for TypeScript applications. 
                It provides secure, flexible authentication solutions with built-in security features and easy integration.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              How secure are the generated secrets?
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border-l-4 border-green-500">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our generator uses the Web Crypto API's cryptographically secure pseudo-random number generator (CSPRNG). 
                This provides the same level of security as Better Auth's official CLI tool and OpenSSL commands.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
              Does Better Auth support different secret lengths?
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border-l-4 border-orange-500">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Better Auth primarily uses 32-byte (256-bit) secrets as recommended in their documentation. While the framework 
                can technically handle longer secrets, the standard 32-byte length provides excellent security for most applications. 
                The enhanced and maximum options are provided for users who prefer additional entropy, though they exceed typical requirements.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
              Which secret length should I choose?
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border-l-4 border-red-500">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                For most applications, the standard 32-byte (256-bit) secret provides excellent security. 
                Choose longer secrets for applications handling highly sensitive data or enterprise environments.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
              Can I use this for production applications?
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border-l-4 border-teal-500">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Yes! The secrets generated here are suitable for production use. However, ensure you follow 
                security best practices: store secrets in environment variables, never commit them to version control, 
                and consider periodic rotation.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
              Should I use this tool or the OpenSSL command?
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border-l-4 border-indigo-500">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Both methods generate equally secure secrets. The official <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200">openssl rand -base64 32</code> 
                command is perfect for command-line workflows, while this web tool offers convenience, visual feedback, 
                and educational content.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  <h4 className="font-semibold text-green-800 dark:text-green-300 text-sm mb-1">OpenSSL Command</h4>
                  <p className="text-green-700 dark:text-green-400 text-xs">Perfect for CLI workflows and automation</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 text-sm mb-1">Web Tool</h4>
                  <p className="text-blue-700 dark:text-blue-400 text-xs">Convenient with visual feedback and guides</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Details */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About Better Auth Secrets
        </h2>
        <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
          Better Auth secrets are hexadecimal strings used for cryptographic operations in your authentication system. 
          They secure session tokens, sign JWT tokens, encrypt sensitive data, and hash passwords. Our generator 
          creates secrets that are compatible with the Better Auth framework and follow industry security standards.
        </p>
      </div>
    </section>
  );
};

export default SEOContent;