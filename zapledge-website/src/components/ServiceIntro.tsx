"use client";

import React from 'react';
import './ServiceIntro.css';

export type ServiceIntroProps = {
  eyebrow: string;
  /** Rendered as the section's <h2>. */
  statement: string;
  /** Exact substring of `statement`, shown in blue. */
  statementEmphasis?: string;
  /** Rendered as a <p>. */
  body?: string;
  /** Exact substrings of `body`, in reading order, 2–4 items. */
  highlights?: readonly string[];
  /** Closing line, optional. */
  note?: string;
  sectionId?: string;
};

const HIGHLIGHT_ACCENTS = [
  { underline: '#0B3BFF', number: '#0B3BFF' },
  { underline: '#7C5CFF', number: '#6A4BEA' },
  { underline: '#22C3EE', number: '#0E7FA0' },
  { underline: '#EC4899', number: '#C0266F' },
];

/**
 * Splits `fullText` around each exact-substring `mark`, in order, calling
 * `renderMark` for matches and leaving everything else as plain text. A mark
 * that can't be found is left in the plain flow (never dropped) and logs a
 * dev-only warning so a copy/prop mismatch is easy to spot.
 */
function renderWithMarks(
  fullText: string,
  marks: (string | undefined)[],
  renderMark: (mark: string, index: number) => React.ReactNode,
  devLabel: string
): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let cursor = 0;

  marks.forEach((mark, i) => {
    if (!mark) return;
    const idx = fullText.indexOf(mark, cursor);
    if (idx === -1) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn(`[ServiceIntro] "${mark}" was not found in the ${devLabel} text — rendering it plainly.`);
      }
      return;
    }
    if (idx > cursor) nodes.push(fullText.slice(cursor, idx));
    nodes.push(renderMark(mark, i));
    cursor = idx + mark.length;
  });

  if (cursor < fullText.length) nodes.push(fullText.slice(cursor));
  return nodes;
}

const renderHighlight = (text: string, index: number) => {
  const accent = HIGHLIGHT_ACCENTS[index % HIGHLIGHT_ACCENTS.length];
  const words = text.split(' ');
  const lastWord = words.pop() ?? '';
  const rest = words.join(' ');

  return (
    <span
      key={`${index}-${text}`}
      className="si-highlight"
      style={{ '--si-underline': accent.underline } as React.CSSProperties}
    >
      {rest ? `${rest} ` : ''}
      <span className="si-nowrap">
        {lastWord}
        <sup aria-hidden="true" className="si-highlight-num" style={{ color: accent.number }}>
          {String(index + 1).padStart(2, '0')}
        </sup>
      </span>
    </span>
  );
};

const RouteIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="5" cy="6" r="2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="19" cy="18" r="2" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M6.6 7.6C9 10 8 13.2 12 13.6C16 14 15 16.2 17.3 16.9"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const statementLengthTier = (len: number): 'normal' | 'long' | 'xlong' => {
  if (len > 230) return 'xlong';
  if (len > 170) return 'long';
  return 'normal';
};

export const ServiceIntro: React.FC<ServiceIntroProps> = ({
  eyebrow,
  statement,
  statementEmphasis,
  body,
  highlights = [],
  note,
  sectionId = 'overview',
}) => {
  const hasBody = Boolean(body && body.trim().length > 0);
  const lengthTier = statementLengthTier(statement.length);

  const statementNodes = renderWithMarks(
    statement,
    [statementEmphasis],
    (mark) => (
      <span key="emphasis" className="si-emphasis">
        {mark}
      </span>
    ),
    'statement'
  );

  const bodyNodes = hasBody
    ? renderWithMarks(body as string, highlights.slice(0, 4), renderHighlight, 'body')
    : null;

  return (
    <section id={sectionId} aria-labelledby={`${sectionId}-heading`} className="si-section">
      <div className="si-container">
        <p className="si-pill">
          <span className="si-pill-dot" aria-hidden="true" />
          {eyebrow}
        </p>

        <div className="si-row" data-has-body={hasBody}>
          <h2 id={`${sectionId}-heading`} className="si-statement" data-length={lengthTier}>
            {statementNodes}
          </h2>

          <span className="si-divider" aria-hidden="true" />

          {hasBody && <p className="si-body">{bodyNodes}</p>}
        </div>

        {note && (
          <div className="si-note">
            <span className="si-note-icon" aria-hidden="true">
              <RouteIcon />
            </span>
            <p className="si-note-text">{note}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceIntro;
