import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-background-dark text-white font-display overflow-x-hidden">
      {/* Particle Background Simulator */}
      <div className="particle-bg cyber-grid pointer-events-none fixed inset-0">
        <div className="particle" style={{ width: "2px", height: "2px", top: "10%", left: "20%" }}></div>
        <div className="particle" style={{ width: "3px", height: "3px", top: "30%", left: "80%" }}></div>
        <div className="particle" style={{ width: "1px", height: "1px", top: "70%", left: "40%" }}></div>
        <div className="particle" style={{ width: "4px", height: "4px", top: "50%", left: "10%" }}></div>
        <div className="particle" style={{ width: "2px", height: "2px", top: "85%", left: "75%" }}></div>
        <div className="particle" style={{ width: "3px", height: "3px", top: "15%", left: "90%" }}></div>
      </div>

      <Header />

      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-1 border border-primary/30 rounded-full bg-primary/5">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Decentralized Encryption Protocol</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter text-white mb-8 neon-glow">
              YOUR MESSAGES.<br />YOUR PRIVACY.<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 italic">FOREVER.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 font-medium">
              Zero-knowledge email on Midnight blockchain. Own your data, encrypt your life, and escape the surveillance economy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="w-full sm:w-auto px-10 py-5 bg-primary text-white font-black uppercase tracking-widest rounded-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(124,59,237,0.4)]">
                Launch App
              </button>
              <button className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-lg hover:bg-white/10 transition-colors">
                Read Whitepaper
              </button>
            </div>
          </div>
          {/* Bottom visual accent */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
            <span className="material-symbols-outlined text-3xl">expand_more</span>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-4 mb-16">
              <h2 className="text-4xl font-black tracking-tight text-white uppercase italic">
                The Future of <span className="text-primary">Communication</span>
              </h2>
              <div className="h-1 w-24 bg-primary rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature Card 1 */}
              <div className="glass-card p-8 rounded-xl group hover:border-primary transition-all">
                <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(124,59,237,0.1)] group-hover:bg-primary transition-colors">
                  <span className="material-symbols-outlined text-primary group-hover:text-white text-3xl">lock</span>
                </div>
                <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">End-to-End Encrypted</h3>
                <p className="text-white/60 leading-relaxed">
                  Your keys, your data. Not even we can read your messages. Built with military-grade asymmetric encryption.
                </p>
                <div className="mt-8 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
              {/* Feature Card 2 */}
              <div className="glass-card p-8 rounded-xl group hover:border-primary transition-all">
                <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(124,59,237,0.1)] group-hover:bg-primary transition-colors">
                  <span className="material-symbols-outlined text-primary group-hover:text-white text-3xl">visibility_off</span>
                </div>
                <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">Zero-Knowledge Privacy</h3>
                <p className="text-white/60 leading-relaxed">
                  Send and receive without leaving a metadata trail. Midnight blockchain keeps your identity completely shielded.
                </p>
                <div className="mt-8 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
              {/* Feature Card 3 */}
              <div className="glass-card p-8 rounded-xl group hover:border-primary transition-all">
                <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(124,59,237,0.1)] group-hover:bg-primary transition-colors">
                  <span className="material-symbols-outlined text-primary group-hover:text-white text-3xl">hub</span>
                </div>
                <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">Decentralized Network</h3>
                <p className="text-white/60 leading-relaxed">
                  Powered by a global node network for 100% uptime. Censorship-resistant architecture ensures your voice stays heard.
                </p>
                <div className="mt-8 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
          <div className="max-w-4xl mx-auto glass-card p-12 md:p-20 rounded-3xl relative overflow-hidden text-center border-primary/40">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight italic">Ready to go <span className="text-primary">dark?</span></h2>
            <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto">
              Join the decentralized revolution and reclaim your digital privacy today. Secure your unique .whisper handle.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-12 py-5 bg-primary text-white font-black uppercase tracking-widest rounded-lg shadow-[0_0_20px_rgba(124,59,237,0.5)] hover:scale-105 transition-transform">
                Get Early Access
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
