import Link from "next/link";

export default function Header() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-2xl">graphic_eq</span>
                    <span className="text-sm font-bold tracking-[0.2em] uppercase text-white">WHISPER</span>
                </Link>
                <div className="hidden md:flex items-center gap-10">
                    <Link className="text-sm font-semibold tracking-widest uppercase hover:text-primary transition-colors" href="/#features">Features</Link>
                    <Link className="text-sm font-semibold tracking-widest uppercase hover:text-primary transition-colors" href="/docs">Docs</Link>
                    <Link className="text-sm font-semibold tracking-widest uppercase hover:text-primary transition-colors" href="/whitepaper">Whitepaper</Link>
                    <Link className="text-sm font-semibold tracking-widest uppercase hover:text-primary transition-colors" href="/privacy">Privacy</Link>
                    <Link className="text-sm font-semibold tracking-widest uppercase hover:text-primary transition-colors" href="/inbox">Inbox</Link>
                </div>
                <div className="flex items-center gap-4">
                    <button className="bg-primary/10 border border-primary/50 text-primary px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-all shadow-[0_0_10px_rgba(124,59,237,0.2)]">
                        Connect Wallet
                    </button>
                </div>
            </div>
        </nav>
    );
}
