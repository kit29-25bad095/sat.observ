export interface Satellite {
  id: string;
  constellation: string;
  status: 'active' | 'standby' | 'maintenance';
  latitude: number;
  longitude: number;
  altitude: number; // km
  velocity: number; // km/s
  battery: number; // %
  temperature: number; // °C
  signalStrength: number; // dBm
  lastContact: string; // ISO time
}

export const SATELLITES: Satellite[] = [
  { id: 'STAR-1042', constellation: 'Starlink', status: 'active', latitude: 51.5, longitude: -0.1, altitude: 550, velocity: 7.59, battery: 87, temperature: -42, signalStrength: -98, lastContact: '2026-08-07T06:48:11Z' },
  { id: 'STAR-1043', constellation: 'Starlink', status: 'active', latitude: 34.0, longitude: 118.2, altitude: 551, velocity: 7.58, battery: 92, temperature: -38, signalStrength: -95, lastContact: '2026-08-07T06:48:09Z' },
  { id: 'STAR-2210', constellation: 'Starlink', status: 'standby', latitude: -33.8, longitude: 151.2, altitude: 549, velocity: 7.6, battery: 64, temperature: -45, signalStrength: -102, lastContact: '2026-08-07T06:47:58Z' },
  { id: 'ONEW-330', constellation: 'OneWeb', status: 'active', latitude: 48.8, longitude: 2.3, altitude: 1200, velocity: 7.31, battery: 78, temperature: -39, signalStrength: -101, lastContact: '2026-08-07T06:48:02Z' },
  { id: 'ONEW-331', constellation: 'OneWeb', status: 'maintenance', latitude: -23.5, longitude: -46.6, altitude: 1200, velocity: 7.31, battery: 41, temperature: -50, signalStrength: -108, lastContact: '2026-08-07T06:45:30Z' },
  { id: 'GPS-074', constellation: 'Navstar', status: 'active', latitude: 40.7, longitude: -74.0, altitude: 20180, velocity: 3.87, battery: 95, temperature: -31, signalStrength: -90, lastContact: '2026-08-07T06:48:12Z' },
  { id: 'GPS-075', constellation: 'Navstar', status: 'active', latitude: 35.6, longitude: 139.6, altitude: 20182, velocity: 3.87, battery: 88, temperature: -33, signalStrength: -92, lastContact: '2026-08-07T06:48:10Z' },
  { id: 'GAL-219', constellation: 'Galileo', status: 'active', latitude: 52.5, longitude: 13.4, altitude: 23222, velocity: 3.69, battery: 81, temperature: -35, signalStrength: -94, lastContact: '2026-08-07T06:48:05Z' },
  { id: 'GAL-220', constellation: 'Galileo', status: 'standby', latitude: 1.3, longitude: 103.8, altitude: 23220, velocity: 3.69, battery: 55, temperature: -47, signalStrength: -106, lastContact: '2026-08-07T06:47:40Z' },
  { id: 'IRID-921', constellation: 'Iridium', status: 'active', latitude: 25.2, longitude: 55.2, altitude: 780, velocity: 7.46, battery: 73, temperature: -41, signalStrength: -99, lastContact: '2026-08-07T06:48:01Z' },
  { id: 'IRID-922', constellation: 'Iridium', status: 'maintenance', latitude: -1.9, longitude: 37.4, altitude: 780, velocity: 7.46, battery: 38, temperature: -52, signalStrength: -110, lastContact: '2026-08-07T06:44:22Z' },
  { id: 'GLN-108', constellation: 'GLONASS', status: 'active', latitude: 55.7, longitude: 37.6, altitude: 19100, velocity: 3.95, battery: 84, temperature: -36, signalStrength: -96, lastContact: '2026-08-07T06:48:07Z' },
];
