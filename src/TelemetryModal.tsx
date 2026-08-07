import type { Satellite } from './satellites';

interface TelemetryModalProps {
  satellite: Satellite | null;
  onClose: () => void;
}

const STATUS_LABEL: Record<Satellite['status'], string> = {
  active: 'Active',
  standby: 'Standby',
  maintenance: 'Maintenance',
};

function Row({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="modal-row">
      <span className="modal-row-label">{label}</span>
      <span className="modal-row-value">
        {value}
        {unit ? <span className="modal-row-unit"> {unit}</span> : null}
      </span>
    </div>
  );
}

export default function TelemetryModal({ satellite, onClose }: TelemetryModalProps) {
  if (!satellite) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{satellite.id}</h2>
            <span className="modal-subtitle">{satellite.constellation} constellation</span>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close details">
            ×
          </button>
        </div>

        <span className={`status-badge status-${satellite.status}`}>{STATUS_LABEL[satellite.status]}</span>

        <div className="modal-grid">
          <Row label="Latitude" value={satellite.latitude.toFixed(2)} unit="°" />
          <Row label="Longitude" value={satellite.longitude.toFixed(2)} unit="°" />
          <Row label="Altitude" value={satellite.altitude.toLocaleString()} unit="km" />
          <Row label="Velocity" value={satellite.velocity.toFixed(2)} unit="km/s" />
          <Row label="Battery" value={`${satellite.battery}`} unit="%" />
          <Row label="Temperature" value={satellite.temperature.toFixed(0)} unit="°C" />
          <Row label="Signal strength" value={satellite.signalStrength.toFixed(0)} unit="dBm" />
          <Row label="Last contact" value={new Date(satellite.lastContact).toUTCString()} />
        </div>
      </div>
    </div>
  );
}
