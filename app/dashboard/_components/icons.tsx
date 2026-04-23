import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export const Icons = {
  impact: (p: IconProps) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M2 13L6 8L9 11L14 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="14" cy="4" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  overview: (p: IconProps) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
      <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  adoption: (p: IconProps) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
      <rect x="2" y="2" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.3" />
      <rect x="10" y="2" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.3" opacity="0.6" />
      <rect x="2" y="10" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.3" opacity="0.6" />
      <rect x="10" y="10" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  protocol: (p: IconProps) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M3 8H13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="3" cy="8" r="2" fill="currentColor" />
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="13" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  report: (p: IconProps) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M3 2H10L13 5V14H3V2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M10 2V5H13" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M5 9H11M5 11H11M5 7H8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  learn: (p: IconProps) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M2 5L8 2L14 5L8 8L2 5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M4 7V10C4 10 5.5 11.5 8 11.5C10.5 11.5 12 10 12 10V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  library: (p: IconProps) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
      <rect x="2" y="3" width="3" height="10" rx="0.5" stroke="currentColor" strokeWidth="1.3" />
      <rect x="6.5" y="3" width="3" height="10" rx="0.5" stroke="currentColor" strokeWidth="1.3" />
      <rect x="11" y="4" width="3" height="9" rx="0.5" stroke="currentColor" strokeWidth="1.3" transform="rotate(-8 12.5 8.5)" />
    </svg>
  ),
  team: (p: IconProps) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
      <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="11.5" cy="7" r="1.8" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 13C2 11 4 10 6 10C8 10 10 11 10 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M10.5 12.5C10.5 11 12 10.5 11.5 10.5C13 10.5 14 11.5 14 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  caret: (p: IconProps) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...p}>
      <path d="M4 3L8 6L4 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  caretDown: (p: IconProps) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...p}>
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  check: (p: IconProps) => (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" {...p}>
      <path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  close: (p: IconProps) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  search: (p: IconProps) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 9L12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  bell: (p: IconProps) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M7 2C5 2 3.5 3.5 3.5 5.5V8L2.5 10H11.5L10.5 8V5.5C10.5 3.5 9 2 7 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M5.5 10.5C5.5 11.5 6.2 12 7 12C7.8 12 8.5 11.5 8.5 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  download: (p: IconProps) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M7 2V10M7 10L4 7M7 10L10 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 11.5V12H11.5V11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  share: (p: IconProps) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <circle cx="3.5" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="10.5" cy="3.5" r="1.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="10.5" cy="10.5" r="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5 6.3L9 4.2M5 7.7L9 9.8" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  settings: (p: IconProps) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7 1V3M7 11V13M1 7H3M11 7H13M2.75 2.75L4.25 4.25M9.75 9.75L11.25 11.25M2.75 11.25L4.25 9.75M9.75 4.25L11.25 2.75" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  info: (p: IconProps) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...p}>
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 5.5V8.5M6 3.8V4.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  logout: (p: IconProps) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M7 2H3V12H7" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M6.5 7H12M12 7L10 5M12 7L10 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  plus: (p: IconProps) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...p}>
      <path d="M6 2V10M2 6H10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  article: (p: IconProps) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
      <rect x="2.5" y="2" width="11" height="12" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5 5H11M5 8H11M5 11H9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  community: (p: IconProps) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M2.5 4.5C2.5 3.67 3.17 3 4 3H12C12.83 3 13.5 3.67 13.5 4.5V9.5C13.5 10.33 12.83 11 12 11H7L4 13.5V11C3.17 11 2.5 10.33 2.5 9.5V4.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  ),
  agent: (p: IconProps) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <rect x="3" y="4" width="8" height="7" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="5.5" cy="7" r="0.8" fill="currentColor" />
      <circle cx="8.5" cy="7" r="0.8" fill="currentColor" />
      <path d="M7 2V4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M1 7H3M11 7H13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
};
