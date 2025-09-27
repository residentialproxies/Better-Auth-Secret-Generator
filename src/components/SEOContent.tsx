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
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              这个工具和官方 OpenSSL 命令有什么区别？
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Better Auth 官方推荐使用 <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">openssl rand -base64 32</code> 
              生成密钥。<strong>重要区别：</strong>
              <br/><br/>
              • <strong>OpenSSL 命令</strong>：生成 32 个随机字节，然后转换为 Base64 格式（约 44 个字符）
              <br/>
              • <strong>我们的工具</strong>：生成 32 个随机字节，然后转换为十六进制格式（64 个字符）
              <br/><br/>
              两种方法的<strong>熵值相同</strong>（256 位），安全性完全一样，只是编码格式不同。Better Auth 可以接受任何格式的密钥。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What is Better Auth?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Better Auth is a universal authentication and authorization framework for TypeScript applications. 
              It provides secure, flexible authentication solutions with built-in security features and easy integration.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Does Better Auth support different secret lengths?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Better Auth primarily uses 32-byte (256-bit) secrets as recommended in their documentation. While the framework 
              can technically handle longer secrets, the standard 32-byte length provides excellent security for most applications. 
              The enhanced and maximum options are provided for users who prefer additional entropy, though they exceed typical requirements.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How secure are the generated secrets?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our generator uses the Web Crypto API's cryptographically secure pseudo-random number generator (CSPRNG). 
              This provides the same level of security as Better Auth's official CLI tool.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Which secret length should I choose?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              For most applications, the standard 32-byte (256-bit) secret provides excellent security. 
              Choose longer secrets for applications handling highly sensitive data or enterprise environments.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Can I use this for production applications?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Yes! The secrets generated here are suitable for production use. However, ensure you follow 
              security best practices: store secrets in environment variables, never commit them to version control, 
              and consider periodic rotation.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Should I use this tool or the OpenSSL command?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Both methods generate equally secure secrets. The official <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">openssl rand -base64 32</code> 
              command is perfect for command-line workflows, while this web tool offers convenience, visual feedback, 
              and educational content. Choose based on your preference and development environment.
            </p>
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