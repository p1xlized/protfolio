import React from 'react';

// --- NEW: Human-Styled Shuttle (Modular / ISS Style) ---
export function HumanShuttle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
      <title>human-shuttle-blueprint</title>
      <g fill="none" stroke="currentColor" strokeWidth="1">
        {/* Cockpit / Nose */}
        <path d="M12 2l3 4v2l-3 1-3-1V6l3-4z" />
        {/* Main Body Modules */}
        <rect x="10" y="8" width="4" height="8" rx="1" />
        {/* Solar Arrays / Wings */}
        <path d="M6 9h4m4 0h4M6 13h4m4 0h4" strokeWidth="0.5" />
        <rect x="2" y="7" width="4" height="8" strokeDasharray="1 1" />
        <rect x="18" y="7" width="4" height="8" strokeDasharray="1 1" />
        {/* Thrusters */}
        <path d="M10 16l-1 3h6l-1-3" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// --- PREVIOUS OBJECTS ---

export function SatelliteOutline(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
      <path fill="currentColor" fillRule="evenodd" d="M12.63 2.924L1.635 9.03a.75.75 0 1 0 .728 1.311l8.686-4.825a5.98 5.98 0 0 0 1.005 5.368L4.47 18.47a.75.75 0 1 0 1.06 1.06l7.585-7.584a5.98 5.98 0 0 0 5.368 1.004l-4.825 8.686a.75.75 0 1 0 1.311.728l6.107-10.993a5.974 5.974 0 0 0-8.447-8.447m7.643 7.091a4.475 4.475 0 0 0-6.288-6.288c.085.172.2.39.356.649c.431.718 1.163 1.747 2.35 2.934c1.186 1.186 2.215 1.918 2.934 2.35q.388.23.648.355m-1.208 1.055q-.103-.059-.212-.124c-.703-.422-1.63-1.075-2.683-2.055l-1.983 1.983a4.48 4.48 0 0 0 4.878.196m-5.939-1.257a4.48 4.48 0 0 1-.196-4.878q.059.104.125.212c.421.703 1.074 1.63 2.054 2.683z" clipRule="evenodd" />
    </svg>
  );
}

export function Satellite1(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24">
      <path fill="currentColor" d="M17.135 12.37a5.45 5.45 0 0 0 3.42-1.2a.98.98 0 0 0 .37-.72a1.04 1.04 0 0 0-.31-.8l-2.78-2.78c.39-.39.8-.8 1.19-1.2c.08-.07.15-.14.23-.22a.51.51 0 0 0 0-.7a.5.5 0 0 0-.71 0c-.48.47-.94.94-1.42 1.41l-2.78-2.78a1.08 1.08 0 0 0-.8-.31a1 1 0 0 0-.72.37a5.45 5.45 0 0 0-1.19 3.67l-1.45 1.46l-2.33-2.33a.98.98 0 0 0-1.41 0l-3.08 3.08a1 1 0 0 0 0 1.41L5.7 13.06l-.41.4a2.65 2.65 0 0 0 0 3.74l1.51 1.51a2.63 2.63 0 0 0 3.74 0l.4-.4l2.33 2.33a1 1 0 0 0 1.41 0l3.08-3.09a1 1 0 0 0 0-1.41l-2.32-2.32l1.45-1.46a2 2 0 0 0 .245.01m-13.07-2.34l3.09-3.09l2.32 2.33L6.4 12.35Zm12.99 6.82l-3.08 3.08l-2.33-2.33l3.08-3.08Zm-5.23-8.51a5.48 5.48 0 0 0 3.84 3.83l-5.84 5.84a1.64 1.64 0 0 1-2.32 0l-1.52-1.52a1.64 1.64 0 0 1 0-2.32Zm2.12 1.71a4.417 4.417 0 0 1-.3-5.96l3.13 3.13l3.14 3.14l.02.03a4.5 4.5 0 0 1-5.99-.34" />
    </svg>
  );
}

export function AlienSaucer(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24">
      <path fill="none" stroke="currentColor" strokeWidth="0.8" d="M2 13c0 2 10 2 10 2s10 0 10-2M3.5 11c1 1.5 8.5 2 8.5 2s7.5-.5 8.5-2" />
      <path fill="none" stroke="currentColor" strokeWidth="1" d="M12 4c-5 0-9 2.5-9 6h18c0-3.5-4-6-9-6z" />
      <circle cx="12" cy="7" r="2" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
      <path fill="none" stroke="currentColor" strokeWidth="0.8" d="M8 17l1 3M12 18l0 4M16 17l-1 3" />
    </svg>
  );
}

export function AlienScout(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
      <path fill="none" stroke="currentColor" strokeWidth="0.8" d="M12 2l4 6-4 2-4-2zM4 12l4 4-2 6 6-4 6 4-2-6 4-4z" />
      <path fill="none" stroke="currentColor" strokeWidth="0.5" d="M8 8l2 6M16 8l-2 6" opacity="0.4" />
      <circle cx="12" cy="14" r="2.5" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <path fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" d="M10 4h4" />
    </svg>
  );
}

export function Spaceship(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a6.02 6.02 0 0 0-5.923 4.9c-.086.466-.13.699.032 1.005c.161.307.39.409.847.613c1.38.614 3.134.982 5.044.982s3.665-.368 5.044-.982c.457-.204.686-.306.847-.613c.162-.306.118-.54.032-1.005A6.02 6.02 0 0 0 12 3" />
        <path d="M17 5.5c2.989.788 5 2.26 5 3.945C22 11.961 17.523 14 12 14S2 11.96 2 9.445C2 7.76 4.011 6.288 7 5.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v3m5-4l1 4M7 17l-1 4" />
      </g>
    </svg>
  );
}

// --- UNIFIED EXPORT ARRAY ---
// This allows you to map over them in your parallax component
export const SPACE_OBJECTS = [
  SatelliteOutline,
  Satellite1,
  AlienSaucer,
  AlienScout,
  Spaceship,
  HumanShuttle,
];
