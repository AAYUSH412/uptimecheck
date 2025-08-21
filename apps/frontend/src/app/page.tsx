"use client";

import Home from '../components/Home';

export default function Page() {
  return (
    <div className="min-h-screen w-full relative">
      <Home />
      {/* About section anchor */}
      <section id="about" className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            About UptimeCheck
          </h2>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              UptimeCheck is a modern, enterprise-grade website monitoring solution built with cutting-edge technology. 
              Our platform provides real-time monitoring, instant alerts, and comprehensive analytics to ensure your 
              websites and APIs are always performing at their best.
            </p>
            <p>
              Built by <a 
                href="https://aayush-vaghela.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                Aayush Vaghela
              </a>, a passionate full-stack developer with expertise in modern web technologies. 
              This project showcases advanced React patterns, microservices architecture, and real-time communication.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Modern Architecture</h3>
                <p className="text-gray-600">Built with Next.js 15, React 19, and TypeScript for maximum performance</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Real-time Updates</h3>
                <p className="text-gray-600">WebSocket-based communication for instant monitoring updates</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Scalable Design</h3>
                <p className="text-gray-600">Microservices architecture designed to scale with your needs</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}