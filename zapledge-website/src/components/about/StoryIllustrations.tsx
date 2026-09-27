import { Fragment } from 'react';

const LENS_ROWS = [80, 160, 240, 320];
const LENS_COLS = [120, 220, 320, 420, 520];
// (row,col) blocks drawn as "manual" dashed outlines, and connectors after (row,col) that are dashed
const MANUAL_BLOCKS = new Set(['0,0', '0,3', '1,1', '1,4', '2,4', '3,2']);
const MANUAL_LINKS = new Set(['0,1', '0,3', '1,2', '2,0', '2,3', '3,1']);

type Palette = { fill: string; stroke: string; bar: string; link: string };
const MUTED: Palette = { fill: '#F4F5FA', stroke: 'rgba(0,0,60,0.14)', bar: 'rgba(0,0,60,0.12)', link: 'rgba(0,0,60,0.18)' };
const REVEALED: Palette = { fill: '#FFFFFF', stroke: 'rgba(0,51,255,0.55)', bar: 'rgba(0,51,255,0.3)', link: 'rgba(0,51,255,0.45)' };

function Block({ x, cy, fill, stroke, bar, dashed }: { x: number; cy: number; dashed?: boolean } & Omit<Palette, 'link'>) {
  return (
    <>
      <rect x={x} y={cy - 26} width={76} height={52} rx={12} fill={fill} stroke={stroke} strokeWidth={1.5} strokeDasharray={dashed ? '4 4' : undefined} />
      <rect x={x + 12} y={cy - 10} width={40} height={6} rx={3} fill={bar} />
      <rect x={x + 12} y={cy + 2} width={26} height={6} rx={3} fill={bar} />
    </>
  );
}

function OperationsGrid({ palette, labels }: { palette: Palette; labels?: boolean }) {
  return (
    <>
      {LENS_ROWS.map((cy, r) => (
        <Fragment key={cy}>
          {labels && <rect x={30} y={cy - 4} width={58} height={8} rx={4} fill="rgba(0,0,60,0.12)" />}
          {LENS_COLS.slice(0, -1).map((x, c) => (
            <path
              key={x}
              d={`M${x + 76} ${cy} H${LENS_COLS[c + 1]}`}
              stroke={palette.link}
              strokeWidth={1.5}
              strokeDasharray={MANUAL_LINKS.has(`${r},${c}`) ? '4 4' : undefined}
            />
          ))}
          {LENS_COLS.map((x, c) => (
            <Block key={x} x={x} cy={cy} {...palette} dashed={MANUAL_BLOCKS.has(`${r},${c}`)} />
          ))}
        </Fragment>
      ))}
    </>
  );
}

/** A magnifier over department workflows, revealing hidden inefficiencies. */
export function ResearchLens() {
  return (
    <svg aria-hidden="true" viewBox="0 0 640 400" className="block h-auto w-full">
      <defs>
        <pattern id="lens-dots" width={20} height={20} patternUnits="userSpaceOnUse">
          <circle cx={10} cy={10} r={1.2} fill="rgba(0,0,60,0.07)" />
        </pattern>
        <clipPath id="lens-clip">
          <circle cx={378} cy={200} r={108} />
        </clipPath>
      </defs>
      <rect width={640} height={400} fill="url(#lens-dots)" />
      <OperationsGrid palette={MUTED} labels />

      <g clipPath="url(#lens-clip)">
        <rect x={260} y={80} width={240} height={240} fill="#FFFFFF" />
        <OperationsGrid palette={REVEALED} />
        <path d="M416 150 C 450 110, 520 150, 486 214" fill="none" stroke="#0033FF" strokeWidth={2} strokeDasharray="5 5" />
        <path d="M340 186 C 318 200, 318 202, 340 214" fill="none" stroke="#0033FF" strokeWidth={2} strokeDasharray="5 5" />
        {[[378, 160], [478, 240], [378, 240]].map(([cx, cy]) => (
          <Fragment key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r={13} fill="rgba(0,51,255,0.14)" />
            <circle cx={cx} cy={cy} r={5} fill="#0033FF" />
          </Fragment>
        ))}
      </g>

      <circle cx={378} cy={200} r={114} fill="none" stroke="rgba(0,51,255,0.14)" strokeWidth={8} />
      <circle cx={378} cy={200} r={108} fill="none" stroke="#0033FF" strokeWidth={2.5} />
      <path d="M458 280 L518 340" stroke="#00003C" strokeWidth={12} strokeLinecap="round" />
    </svg>
  );
}

const OPS_ROWS = [80, 160, 240, 320];
const OPS_COLS = [40, 140, 240, 340];
const OPS_LINKS = [[0, 1], [1, 2], [2, 0], [2, 3], [1, 0], [0, 3]];
const opsRowPath = (y: number) => `M116 ${y} H416 C 460 ${y}, 446 200, 472 200`;

/** Department rows flowing into one connected hub, with data pulses along each row. */
export function ConnectedOps() {
  return (
    <svg aria-hidden="true" viewBox="0 0 640 400" className="block h-auto w-full">
      {OPS_ROWS.map((y) => (
        <path key={y} d={opsRowPath(y)} fill="none" stroke="rgba(0,51,255,0.3)" strokeWidth={1.5} />
      ))}
      {/* Pulses sit under the blocks; hidden entirely for reduced motion */}
      {OPS_ROWS.map((y) => (
        <path
          key={y}
          d={opsRowPath(y)}
          fill="none"
          stroke="#0033FF"
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeDasharray="0.5 24"
          className="animate-data-pulse motion-reduce:hidden"
        />
      ))}
      {OPS_LINKS.map(([r, c]) => (
        <path
          key={`${r}-${c}`}
          d={`M${OPS_COLS[c] + 38} ${OPS_ROWS[r] + 26} V${OPS_ROWS[r + 1] - 26}`}
          stroke="rgba(0,51,255,0.28)"
          strokeWidth={1.5}
        />
      ))}
      {OPS_ROWS.map((cy) =>
        OPS_COLS.map((x) => (
          <Block key={`${x}-${cy}`} x={x} cy={cy} fill="#EEF1FF" stroke="rgba(0,51,255,0.4)" bar="rgba(0,51,255,0.3)" />
        )),
      )}

      <circle cx={516} cy={200} r={78} fill="none" stroke="rgba(0,51,255,0.1)" strokeWidth={1.5} />
      <circle cx={516} cy={200} r={60} fill="none" stroke="rgba(0,51,255,0.16)" strokeWidth={1.5} />
      <circle cx={516} cy={200} r={44} fill="#00003C" />
      <path d="M516 186 L502 210 M516 186 L530 210 M502 210 H530" fill="none" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" />
      {[[516, 186], [502, 210], [530, 210]].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={5} fill="#FFFFFF" />
      ))}
      <path d="M560 200 H616" stroke="#00003C" strokeWidth={2} />
      <path d="M608 193 L620 200 L608 207 Z" fill="#00003C" />
    </svg>
  );
}
