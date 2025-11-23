import { ExternalLink, Clock } from 'lucide-react';

interface NewsCardProps {
    title: string;
    source: string;
    time: string;
    summary: string;
    url: string;
    sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
}

export default function NewsCard({ title, source, time, summary, url, sentiment }: NewsCardProps) {
    return (
        <div className="glass-panel p-4 rounded-xl hover:bg-white/10 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">{source}</span>
                    <div className="flex items-center gap-1 text-xs text-neutral-500">
                        <Clock className="w-3 h-3" />
                        <span>{time}</span>
                    </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${sentiment === 'POSITIVE' ? 'bg-emerald-500' :
                        sentiment === 'NEGATIVE' ? 'bg-rose-500' :
                            'bg-yellow-500'
                    }`} />
            </div>

            <h3 className="text-white font-medium mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
                <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
            </h3>

            <p className="text-sm text-neutral-400 line-clamp-3 mb-3">
                {summary}
            </p>

            <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-emerald-500 hover:text-emerald-400 transition-colors">
                Read more <ExternalLink className="w-3 h-3" />
            </a>
        </div>
    );
}
