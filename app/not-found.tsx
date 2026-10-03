import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <main id="main-content" className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md mx-auto">
        <div className="text-8xl font-black text-navy-100 mb-4 select-none" aria-hidden="true">404</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Page not found</h1>
        <p className="text-slate-600 mb-8">
          We could not find the page you were looking for. It may have moved or the link may be incorrect.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/home"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy-800 text-white rounded-xl font-semibold hover:bg-navy-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2"
          >
            <Home size={16} />
            Go to Home
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600"
          >
            Browse Services
          </Link>
        </div>
      </div>
    </main>
  );
}
