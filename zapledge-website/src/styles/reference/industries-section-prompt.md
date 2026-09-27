<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Industries section (list + animated scenes)</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..700&family=Figtree:wght@400..600&display=swap" rel="stylesheet">
<style>
  body { margin: 0; }

  /* ================= Industries section ================= */
  .industries {
    /* Swap these to match your brand */
    --paper: #EEF1F2;
    --ink: #10202B;
    --slate: #5A6A75;
    --faint: #7A8791;
    --hair: #C9D3D8;
    --gold: #F0B429;
    --on-ink-soft: rgba(238, 241, 242, .78);

    --display: 'Bricolage Grotesque', 'Figtree', system-ui, -apple-system, 'Segoe UI', sans-serif;
    --body: 'Figtree', system-ui, -apple-system, 'Segoe UI', sans-serif;

    font-family: var(--body);
    color: var(--ink);
    background: var(--paper);
    padding: clamp(64px, 9vw, 120px) clamp(20px, 5vw, 48px);
    box-sizing: border-box;
  }
  .industries *, .industries *::before, .industries *::after { box-sizing: border-box; }
  .ind-wrap { max-width: 1180px; margin: 0 auto; }

  .ind-label { margin: 0 0 14px; font-size: 1rem; font-weight: 600; color: var(--slate); }
  .ind-title {
    margin: 0; max-width: 18ch;
    font-family: var(--display); font-weight: 600;
    font-size: clamp(2.2rem, 5.2vw, 4rem); line-height: 1.05; letter-spacing: -.02em;
    text-wrap: balance;
  }

  /* ---------- Layout: list on the left, scene on the right ---------- */
  .ind-layout {
    display: grid; align-items: center;
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    gap: clamp(32px, 6vw, 80px);
    margin-top: 56px;
  }

  /* Industry list */
  .ind-list { border-left: 2px solid var(--hair); }
  .ind-item { position: relative; padding: 18px 0 18px 28px; }
  .ind-item::before {
    content: ""; position: absolute; left: -2px; top: 0; bottom: 0; width: 2px;
    background: var(--ink); transform: scaleY(0); transform-origin: top;
    transition: transform .45s cubic-bezier(.3, .7, .2, 1);
  }
  .ind-item.is-active::before { transform: scaleY(1); }

  .ind-name { margin: 0; font-family: var(--display); font-weight: 600; letter-spacing: -.015em; line-height: 1.1; font-size: clamp(1.7rem, 3.2vw, 2.6rem); }
  .ind-btn { all: unset; cursor: pointer; color: var(--faint); transition: color .3s; }
  .ind-btn:hover, .ind-item.is-active .ind-btn { color: var(--ink); }
  .ind-btn:focus-visible { outline: 3px solid var(--ink); outline-offset: 6px; border-radius: 4px; }

  .ind-desc { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .45s cubic-bezier(.3, .7, .2, 1); }
  .ind-item.is-active .ind-desc { grid-template-rows: 1fr; }
  .ind-desc-inner { min-height: 0; overflow: hidden; visibility: hidden; opacity: 0; transition: opacity .25s, visibility 0s .45s; }
  .ind-item.is-active .ind-desc-inner { visibility: visible; opacity: 1; transition: opacity .35s .15s, visibility 0s; }
  .ind-desc-inner p { margin: 12px 0 0; max-width: 38ch; font-size: 1.05rem; line-height: 1.55; color: var(--slate); }
  .ind-uses { list-style: none; margin: 14px 0 0; padding: 0; display: grid; gap: 6px; font-size: .95rem; color: var(--ink); }
  .ind-uses li { position: relative; padding-left: 20px; }
  .ind-uses li::before { content: ""; position: absolute; left: 0; top: .72em; width: 9px; height: 2px; background: var(--ink); }

  /* Stage */
  .ind-stage {
    position: relative; aspect-ratio: 8 / 5; overflow: hidden; border-radius: 20px;
    background-color: var(--ink);
    background-image: radial-gradient(rgba(238, 241, 242, .08) 1px, transparent 1px);
    background-size: 24px 24px;
  }
  .ind-scene {
    position: absolute; inset: 0; width: 100%; height: 100%;
    opacity: 0; pointer-events: none; transition: opacity .45s;
    fill: none; stroke: var(--on-ink-soft); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round;
  }
  .ind-scene.is-active { opacity: 1; }
  .ind-scene .gold { stroke: var(--gold); }
  .ind-scene .gold-fill { fill: var(--gold); stroke: none; }
  .ind-scene .faint { stroke: rgba(238, 241, 242, .16); stroke-width: 1.5; }
  .ind-scene .dashed { stroke-dasharray: 4 7; stroke-width: 2; }
  .ind-scene text { font-family: var(--display); font-size: 20px; font-weight: 600; fill: var(--ink); stroke: none; }

  @keyframes ind-pulse { 0%, 100% { opacity: .3; } 50% { opacity: 1; } }
  @keyframes ind-ping  { from { transform: scale(1); opacity: .9; } to { transform: scale(2.2); opacity: 0; } }

  /* ---- Scene 1: Manufacturing Tech (defect flagged on a conveyor) ---- */
  .s1 .belt-dash { stroke-dasharray: 14 14; }
  .s1.is-active .run { animation: s1-run 8s linear infinite; }
  .s1.is-active .belt-dash { animation: s1-belt .4667s linear infinite; }
  .s1.is-active .beam { animation: ind-pulse 1s ease-in-out infinite; }
  .s1.is-active .flag { animation: s1-flag 8s linear infinite; }
  @keyframes s1-run  { from { transform: translateX(0); } to { transform: translateX(480px); } }
  @keyframes s1-belt { to { stroke-dashoffset: -28; } }
  @keyframes s1-flag { 0%, 31% { opacity: 0; } 35%, 45% { opacity: 1; } 50%, 100% { opacity: 0; } }

  /* ---- Scene 2: FinTech (one unusual transaction in a stream) ---- */
  .s2 .chart { stroke-dasharray: 1; stroke-dashoffset: 0; }
  .s2 .stream { stroke: rgba(238, 241, 242, .5); stroke-width: 7; stroke-dasharray: .1 25.9; }
  .s2 .ping { transform-box: fill-box; transform-origin: center; }
  .s2.is-active .chart  { animation: s2-draw 8s linear infinite; }
  .s2.is-active .mark   { animation: s2-mark 8s linear infinite; }
  .s2.is-active .stream { animation: s2-stream .9s linear infinite; }
  .s2.is-active .ping   { animation: ind-ping 1.6s ease-out infinite; }
  @keyframes s2-draw {
    0% { stroke-dashoffset: 1; opacity: 1; }
    70% { stroke-dashoffset: 0; opacity: 1; }
    92% { stroke-dashoffset: 0; opacity: 1; }
    98% { stroke-dashoffset: 0; opacity: 0; }
    100% { stroke-dashoffset: 1; opacity: 0; }
  }
  @keyframes s2-mark { 0%, 50% { opacity: 0; } 54%, 92% { opacity: 1; } 98%, 100% { opacity: 0; } }
  @keyframes s2-stream { to { stroke-dashoffset: -26; } }

  /* ---- Scene 3: WealthTech (allocation rebalancing) ---- */
  .s3 .seg { stroke-width: 26; stroke-linecap: butt; }
  .s3 .a { stroke-dasharray: 42 58; stroke-dashoffset: 0; }
  .s3 .b { stroke-dasharray: 28 72; stroke-dashoffset: -44; }
  .s3 .c { stroke-dasharray: 24 76; stroke-dashoffset: -74; stroke: rgba(238, 241, 242, .4); }
  .s3 .bar { transform-box: fill-box; transform-origin: left center; }
  .s3 .bar-a { transform: scaleX(.84); }
  .s3 .bar-b { transform: scaleX(.56); }
  .s3 .bar-c { transform: scaleX(.48); }
  .s3.is-active .a { animation: s3-a 8s ease-in-out infinite; }
  .s3.is-active .b { animation: s3-b 8s ease-in-out infinite; }
  .s3.is-active .c { animation: s3-c 8s ease-in-out infinite; }
  .s3.is-active .bar-a { animation: s3-bar-a 8s ease-in-out infinite; }
  .s3.is-active .bar-b { animation: s3-bar-b 8s ease-in-out infinite; }
  .s3.is-active .bar-c { animation: s3-bar-c 8s ease-in-out infinite; }
  @keyframes s3-a { 0%, 35% { stroke-dasharray: 42 58; } 50%, 85% { stroke-dasharray: 30 70; } 100% { stroke-dasharray: 42 58; } }
  @keyframes s3-b {
    0%, 35% { stroke-dasharray: 28 72; stroke-dashoffset: -44; }
    50%, 85% { stroke-dasharray: 44 56; stroke-dashoffset: -32; }
    100% { stroke-dasharray: 28 72; stroke-dashoffset: -44; }
  }
  @keyframes s3-c {
    0%, 35% { stroke-dasharray: 24 76; stroke-dashoffset: -74; }
    50%, 85% { stroke-dasharray: 20 80; stroke-dashoffset: -78; }
    100% { stroke-dasharray: 24 76; stroke-dashoffset: -74; }
  }
  @keyframes s3-bar-a { 0%, 35% { transform: scaleX(.84); } 50%, 85% { transform: scaleX(.6); } 100% { transform: scaleX(.84); } }
  @keyframes s3-bar-b { 0%, 35% { transform: scaleX(.56); } 50%, 85% { transform: scaleX(.88); } 100% { transform: scaleX(.56); } }
  @keyframes s3-bar-c { 0%, 35% { transform: scaleX(.48); } 50%, 85% { transform: scaleX(.4); } 100% { transform: scaleX(.48); } }

  /* ---- Scene 4: HealthTech (pulse becomes an organized record) ---- */
  .s4 .ecg { stroke-dasharray: 1; stroke-dashoffset: 0; }
  .s4 .row { transform-box: fill-box; transform-origin: left center; }
  .s4.is-active .ecg  { animation: s4-ecg 8s linear infinite; }
  .s4.is-active .link { animation: s4-link 8s linear infinite; }
  .s4.is-active .row  { animation: s4-row 8s cubic-bezier(.3, .7, .2, 1) infinite; }
  .s4.is-active .row:nth-of-type(3) { animation-delay: .2s; }
  .s4.is-active .row:nth-of-type(4) { animation-delay: .4s; }
  .s4.is-active .row:nth-of-type(5) { animation-delay: .6s; }
  .s4.is-active .row:nth-of-type(6) { animation-delay: .8s; }
  .s4.is-active .done { animation: s4-done 8s linear infinite; }
  @keyframes s4-ecg {
    0% { stroke-dashoffset: 1; opacity: 1; }
    38% { stroke-dashoffset: 0; opacity: 1; }
    92% { stroke-dashoffset: 0; opacity: 1; }
    98% { stroke-dashoffset: 0; opacity: 0; }
    100% { stroke-dashoffset: 1; opacity: 0; }
  }
  @keyframes s4-link { 0%, 36% { opacity: 0; } 42%, 92% { opacity: 1; } 98%, 100% { opacity: 0; } }
  @keyframes s4-row  { 0%, 40% { transform: scaleX(0); } 52%, 90% { transform: scaleX(1); } 97%, 100% { transform: scaleX(0); } }
  @keyframes s4-done { 0%, 72% { opacity: 0; } 78%, 92% { opacity: 1; } 98%, 100% { opacity: 0; } }

  /* ---------- Secondary industries ---------- */
  .ind-more {
    list-style: none; margin: 40px 0 0; padding: 0;
    display: flex; flex-wrap: wrap; gap: 6px 28px;
    font-family: var(--display); font-weight: 500; font-size: 1.05rem; color: var(--slate);
  }
  .ind-note { margin: 12px 0 0; max-width: 56ch; font-size: .9rem; line-height: 1.5; color: var(--slate); }

  /* ---------- Tablet and phone ---------- */
  @media (max-width: 899px) {
    .ind-layout { grid-template-columns: 1fr; gap: 28px; margin-top: 40px; }
    .ind-stage { order: -1; border-radius: 16px; }
    .ind-item { padding-block: 14px; }
    .ind-name { font-size: 1.6rem; }
  }

  @media (prefers-reduced-motion: reduce) {
    .industries *, .industries *::before, .industries *::after { animation: none !important; transition: none !important; }
    .s1 .flag { opacity: 0; }
  }
