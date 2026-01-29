import { useEffect, useState } from 'react';
import { Radio, CheckCircle2, Download } from 'lucide-react';

interface DataStream {
  id: number;
  satellite: string;
  type: string;
  size: string;
  timestamp: string;
  status: 'processing' | 'completed';
}

export default function DataFeed() {
  const [streams, setStreams] = useState<DataStream[]>([
    {
      id: 1,
      satellite: 'Sentinel-2A',
      type: 'Optical RGB',
      size: '1.2 GB',
      timestamp: '2 sec ago',
      status: 'completed',
    },
    {
      id: 2,
      satellite: 'Landsat-9',
      type: 'Multispectral',
      size: '847 MB',
      timestamp: '5 sec ago',
      status: 'processing',
    },
    {
      id: 3,
      satellite: 'ISRO-EOS',
      type: 'Hyperspectral',
      size: '2.1 GB',
      timestamp: '8 sec ago',
      status: 'completed',
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newStream: DataStream = {
        id: Date.now(),
        satellite: ['Sentinel-2A', 'Landsat-9', 'ISRO-EOS', 'Sentinel-1B', 'Sentinel-3'][
          Math.floor(Math.random() * 5)
        ],
        type: ['Optical RGB', 'Multispectral', 'Radar SAR', 'Thermal IR', 'Hyperspectral'][
          Math.floor(Math.random() * 5)
        ],
        size: `${(Math.random() * 2 + 0.5).toFixed(1)} GB`,
        timestamp: 'Just now',
        status: 'processing',
      };

      setStreams((prev) => [newStream, ...prev.slice(0, 9)]);

      setTimeout(() => {
        setStreams((prev) =>
          prev.map((stream) =>
            stream.id === newStream.id ? { ...stream, status: 'completed' as const } : stream
          )
        );
      }, 2000);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-2xl border border-slate-700/50 p-6 backdrop-blur-sm h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-200 flex items-center space-x-2">
          <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
          <span>Live Data Feed</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">Real-time satellite acquisitions</p>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="space-y-3 h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
          {streams.map((stream) => (
            <div
              key={stream.id}
              className={`bg-slate-800/50 border ${
                stream.status === 'processing' ? 'border-cyan-500/30' : 'border-slate-700/50'
              } rounded-lg p-3 transition-all duration-300 hover:border-cyan-500/50`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-slate-200">{stream.satellite}</div>
                  <div className="text-xs text-slate-400">{stream.type}</div>
                </div>
                {stream.status === 'completed' ? (
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                ) : (
                  <div className="relative">
                    <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">{stream.size}</span>
                <span className="text-slate-400">{stream.timestamp}</span>
              </div>

              {stream.status === 'processing' && (
                <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-[pulse_1.5s_ease-in-out_infinite] w-2/3"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700/50">
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
            <div className="text-xl font-bold text-cyan-400">24.7</div>
            <div className="text-xs text-slate-400">TB Today</div>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            <div className="text-xl font-bold text-green-400">1,847</div>
            <div className="text-xs text-slate-400">Files</div>
          </div>
        </div>
      </div>

      <button className="mt-4 w-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg px-4 py-2 text-sm font-medium transition-colors flex items-center justify-center space-x-2">
        <Download className="w-4 h-4" />
        <span>Export Data Log</span>
      </button>
    </div>
  );
}
