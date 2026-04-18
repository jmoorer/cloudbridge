import type { SVGProps } from "react";

interface LogoIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  variant?: "two-tone" | "mono-primary" | "mono-dark" | "reversed";
}

/**
 * CloudBridge icon mark — bracket + two files.
 * Uses CSS custom properties from the AstroVista theme so it
 * automatically adapts to light / dark mode.
 *
 * Usage:
 *   <LogoIcon size={32} />
 *   <LogoIcon size={16} variant="mono-primary" />
 */
export function LogoIcon({
  size = 32,
  variant = "two-tone",
  ...props
}: LogoIconProps) {
  const showDetail = size >= 28;

  const colors = {
    "two-tone": {
      bracket: "var(--primary)",
      fileA: "var(--primary)",
      fileB: "var(--secondary)",
      fileBOpacity: 1,
    },
    "mono-primary": {
      bracket: "var(--primary)",
      fileA: "var(--primary)",
      fileB: "var(--primary)",
      fileBOpacity: 0.5,
    },
    "mono-dark": {
      bracket: "var(--foreground)",
      fileA: "var(--foreground)",
      fileB: "var(--foreground)",
      fileBOpacity: 0.5,
    },
    reversed: {
      bracket: "#ffffff",
      fileA: "#ffffff",
      fileB: "#ffffff",
      fileBOpacity: 0.5,
    },
  }[variant];

  const strokeWidth = size <= 20 ? 4.5 : 2.8;

  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      {/* Top bracket */}
      <path
        d="M8,12 L8,7 Q8,4 11,4 L37,4 Q40,4 40,7 L40,12"
        stroke={colors.bracket}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Left file */}
      <rect x="11" y="16" width="11" height="15" rx="3" fill={colors.fileA} />
      {showDetail && (
        <>
          <path
            d="M14,22 L19,22"
            stroke="#fff"
            strokeWidth={1.8}
            strokeLinecap="round"
          />
          <path
            d="M14,26 L17.5,26"
            stroke="#fff"
            strokeWidth={1.4}
            strokeLinecap="round"
            opacity={0.7}
          />
        </>
      )}

      {/* Right file */}
      <rect
        x="26"
        y="16"
        width="11"
        height="15"
        rx="3"
        fill={colors.fileB}
        opacity={colors.fileBOpacity}
      />
      {showDetail && (
        <>
          <path
            d="M29,22 L34,22"
            stroke="#fff"
            strokeWidth={1.8}
            strokeLinecap="round"
          />
          <path
            d="M29,26 L32.5,26"
            stroke="#fff"
            strokeWidth={1.4}
            strokeLinecap="round"
            opacity={0.7}
          />
        </>
      )}

      {/* Bottom bracket */}
      <path
        d="M8,36 L8,41 Q8,44 11,44 L37,44 Q40,44 40,41 L40,36"
        stroke={colors.bracket}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface LogoProps extends SVGProps<SVGSVGElement> {
  height?: number;
}

/**
 * CloudBridge full wordmark — icon + "CloudBridge" text.
 * Reads --primary and --foreground from your AstroVista theme.
 *
 * Usage:
 *   <Logo />
 *   <Logo height={28} />
 */
export function Logo({ height = 36, ...props }: LogoProps) {
  const aspect = 300 / 52;
  const width = height * aspect;

  return (
    <svg
      viewBox="0 0 300 52"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="CloudBridge"
      {...props}
    >
      <g transform="translate(0, 2)">
        {/* Top bracket */}
        <path
          d="M5,10 L5,5 Q5,2 8,2 L40,2 Q43,2 43,5 L43,10"
          stroke="var(--primary)"
          strokeWidth={2.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Left file */}
        <rect
          x="9"
          y="14"
          width="12"
          height="16"
          rx="2.5"
          fill="var(--primary)"
        />
        <path
          d="M12.5,20 L17.5,20"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <path
          d="M12.5,24 L16,24"
          stroke="#fff"
          strokeWidth={1.2}
          strokeLinecap="round"
          opacity={0.7}
        />

        {/* Right file */}
        <rect
          x="25"
          y="14"
          width="12"
          height="16"
          rx="2.5"
          fill="var(--secondary)"
        />
        <path
          d="M28.5,20 L33.5,20"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <path
          d="M28.5,24 L32,24"
          stroke="#fff"
          strokeWidth={1.2}
          strokeLinecap="round"
          opacity={0.7}
        />

        {/* Bottom bracket */}
        <path
          d="M5,36 L5,41 Q5,44 8,44 L40,44 Q43,44 43,41 L43,36"
          stroke="var(--primary)"
          strokeWidth={2.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Wordmark */}
      <text
        x="56"
        y="34"
        fontFamily="Outfit, sans-serif"
        fontSize={24}
        fontWeight={500}
        fill="var(--foreground)"
      >
        Cloud
      </text>
      <text
        x="126"
        y="34"
        fontFamily="Outfit, sans-serif"
        fontSize={24}
        fontWeight={500}
        fill="var(--primary)"
      >
        Bridge
      </text>
    </svg>
  );
}

export default Logo;