</style>
</head>
<body>

<section class="industries" aria-labelledby="ind-heading">
  <div class="ind-wrap">
    <p class="ind-label">Industries</p>
    <h2 class="ind-title" id="ind-heading">AI Solutions Across Industries</h2>

    <div class="ind-layout">

      <!-- Left: industries -->
      <div class="ind-list" id="ind-list">

        <div class="ind-item is-active">
          <h3 class="ind-name"><button class="ind-btn" type="button" aria-expanded="true" aria-controls="ind-d0">Manufacturing Tech</button></h3>
          <div class="ind-desc" id="ind-d0" role="region" aria-label="Manufacturing Tech details">
            <div class="ind-desc-inner">
              <!-- Placeholder copy: replace with your own -->
              <p>Spot defects early, predict equipment failures, and keep production lines moving.</p>
              <ul class="ind-uses">
                <li>Visual quality inspection</li>
                <li>Predictive maintenance</li>
                <li>Demand and inventory forecasting</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="ind-item">
          <h3 class="ind-name"><button class="ind-btn" type="button" aria-expanded="false" aria-controls="ind-d1">FinTech</button></h3>
          <div class="ind-desc" id="ind-d1" role="region" aria-label="FinTech details">
            <div class="ind-desc-inner">
              <p>Speed up decisions and catch problems across payments, lending, and risk.</p>
              <ul class="ind-uses">
                <li>Fraud and anomaly detection</li>
                <li>Automated document review</li>
                <li>Credit risk analysis</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="ind-item">
          <h3 class="ind-name"><button class="ind-btn" type="button" aria-expanded="false" aria-controls="ind-d2">WealthTech</button></h3>
          <div class="ind-desc" id="ind-d2" role="region" aria-label="WealthTech details">
            <div class="ind-desc-inner">
              <p>Give advisors and investors clearer, more personal insight from their data.</p>
              <ul class="ind-uses">
                <li>Portfolio insights and reporting</li>
                <li>Client conversation summaries</li>
                <li>Personalized recommendations</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="ind-item">
          <h3 class="ind-name"><button class="ind-btn" type="button" aria-expanded="false" aria-controls="ind-d3">HealthTech</button></h3>
          <div class="ind-desc" id="ind-d3" role="region" aria-label="HealthTech details">
            <div class="ind-desc-inner">
              <p>Cut administrative work and make clinical and patient data easier to use.</p>
              <ul class="ind-uses">
                <li>Clinical note summarization</li>
                <li>Patient triage support</li>
                <li>Scheduling and intake automation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: animated scenes (decorative) -->
      <div class="ind-stage" aria-hidden="true">

        <!-- 1. Manufacturing: defect flagged on a conveyor -->
        <svg class="ind-scene s1 is-active" viewBox="0 0 640 400" focusable="false">
          <line class="faint" x1="0" y1="304" x2="640" y2="304"/>
          <line class="belt-dash faint" x1="0" y1="326" x2="640" y2="326" style="stroke-width:3"/>
          <g class="run">
            <rect x="-480" y="240" width="64" height="64" rx="6"/>
            <rect class="gold" x="-360" y="240" width="64" height="64" rx="6"/><path class="gold" d="M-342 258 L-314 286 M-314 258 L-342 286"/>
            <rect x="-240" y="240" width="64" height="64" rx="6"/>
            <rect x="-120" y="240" width="64" height="64" rx="6"/>
            <rect x="0"    y="240" width="64" height="64" rx="6"/>
            <rect class="gold" x="120" y="240" width="64" height="64" rx="6"/><path class="gold" d="M138 258 L166 286 M166 258 L138 286"/>
            <rect x="240" y="240" width="64" height="64" rx="6"/>
            <rect x="360" y="240" width="64" height="64" rx="6"/>
            <rect x="480" y="240" width="64" height="64" rx="6"/>
            <rect class="gold" x="600" y="240" width="64" height="64" rx="6"/><path class="gold" d="M618 258 L646 286 M646 258 L618 286"/>
          </g>
          <path d="M262 304 V150 H378 V304"/>
          <rect x="298" y="124" width="44" height="26" rx="5"/>
          <line class="beam gold dashed" x1="320" y1="150" x2="320" y2="232"/>
          <g class="flag">
            <path class="gold" d="M278 252 V228 H302 M338 228 H362 V252 M362 288 V312 H338 M302 312 H278 V288"/>
            <line class="gold" x1="378" y1="179" x2="394" y2="179"/>
            <rect class="gold-fill" x="394" y="160" width="184" height="38" rx="19"/>
            <text x="486" y="186" text-anchor="middle">Defect flagged</text>
          </g>
        </svg>

        <!-- 2. FinTech: one unusual transaction -->
        <svg class="ind-scene s2" viewBox="0 0 640 400" focusable="false">
          <line class="faint" x1="40" y1="110" x2="600" y2="110"/>
          <line class="faint" x1="40" y1="170" x2="600" y2="170"/>
          <line class="faint" x1="40" y1="230" x2="600" y2="230"/>
          <line class="faint" x1="40" y1="290" x2="600" y2="290"/>
          <line x1="40" y1="320" x2="600" y2="320"/>
          <path class="chart" pathLength="1" d="M60 280 L120 250 L180 264 L240 216 L300 232 L360 172 L420 190 L470 98 L520 206 L580 170"/>
          <g class="mark">
            <line class="gold dashed" x1="470" y1="116" x2="470" y2="320"/>
            <circle class="gold-fill" cx="470" cy="98" r="7"/>
            <circle class="gold ping" cx="470" cy="98" r="16"/>
            <line class="gold" x1="446" y1="68" x2="459" y2="86"/>
            <rect class="gold-fill" x="214" y="46" width="232" height="38" rx="19"/>
            <text x="330" y="72" text-anchor="middle">Unusual transaction</text>
          </g>
          <line class="stream" x1="40" y1="356" x2="600" y2="356"/>
        </svg>

        <!-- 3. WealthTech: allocation rebalancing -->
        <svg class="ind-scene s3" viewBox="0 0 640 400" focusable="false">
          <g transform="rotate(-90 190 200)">
            <circle class="seg a" cx="190" cy="200" r="90" pathLength="100"/>
            <circle class="seg b gold" cx="190" cy="200" r="90" pathLength="100"/>
            <circle class="seg c" cx="190" cy="200" r="90" pathLength="100"/>
          </g>
          <circle class="faint dashed" cx="190" cy="200" r="52"/>
          <rect class="faint" x="350" y="160" width="240" height="16" rx="8"/>
          <rect class="faint" x="350" y="192" width="240" height="16" rx="8"/>
          <rect class="faint" x="350" y="224" width="240" height="16" rx="8"/>
          <rect class="bar bar-a" x="350" y="160" width="240" height="16" rx="8" style="fill:var(--on-ink-soft);stroke:none"/>
          <rect class="bar bar-b" x="350" y="192" width="240" height="16" rx="8" style="fill:var(--gold);stroke:none"/>
          <rect class="bar bar-c" x="350" y="224" width="240" height="16" rx="8" style="fill:rgba(238,241,242,.4);stroke:none"/>
        </svg>

        <!-- 4. HealthTech: pulse becomes an organized record -->
        <svg class="ind-scene s4" viewBox="0 0 640 400" focusable="false">
          <path class="ecg" pathLength="1" d="M40 200 H120 L140 200 L156 150 L176 250 L198 100 L218 200 H250 L266 182 L282 200 H340"/>
          <line class="link gold dashed" x1="344" y1="200" x2="380" y2="200"/>
          <rect x="380" y="84" width="200" height="232" rx="14"/>
          <rect class="row gold-fill" x="404" y="112" width="90" height="10" rx="5"/>
          <rect class="row" x="404" y="150" width="150" height="10" rx="5" style="fill:var(--on-ink-soft);stroke:none"/>
          <rect class="row" x="404" y="176" width="120" height="10" rx="5" style="fill:var(--on-ink-soft);stroke:none"/>
          <rect class="row" x="404" y="202" width="150" height="10" rx="5" style="fill:var(--on-ink-soft);stroke:none"/>
          <rect class="row" x="404" y="228" width="96"  height="10" rx="5" style="fill:var(--on-ink-soft);stroke:none"/>
          <g class="done">
            <circle class="gold" cx="480" cy="282" r="14"/>
            <path class="gold" d="M472 282 L478 288 L489 275"/>
          </g>
        </svg>
      </div>
    </div>

    <ul class="ind-more">
      <li>EdTech</li>
      <li>MarineTech</li>
      <li>Construction</li>
      <li>Retail</li>
    </ul>
    <p class="ind-note">We also serve these sectors as part of our broader mission to make practical AI accessible across industries.</p>
  </div>
