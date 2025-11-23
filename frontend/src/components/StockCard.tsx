import { ArrowUpRight, ArrowDownRight, TrendingUp, Activity } from 'lucide-react';

interface StockCardProps {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    recommendation: 'BUY' | 'SELL' | 'HOLD';
}

export default function StockCard({ symbol, name, price, change, changePercent, recommendation }: StockCardProps) {
    const isPositive = change >= 0;

    return (
        <div className="glass-panel p-6 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{symbol}</h3>
                    <p className="text-sm text-neutral-400">{name}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${recommendation === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' :
                        recommendation === 'SELL' ? 'bg-rose-500/20 text-rose-400' :
                            'bg-yellow-500/20 text-yellow-400'
                    }`}>
                    {recommendation}
                </div>
            </div>

            <div className="flex items-end justify-between">
                <div>
                    <p className="text-2xl font-bold text-white">${price.toFixed(2)}</p>
                    <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        <span>{change > 0 ? '+' : ''}{change.toFixed(2)} ({changePercent.toFixed(2)}%)</span>
                    </div>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Activity className="w-6 h-6 text-neutral-500" />
                </div>
            </div>
        </div>
    );
}
