import Link from 'next/link';
import { BarChart2, Search, Bell, Settings } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="border-b border-white/10 bg-neutral-900/50 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-2">
                        <div className="bg-emerald-500/10 p-2 rounded-lg">
                            <BarChart2 className="w-6 h-6 text-emerald-500" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                            StockPro
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-sm font-medium text-white hover:text-emerald-400 transition-colors">
                            Dashboard
                        </Link>
                        <Link href="/markets" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
                            Markets
                        </Link>
                        <Link href="/news" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
                            News
                        </Link>
                        <Link href="/screener" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
                            Screener
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                            <Bell className="w-5 h-5" />
                        </button>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500" />
                    </div>
                </div>
            </div>
        </nav>
    );
}
