import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-background-dark border-t border-white/5 py-16 px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="material-symbols-outlined text-primary text-xl">graphic_eq</span>
                            <span className="text-sm font-bold tracking-[0.2em] uppercase text-white">WHISPER</span>
                        </div>
                        <p className="text-white/50 max-w-xs leading-relaxed mb-8">
                            The sovereign communication layer for the decentralized web. Built on Midnight, powered by ZK-proofs.
                        </p>
                        <div className="flex gap-4">
                            <Link className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white/70 hover:text-white" href="#">
                                <span className="material-symbols-outlined">share</span>
                            </Link>
                            <Link className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white/70 hover:text-white" href="#">
                                <span className="material-symbols-outlined">code</span>
                            </Link>
                            <Link className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white/70 hover:text-white" href="#">
                                <span className="material-symbols-outlined">group</span>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Resources</h4>
                        <ul className="space-y-4">
                            <li><Link className="text-white/50 hover:text-primary transition-colors text-sm" href="/docs">Documentation</Link></li>
                            <li><Link className="text-white/50 hover:text-primary transition-colors text-sm" href="https://github.com">Github</Link></li>
                            <li><Link className="text-white/50 hover:text-primary transition-colors text-sm" href="/whitepaper">Whitepaper</Link></li>
                            <li><Link className="text-white/50 hover:text-primary transition-colors text-sm" href="#">Midnight Network</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Legal</h4>
                        <ul className="space-y-4">
                            <li><Link className="text-white/50 hover:text-primary transition-colors text-sm" href="/privacy">Privacy Policy</Link></li>
                            <li><Link className="text-white/50 hover:text-primary transition-colors text-sm" href="#">Terms of Service</Link></li>
                            <li><Link className="text-white/50 hover:text-primary transition-colors text-sm" href="#">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-white/30 text-xs uppercase tracking-widest">© 2024 Whisper Protocol. Built on Midnight Blockchain.</p>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                        <span className="text-white/30 text-[10px] uppercase tracking-widest font-bold">Mainnet Beta Status</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
