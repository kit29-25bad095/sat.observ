import { useEffect, useState } from 'react';
import { Radio, MapPin, Orbit } from 'lucide-react';

interface Satellite {
  id: number;
  name: string;
  type: string;
  angle: number;
  orbitalInclination: number;
  altitude: number;
  distance: number;
  speed: number;
  color: string;
  latitude: number;
  longitude: number;
}

interface GroundTrack {
  satelliteId: number;
  points: { lat: number; lon: number; age: number }[];
}

export default function EarthVisualization() {
  const [satellites, setSatellites] = useState<Satellite[]>([
    { id: 1, name: 'Sentinel-2A', type: 'Optical', angle: 0, orbitalInclination: 98.5, altitude: 786, distance: 180, speed: 0.5, color: 'cyan', latitude: 0, longitude: 0 },
    { id: 2, name: 'Landsat-9', type: 'Multispectral', angle: 60, orbitalInclination: 98.2, altitude: 705, distance: 200, speed: 0.4, color: 'green', latitude: 0, longitude: 0 },
    { id: 3, name: 'Sentinel-1B', type: 'Radar', angle: 120, orbitalInclination: 98.2, altitude: 693, distance: 190, speed: 0.6, color: 'blue', latitude: 0, longitude: 0 },
    { id: 4, name: 'ISRO-EOS', type: 'Hyperspectral', angle: 180, orbitalInclination: 97.5, altitude: 720, distance: 210, speed: 0.45, color: 'emerald', latitude: 0, longitude: 0 },
    { id: 5, name: 'Sentinel-3', type: 'Ocean', angle: 240, orbitalInclination: 98.6, altitude: 815, distance: 195, speed: 0.55, color: 'teal', latitude: 0, longitude: 0 },
    { id: 6, name: 'Landsat-8', type: 'Thermal', angle: 300, orbitalInclination: 98.2, altitude: 705, distance: 205, speed: 0.5, color: 'sky', latitude: 0, longitude: 0 },
  ]);

  const [groundTracks, setGroundTracks] = useState<GroundTrack[]>([]);
  const [selectedSatellite, setSelectedSatellite] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      setSatellites((prev) =>
        prev.map((sat) => {
          const newAngle = (sat.angle + sat.speed) % 360;
          const orbitalPeriod = 100;
          const longitude = ((newAngle / 360) * 360 - 180 + 360) % 360 - 180;
          const meanAnomaly = (newAngle * Math.PI) / 180;
          const latitude =
            Math.sin(meanAnomaly) * sat.orbitalInclination;
          return {
            ...sat,
            angle: newAngle,
            latitude: parseFloat(latitude.toFixed(2)),
            longitude: parseFloat(longitude.toFixed(2)),
          };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const trackInterval = setInterval(() => {
      setGroundTracks((prev) => {
        const updated = prev.map((track) => ({
          ...track,
          points: track.points
            .map((p) => ({ ...p, age: p.age + 1 }))
            .filter((p) => p.age < 80),
        }));

        satellites.forEach((sat) => {
          const existing = updated.find((t) => t.satelliteId === sat.id);
          if (existing) {
            existing.points.push({ lat: sat.latitude, lon: sat.longitude, age: 0 });
          } else {
            updated.push({
              satelliteId: sat.id,
              points: [{ lat: sat.latitude, lon: sat.longitude, age: 0 }],
            });
          }
        });

        return updated;
      });
    }, 100);

    return () => clearInterval(trackInterval);
  }, [satellites]);

  const getSatellitePosition = (angle: number, distance: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: Math.cos(rad) * distance,
      y: Math.sin(rad) * distance,
    };
  };

  const latLonToXY = (lat: number, lon: number) => {
    const sphereRadius = 80;
    const lonRad = (lon * Math.PI) / 180;
    const latRad = (lat * Math.PI) / 180;
    const x = sphereRadius * Math.cos(latRad) * Math.sin(lonRad - Math.PI / 4);
    const y = -sphereRadius * Math.sin(latRad) * 0.8;
    return { x, y };
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

  const getRingColor = (color: string) => {
    const colors: Record<string, string> = {
      cyan: 'border-cyan-400/30',
      green: 'border-green-400/30',
      blue: 'border-blue-400/30',
      emerald: 'border-emerald-400/30',
      teal: 'border-teal-400/30',
      sky: 'border-sky-400/30',
    };
    return colors[color] || 'border-cyan-400/30';
  };

  const formatCoord = (value: number, isLat: boolean) => {
    const abs = Math.abs(value);
    const dir = isLat ? (value >= 0 ? 'N' : 'S') : value >= 0 ? 'E' : 'W';
    return `${abs.toFixed(2)}${dir}`;
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-2xl border border-slate-700/50 p-8 backdrop-blur-sm">
      <div className="absolute top-4 left-4 flex items-start justify-between w-full pr-8">
        <div>
          <h2 className="text-lg font-semibold text-slate-200">Global Satellite Network</h2>
          <p className="text-xs text-slate-400 mt-1">Real-time orbital visualization</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">UTC Time</div>
          <div className="text-sm font-mono text-slate-300">{currentTime.toISOString().slice(11, 19)}</div>
        </div>
      </div>

      <div className="relative flex items-center justify-center" style={{ height: '500px' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>

          {groundTracks.map((track) => {
            const sat = satellites.find((s) => s.id === track.satelliteId);
            if (!sat) return null;
            return (
              <div key={`track-${track.satelliteId}`}>
                {track.points.slice(1).map((point, idx) => {
                  const opacity = Math.max(0, 1 - point.age / 80);
                  const pos = latLonToXY(point.lat, point.lon);
                  return (
                    <div
                      key={idx}
                      className={`absolute w-1 h-1 rounded-full ${getColorClass(sat.color)}`}
                      style={{
                        left: `calc(50% + ${pos.x}px)`,
                        top: `calc(50% + ${pos.y}px)`,
                        opacity: opacity * 0.5,
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  );
                })}
              </div>
            );
          })}

          <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 via-cyan-500 to-green-400 shadow-[0_0_60px_rgba(34,211,238,0.8)] animate-[spin_60s_linear_infinite]">
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-900 via-slate-900 to-green-900 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDM0LDIxMSwyMzgsMC4xKSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

              {satellites.map((sat) => {
                const groundPos = latLonToXY(sat.latitude, sat.longitude);
                return (
                  <div
                    key={`marker-${sat.id}`}
                    className={`absolute w-2 h-2 ${getColorClass(sat.color)} rounded-full transition-all duration-100 ${selectedSatellite === sat.id ? 'ring-2 ring-white/50' : ''}`}
                    style={{
                      left: `calc(50% + ${groundPos.x}px)`,
                      top: `calc(50% + ${groundPos.y}px)`,
                      transform: 'translate(-50%, -50%)',
                      boxShadow: `0 0 8px ${sat.color === 'cyan' ? 'rgba(34,211,238,0.8)' : sat.color === 'green' ? 'rgba(74,222,128,0.8)' : sat.color === 'blue' ? 'rgba(96,165,250,0.8)' : sat.color === 'emerald' ? 'rgba(52,211,153,0.8)' : sat.color === 'teal' ? 'rgba(45,212,191,0.8)' : 'rgba(56,189,248,0.8)'}`,
                    }}
                    onClick={() => setSelectedSatellite(selectedSatellite === sat.id ? null : sat.id)}
                  />
                );
              })}

              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/10 to-transparent animate-[spin_20s_linear_infinite]"></div>
              <div className="text-xs text-cyan-400 font-medium z-10 text-center">
                <div className="mb-1">EARTH</div>
                <div className="text-[10px] text-slate-400">Live Feed</div>
              </div>
            </div>
          </div>

          {satellites.map((sat) => {
            const pos = getSatellitePosition(sat.angle, sat.distance);
            const isSelected = selectedSatellite === sat.id;

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
                  className={`absolute transition-all duration-75 ease-linear cursor-pointer ${isSelected ? 'z-20' : 'z-10'}`}
                  style={{
                    left: `calc(50% + ${pos.x}px)`,
                    top: `calc(50% + ${pos.y}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={() => setSelectedSatellite(isSelected ? null : sat.id)}
                >
                  <div className={`w-3 h-3 ${getColorClass(sat.color)} ${getGlowClass(sat.color)} rounded-full animate-pulse ${isSelected ? 'ring-2 ring-white/50 scale-150' : ''}`}></div>

                  {isSelected && (
                    <div className={`absolute w-8 h-8 rounded-full border-2 ${getRingColor(sat.color)} animate-ping`}></div>
                  )}

                  <div className="absolute -top-20 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-200">
                    <div className={`bg-slate-900/95 border ${isSelected ? 'border-cyan-500/50' : 'border-slate-700'} rounded-lg px-3 py-2 backdrop-blur-sm shadow-lg`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Orbit className="w-3 h-3 text-slate-400" />
                        <span className="text-xs font-semibold text-white">{sat.name}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mb-2">{sat.type}</div>

                      <div className="flex flex-col gap-1 text-[10px] font-mono">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5 text-cyan-400" />
                          <span className="text-cyan-400">{formatCoord(sat.latitude, true)}</span>
                          <span className="text-slate-500">,</span>
                          <span className="text-green-400">{formatCoord(sat.longitude, false)}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-700/50">
                        <div className="flex items-center space-x-1">
                          <Radio className="w-3 h-3 text-green-400 animate-pulse" />
                          <span className="text-[10px] text-green-400">Active</span>
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {sat.altitude} km
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-700/50">
        <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-cyan-400" />
          Live Satellite Positions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {satellites.map((sat) => (
            <div
              key={`info-${sat.id}`}
              className={`bg-slate-800/50 rounded-lg p-3 border cursor-pointer transition-all ${selectedSatellite === sat.id ? 'border-cyan-500/50 bg-slate-800/80' : 'border-slate-700/50 hover:border-slate-600'}`}
              onClick={() => setSelectedSatellite(selectedSatellite === sat.id ? null : sat.id)}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 ${getColorClass(sat.color)} rounded-full animate-pulse`}></div>
                <span className="text-xs font-medium text-slate-200 truncate">{sat.name}</span>
              </div>
              <div className="space-y-1 font-mono text-[10px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">LAT</span>
                  <span className="text-cyan-400">{formatCoord(sat.latitude, true)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">LON</span>
                  <span className="text-green-400">{formatCoord(sat.longitude, false)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">ALT</span>
                  <span className="text-slate-400">{sat.altitude} km</span>
                </div>
              </div>
            </div>
          ))}
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
