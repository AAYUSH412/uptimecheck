export default function Page() {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      <div className="text-center space-y-6 max-w-2xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          UptimeCheck
        </h1>
        <p className="text-xl text-gray-600">
          Modern website monitoring solution built with Next.js 15 and React 19
        </p>
        <div className="flex gap-4 justify-center">
          <a 
            href="/dashboard" 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </a>
          <a 
            href="#about" 
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
      
      {/* About section */}
      <section id="about" className="absolute top-full w-full py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            About UptimeCheck
          </h2>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              UptimeCheck is a modern, enterprise-grade website monitoring solution built with cutting-edge technology. 
              Our platform provides real-time monitoring, instant alerts, and comprehensive analytics.
            </p>
            <p>
              Built by <a 
                href="https://aayush-vaghela.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                Aayush Vaghela
              </a>, showcasing advanced React patterns and microservices architecture.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
