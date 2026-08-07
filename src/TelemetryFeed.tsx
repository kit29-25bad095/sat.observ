import { useMemo, useState } from 'react';
import type { Satellite } from './satellites';

interface TelemetryFeedProps {
  satellites: Satellite[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  globalQuery: string;
}

const STATUS_LABEL: Record<Satellite['status'], string> = {
  active: 'Active',
  standby: 'Standby',
  maintenance: 'Maintenance',
};

export default function TelemetryFeed({ satellites, selectedId, onSelect, globalQuery }: TelemetryFeedProps) {
  const [feedQuery, setFeedQuery] = useState('');

  const filtered = useMemo(() => {
    const feedQ = feedQuery.trim().toLowerCase();
    const globalQ = globalQuery.trim().toLowerCase();
    return satellites.filter((s) => {
      const matchesFeed = feedQ
        ? s.id.toLowerCase().includes(feedQ) || s.constellation.toLowerCase().includes(feedQ)
        : true;
      const matchesGlobal = globalQ
        ? s.id.toLowerCase().includes(globalQ) ||
          s.constellation.toLowerCase().includes(globalQ) ||
          s.status.toLowerCase().includes(globalQ)
        : true;
      return matchesFeed && matchesGlobal;
    });
  }, [satellites, feedQuery, globalQuery]);

  const handleRowClick = (id: string) => {
    onSelect(selectedId === id ? null : id);
  };

  return (
    <div className="feed">
      <div className="feed-header">
        <h2 className="feed-title">Telemetry Feed</h2>
        <span className="feed-count">{filtered.length} satellites</span>
      </div>

      <div className="feed-search">
        <svg className="feed-search-icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          className="feed-search-input"
          type="search"
          placeholder="Filter by ID or Constellation"
          value={feedQuery}
          onChange={(e) => setFeedQuery(e.target.value)}
          aria-label="Filter satellites by ID or constellation"
        />
      </div>

      <div className="feed-table-wrap">
        <table className="feed-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Constellation</th>
              <th>Status</th>
              <th>Battery</th>
              <th>Signal</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td className="feed-empty" colSpan={5}>
                  No satellites match your filter.
                </td>
              </tr>
            ) : (
              filtered.map((s) => (
                <tr
                  key={s.id}
                  className={`feed-row${selectedId === s.id ? ' feed-row-selected' : ''}`}
                  onClick={() => handleRowClick(s.id)}
                >
                  <td className="feed-cell-id">{s.id}</td>
                  <td>{s.constellation}</td>
                  <td>
                    <span className={`status-badge status-${s.status}`}>{STATUS_LABEL[s.status]}</span>
                  </td>
                  <td>{s.battery}%</td>
                  <td>{s.signalStrength} dBm</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
