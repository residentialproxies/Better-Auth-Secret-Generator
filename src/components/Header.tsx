import React from 'react';
import { Shield, Lock } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-3">
          <div className="relative">
            <Shield className="h-8 w-8 text-blue-600" />
            <Lock className="h-4 w-4 text-purple-600 absolute -top-1 -right-1" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Better Auth Secret Generator
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Secure TypeScript Authentication Keys
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;