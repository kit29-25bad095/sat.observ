import { useState, useEffect } from 'react';
import EarthVisualization from './components/EarthVisualization';
import ProcessingPipeline from './components/ProcessingPipeline';
import ImpactMetrics from './components/ImpactMetrics';
import DataFeed from './components/DataFeed';
import Header from './components/Header';

function App() {
  const [activeSatellites, setActiveSatellites] = useState(12);
  const [dataProcessed, setDataProcessed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataProcessed(prev => (prev + 1) % 1000);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-transparent to-transparent"></div>

      <div className="relative z-10">
        <Header activeSatellites={activeSatellites} dataProcessed={dataProcessed} />

        <main className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-12">
            <div className="xl:col-span-3">
              <EarthVisualization />
            </div>
            <div className="xl:col-span-1">
              <DataFeed />
            </div>
          </div>

          <ProcessingPipeline />

          <ImpactMetrics />
        </main>

        <footer className="border-t border-slate-800 mt-16 py-6">
          <div className="container mx-auto px-6 text-center text-slate-400 text-sm">
            <p>Earth Observation Platform • Unified Satellite Intelligence System</p>
            <p className="mt-2 text-slate-500">Integrating Sentinel, Landsat, ISRO & Global Earth Data Networks</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
