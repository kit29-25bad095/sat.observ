import { useMemo, useState } from 'react';
import EarthCanvas from './EarthCanvas';
import TelemetryFeed from './TelemetryFeed';
import TelemetryModal from './TelemetryModal';
import { SATELLITES } from './satellites';
import './App.css';

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [globalQuery, setGlobalQuery] = useState('');

  const selectedSat = useMemo(
    () => SATELLITES.find((s) => s.id === selectedId) ?? null,
    [selectedId],
  );

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-brand">
          <span className="app-logo" aria-hidden="true"></span>
          <div>
            <h1 className="app-title">Orbital Telemetry Console</h1>
            <p className="app-tagline">Live satellite tracking across global constellations</p>
          </div>
        </div>
        <div className="app-global-search">
          <svg className="feed-search-icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            placeholder="Global search — ID, constellation, status"
            value={globalQuery}
            onChange={(e) => setGlobalQuery(e.target.value)}
            aria-label="Global search across satellites"
          />
        </div>
      </header>

      <main className="app-main">
        <section className="panel earth-panel">
          <div className="panel-label">Earth View</div>
          <EarthCanvas satellites={SATELLITES} selectedId={selectedId} />
          <div className="earth-legend">
            <span className="legend-item"><i className="dot dot-active"></i>Active</span>
            <span className="legend-item"><i className="dot dot-standby"></i>Standby</span>
            <span className="legend-item"><i className="dot dot-maintenance"></i>Maintenance</span>
          </div>
        </section>

        <section className="panel feed-panel">
          <TelemetryFeed
            satellites={SATELLITES}
            selectedId={selectedId}
            onSelect={setSelectedId}
            globalQuery={globalQuery}
          />
        </section>
      </main>

      <TelemetryModal satellite={selectedSat} onClose={() => setSelectedId(null)} />
    </div>
  );
}
