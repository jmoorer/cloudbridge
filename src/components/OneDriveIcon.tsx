export function OneDriveIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5 6.5C13.46 4.38 11.31 3 9 3a7 7 0 0 0-7 7c0 .34.03.68.07 1.01A5.5 5.5 0 0 0 5.5 22h13a4.5 4.5 0 0 0 .87-8.91A6.003 6.003 0 0 0 14.5 6.5z"
        fill="#0078D4"
      />
      <path
        d="M19.37 13.09A4.5 4.5 0 0 1 19.5 22h-14A5.5 5.5 0 0 1 2.07 11.01 6.979 6.979 0 0 1 9 3c2.31 0 4.46 1.38 5.5 3.5a6.003 6.003 0 0 1 4.87 6.59z"
        fill="#1490DF"
        opacity="0.6"
      />
    </svg>
  );
}
