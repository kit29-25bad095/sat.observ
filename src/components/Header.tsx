import { Satellite, Globe, Activity } from 'lucide-react';

interface HeaderProps {
  activeSatellites: number;
  dataProcessed: number;
}

export default function Header({ activeSatellites, dataProcessed }: HeaderProps) {
  return (
    <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Globe className="w-8 h-8 text-cyan-400" />
              <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-30 animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Earth Observation Platform
              </h1>
              <p className="text-xs text-slate-400">Unified Satellite Intelligence</p>
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Satellite className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-xs text-slate-400">Active Satellites</p>
                <p className="text-lg font-semibold text-green-400">{activeSatellites}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="text-xs text-slate-400">Data Streams</p>
                <p className="text-lg font-semibold text-cyan-400">{dataProcessed.toString().padStart(3, '0')}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400 font-medium">System Operational</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
