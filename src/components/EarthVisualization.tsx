import { useEffect, useState } from 'react';
import { Radio } from 'lucide-react';

interface Satellite {
  id: number;
  name: string;
  type: string;
  angle: number;
  distance: number;
  speed: number;
  color: string;
}

export default function EarthVisualization() {
  const [satellites, setSatellites] = useState<Satellite[]>([
    { id: 1, name: 'Sentinel-2A', type: 'Optical', angle: 0, distance: 180, speed: 0.5, color: 'cyan' },
    { id: 2, name: 'Landsat-9', type: 'Multispectral', angle: 60, distance: 200, speed: 0.4, color: 'green' },
    { id: 3, name: 'Sentinel-1B', type: 'Radar', angle: 120, distance: 190, speed: 0.6, color: 'blue' },
    { id: 4, name: 'ISRO-EOS', type: 'Hyperspectral', angle: 180, distance: 210, speed: 0.45, color: 'emerald' },
    { id: 5, name: 'Sentinel-3', type: 'Ocean', angle: 240, distance: 195, speed: 0.55, color: 'teal' },
    { id: 6, name: 'Landsat-8', type: 'Thermal', angle: 300, distance: 205, speed: 0.5, color: 'sky' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSatellites(prev =>
        prev.map(sat => ({
          ...sat,
          angle: (sat.angle + sat.speed) % 360,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const getSatellitePosition = (angle: number, distance: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: Math.cos(rad) * distance,
      y: Math.sin(rad) * distance,
    };
  };

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      cyan: 'bg-cyan-400',
      green: 'bg-green-400',
      blue: 'bg-blue-400',
      emerald: 'bg-emerald-400',
      teal: 'bg-teal-400',
      sky: 'bg-sky-400',
    };
    return colors[color] || 'bg-cyan-400';
  };

  const getGlowClass = (color: string) => {
    const colors: Record<string, string> = {
      cyan: 'shadow-[0_0_20px_rgba(34,211,238,0.6)]',
      green: 'shadow-[0_0_20px_rgba(74,222,128,0.6)]',
      blue: 'shadow-[0_0_20px_rgba(96,165,250,0.6)]',
      emerald: 'shadow-[0_0_20px_rgba(52,211,153,0.6)]',
      teal: 'shadow-[0_0_20px_rgba(45,212,191,0.6)]',
      sky: 'shadow-[0_0_20px_rgba(56,189,248,0.6)]',
    };
    return colors[color] || 'shadow-[0_0_20px_rgba(34,211,238,0.6)]';
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-2xl border border-slate-700/50 p-8 backdrop-blur-sm">
      <div className="absolute top-4 left-4">
        <h2 className="text-lg font-semibold text-slate-200">Global Satellite Network</h2>
        <p className="text-xs text-slate-400 mt-1">Real-time orbital visualization</p>
      </div>

      <div className="relative flex items-center justify-center" style={{ height: '500px' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>

          <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 via-cyan-500 to-green-400 shadow-[0_0_60px_rgba(34,211,238,0.8)] animate-[spin_60s_linear_infinite]">
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-900 via-slate-900 to-green-900 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDM0LDIxMSwyMzgsMC4xKSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/10 to-transparent animate-[spin_20s_linear_infinite]"></div>
              <div className="text-xs text-cyan-400 font-medium z-10 text-center">
                <div className="mb-1">EARTH</div>
                <div className="text-[10px] text-slate-400">Live Feed</div>
              </div>
            </div>
          </div>

          {satellites.map((sat) => {
            const pos = getSatellitePosition(sat.angle, sat.distance);
            const earthPos = { x: 0, y: 0 };

            return (
              <div key={sat.id}>
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ transform: 'translate(0, 0)' }}
                >
                  <defs>
                    <linearGradient id={`gradient-${sat.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={`var(--tw-gradient-from)`} stopOpacity="0" />
                      <stop offset="50%" stopColor={`currentColor`} stopOpacity="0.3" />
                      <stop offset="100%" stopColor={`var(--tw-gradient-to)`} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <line
                    x1="50%"
                    y1="50%"
                    x2={`calc(50% + ${pos.x}px)`}
                    y2={`calc(50% + ${pos.y}px)`}
                    stroke={`url(#gradient-${sat.id})`}
                    strokeWidth="1"
                    className={`text-${sat.color}-400`}
                    opacity="0.4"
                  />
                </svg>

                <div
                  className="absolute transition-all duration-75 ease-linear"
                  style={{
                    left: `calc(50% + ${pos.x}px)`,
                    top: `calc(50% + ${pos.y}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className={`w-3 h-3 ${getColorClass(sat.color)} ${getGlowClass(sat.color)} rounded-full animate-pulse`}></div>

                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                    <div className="bg-slate-900/95 border border-slate-700 rounded-lg px-3 py-2 backdrop-blur-sm">
                      <div className="text-xs font-semibold text-white">{sat.name}</div>
                      <div className="text-[10px] text-slate-400">{sat.type}</div>
                      <div className="flex items-center space-x-1 mt-1">
                        <Radio className="w-3 h-3 text-green-400" />
                        <span className="text-[10px] text-green-400">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-700/50">
        {[
          { label: 'Sentinel Series', count: 3, color: 'cyan' },
          { label: 'Landsat Program', count: 2, color: 'green' },
          { label: 'ISRO Network', count: 1, color: 'emerald' },
        ].map((source) => (
          <div key={source.label} className="flex items-center space-x-3">
            <div className={`w-3 h-3 bg-${source.color}-400 rounded-full`}></div>
            <div>
              <div className="text-sm font-medium text-slate-200">{source.label}</div>
              <div className="text-xs text-slate-400">{source.count} satellites</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
