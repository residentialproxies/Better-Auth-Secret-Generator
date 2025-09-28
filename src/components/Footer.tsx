import React from 'react';
import { Shield, Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold">Better Auth Secret Generator</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Generate cryptographically secure secrets for your Better Auth TypeScript applications. 
              Fast, secure, and free.
            </p>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a 
                  href="https://github.com/residentialproxies/Better-Auth-Secret-Generator" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.better-auth.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Better Auth Documentation
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/better-auth/better-auth" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Better Auth GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://www.npmjs.com/package/better-auth" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  NPM Package
                </a>
              </li>
            </ul>
          </div>

          {/* Security */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Security</h3>
            <ul className="space-y-2 text-gray-400">
              <li>✓ Cryptographically secure generation</li>
              <li>✓ No server-side storage</li>
              <li>✓ Client-side only processing</li>
              <li>✓ Industry standard practices</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-gray-400">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>for the TypeScript community</span>
          </div>
          
          <div className="text-gray-400 text-sm">
            © 2025 Better Auth Secret Generator. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;