</section>

<script>
(function () {
  var items  = Array.prototype.slice.call(document.querySelectorAll('#ind-list .ind-item'));
  var btns   = items.map(function (it) { return it.querySelector('.ind-btn'); });
  var scenes = Array.prototype.slice.call(document.querySelectorAll('.ind-stage .ind-scene'));
  var hoverTimer;

  function openItem(i) {
    items.forEach(function (it, j) {
      var on = i === j;
      it.classList.toggle('is-active', on);
      btns[j].setAttribute('aria-expanded', on ? 'true' : 'false');
      scenes[j].classList.toggle('is-active', on);
    });
  }

  items.forEach(function (item, i) {
    btns[i].addEventListener('click', function () { openItem(i); });

    // Mouse hover switches the scene on wide screens only
    item.addEventListener('pointerenter', function (e) {
      if (e.pointerType !== 'mouse' || !window.matchMedia('(min-width: 900px)').matches) return;
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(function () { openItem(i); }, 90);
    });
    item.addEventListener('pointerleave', function () { clearTimeout(hoverTimer); });

    btns[i].addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % items.length;
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + items.length) % items.length;
      if (next === null) return;
      e.preventDefault();
      btns[next].focus();
      openItem(next);
    });
  });
})();
</script>
</body>
</html>