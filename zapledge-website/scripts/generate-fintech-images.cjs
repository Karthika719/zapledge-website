const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.join(__dirname, '..', 'public', 'images', 'industry-details', 'fintech');

function baseChrome({ activeNum, breadcrumbSubtitle, pageTitle, actionButtonText }) {
  const nums = ['01', '02', '03', '04'];
  const sidebarItems = nums.map((n, i) => {
    const y = 140 + i * 65;
    const isActive = n === activeNum;
    if (isActive) {
      return `
        <rect x="18" y="${y - 8}" width="52" height="44" rx="14" fill="#0033FF" />
        <text x="44" y="${y + 20}" font-family="Arial, 'Segoe UI', sans-serif" font-size="16" font-weight="800" fill="#FFFFFF" text-anchor="middle">${n}</text>
      `;
    }
    return `
      <text x="44" y="${y + 20}" font-family="Arial, 'Segoe UI', sans-serif" font-size="16" font-weight="700" fill="#8A94A6" text-anchor="middle">${n}</text>
    `;
  }).join('');

  return `
    <!-- Background -->
    <rect width="1120" height="720" fill="#FFFFFF" />

    <!-- Left Sidebar -->
    <line x1="88" y1="0" x2="88" y2="720" stroke="#F0F2F6" stroke-width="1.5" />
    
    <!-- Logo Badge -->
    <rect x="20" y="24" width="48" height="48" rx="12" fill="#00003C" />
    <!-- Stylized Z mark -->
    <path d="M33 38 L51 38 L37 54 L55 54" fill="none" stroke="#FFFFFF" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round" />
    
    <!-- Divider under logo -->
    <line x1="24" y1="96" x2="64" y2="96" stroke="#E5E7EB" stroke-width="1" />
    
    <!-- Sidebar numbers -->
    ${sidebarItems}

    <!-- Top Bar -->
    <text x="116" y="55" font-family="Arial, 'Segoe UI', sans-serif" font-size="18" font-weight="500" fill="#6B7280">FinTech Build</text>
    <text x="246" y="55" font-family="Arial, 'Segoe UI', sans-serif" font-size="18" font-weight="400" fill="#CBD5E1">/</text>
    <text x="268" y="55" font-family="Arial, 'Segoe UI', sans-serif" font-size="18" font-weight="800" fill="#00003C">${breadcrumbSubtitle}</text>

    <!-- Search Input -->
    <rect x="780" y="28" width="240" height="44" rx="12" fill="#F1F4F9" />
    <circle cx="802" cy="50" r="6" fill="none" stroke="#9CA3AF" stroke-width="2" />
    <line x1="806" y1="54" x2="812" y2="60" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" />
    <text x="822" y="56" font-family="Arial, 'Segoe UI', sans-serif" font-size="14" fill="#9CA3AF">Search</text>

    <!-- Profile Avatar -->
    <circle cx="1066" cy="50" r="22" fill="#3B4BFF" />

    <!-- Main Title & Action Button -->
    <text x="116" y="132" font-family="Arial, 'Segoe UI', sans-serif" font-size="28" font-weight="800" fill="#00003C" letter-spacing="-0.02em">${pageTitle}</text>
    ${actionButtonText ? `
      <rect x="912" y="98" width="176" height="44" rx="22" fill="#0033FF" />
      <text x="1000" y="126" font-family="Arial, 'Segoe UI', sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" text-anchor="middle">${actionButtonText}</text>
    ` : ''}
  `;
}

// 01 Onboarding & Compliance
const svg01 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 720" width="1120" height="720">
  ${baseChrome({
    activeNum: '01',
    breadcrumbSubtitle: 'Onboarding &amp; Compliance',
    pageTitle: 'Onboarding &amp; KYC applications',
    actionButtonText: '+ New application',
  })}

  <!-- 3 Stat Cards -->
  <!-- Stat 1 -->
  <rect x="116" y="165" width="310" height="110" rx="16" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1.2" />
  <text x="138" y="200" font-family="Arial, 'Segoe UI', sans-serif" font-size="14" font-weight="500" fill="#6B7280">Active onboarding</text>
  <text x="138" y="248" font-family="Arial, 'Segoe UI', sans-serif" font-size="38" font-weight="800" fill="#00003C">148</text>

  <!-- Stat 2 -->
  <rect x="446" y="165" width="310" height="110" rx="16" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1.2" />
  <text x="468" y="200" font-family="Arial, 'Segoe UI', sans-serif" font-size="14" font-weight="500" fill="#6B7280">KYC auto-verified</text>
  <text x="468" y="248" font-family="Arial, 'Segoe UI', sans-serif" font-size="38" font-weight="800" fill="#00003C">96.4%</text>

  <!-- Stat 3 -->
  <rect x="776" y="165" width="312" height="110" rx="16" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1.2" />
  <text x="798" y="200" font-family="Arial, 'Segoe UI', sans-serif" font-size="14" font-weight="500" fill="#6B7280">Compliance queue</text>
  <text x="798" y="248" font-family="Arial, 'Segoe UI', sans-serif" font-size="38" font-weight="800" fill="#00003C">12</text>

  <!-- Table Card -->
  <rect x="116" y="300" width="972" height="385" rx="18" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1.2" />
  
  <!-- Table Header -->
  <rect x="117" y="301" width="970" height="46" rx="17" fill="#F8FAFC" />
  <text x="140" y="330" font-family="Arial, 'Segoe UI', sans-serif" font-size="12" font-weight="700" fill="#6B7280" letter-spacing="0.05em">APPLICATION</text>
  <text x="290" y="330" font-family="Arial, 'Segoe UI', sans-serif" font-size="12" font-weight="700" fill="#6B7280" letter-spacing="0.05em">APPLICANT / ENTITY</text>
  <text x="680" y="330" font-family="Arial, 'Segoe UI', sans-serif" font-size="12" font-weight="700" fill="#6B7280" letter-spacing="0.05em">TIER / RISK</text>
  <text x="910" y="330" font-family="Arial, 'Segoe UI', sans-serif" font-size="12" font-weight="700" fill="#6B7280" letter-spacing="0.05em">STATUS</text>

  <!-- Row 1 -->
  <line x1="117" y1="347" x2="1087" y2="347" stroke="#F1F5F9" stroke-width="1" />
  <text x="140" y="392" font-family="Arial, 'Segoe UI', sans-serif" font-size="15" font-weight="800" fill="#00003C">APP-8941</text>
  <text x="290" y="392" font-family="Arial, 'Segoe UI', sans-serif" font-size="15" font-weight="600" fill="#00003C">Astra Pay Ltd</text>
  <text x="680" y="392" font-family="Arial, 'Segoe UI', sans-serif" font-size="15" font-weight="500" fill="#4B5563">Corporate · Low risk</text>
  <rect x="910" y="372" width="102" height="30" rx="15" fill="#E8F9EE" />
  <text x="961" y="392" font-family="Arial, 'Segoe UI', sans-serif" font-size="13" font-weight="700" fill="#059669" text-anchor="middle">Verified</text>

  <!-- Row 2 -->
  <line x1="117" y1="430" x2="1087" y2="430" stroke="#F1F5F9" stroke-width="1" />
  <text x="140" y="475" font-family="Arial, 'Segoe UI', sans-serif" font-size="15" font-weight="800" fill="#00003C">APP-8938</text>
  <text x="290" y="475" font-family="Arial, 'Segoe UI', sans-serif" font-size="15" font-weight="600" fill="#00003C">Elena Rostova</text>
  <text x="680" y="475" font-family="Arial, 'Segoe UI', sans-serif" font-size="15" font-weight="500" fill="#4B5563">HNW Individual</text>
  <rect x="910" y="455" width="112" height="30" rx="15" fill="#F3EEFF" />
  <text x="966" y="475" font-family="Arial, 'Segoe UI', sans-serif" font-size="13" font-weight="700" fill="#7C3AED" text-anchor="middle">In review</text>

  <!-- Row 3 -->
  <line x1="117" y1="513" x2="1087" y2="513" stroke="#F1F5F9" stroke-width="1" />
  <text x="140" y="558" font-family="Arial, 'Segoe UI', sans-serif" font-size="15" font-weight="800" fill="#00003C">APP-8924</text>
  <text x="290" y="558" font-family="Arial, 'Segoe UI', sans-serif" font-size="15" font-weight="600" fill="#00003C">Meridian Trade Group</text>
  <text x="680" y="558" font-family="Arial, 'Segoe UI', sans-serif" font-size="15" font-weight="500" fill="#4B5563">SME · Automated KYC</text>
  <rect x="910" y="538" width="102" height="30" rx="15" fill="#E8F9EE" />
  <text x="961" y="558" font-family="Arial, 'Segoe UI', sans-serif" font-size="13" font-weight="700" fill="#059669" text-anchor="middle">Verified</text>

  <!-- Row 4 -->
  <line x1="117" y1="596" x2="1087" y2="596" stroke="#F1F5F9" stroke-width="1" />
  <text x="140" y="641" font-family="Arial, 'Segoe UI', sans-serif" font-size="15" font-weight="800" fill="#00003C">APP-8919</text>
  <text x="290" y="641" font-family="Arial, 'Segoe UI', sans-serif" font-size="15" font-weight="600" fill="#00003C">David K. Miller</text>
  <text x="680" y="641" font-family="Arial, 'Segoe UI', sans-serif" font-size="15" font-weight="500" fill="#4B5563">Retail · ID re-upload</text>
  <rect x="910" y="621" width="124" height="30" rx="15" fill="#FEF3C7" />
  <text x="972" y="641" font-family="Arial, 'Segoe UI', sans-serif" font-size="13" font-weight="700" fill="#B45309" text-anchor="middle">Action needed</text>
</svg>
`;

// 02 Lending & Risk
const svg02 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 720" width="1120" height="720">
  ${baseChrome({
    activeNum: '02',
    breadcrumbSubtitle: 'Lending &amp; Risk',
    pageTitle: 'Credit underwriting &amp; risk rules',
    actionButtonText: '+ Config rule',
  })}

  <!-- Top 3 Stat Cards -->
  <rect x="116" y="165" width="310" height="110" rx="16" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1.2" />
  <text x="138" y="200" font-family="Arial, 'Segoe UI', sans-serif" font-size="14" font-weight="500" fill="#6B7280">Underwriting volume</text>
  <text x="138" y="248" font-family="Arial, 'Segoe UI', sans-serif" font-size="38" font-weight="800" fill="#00003C">$6.42M</text>

  <rect x="446" y="165" width="310" height="110" rx="16" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1.2" />
  <text x="468" y="200" font-family="Arial, 'Segoe UI', sans-serif" font-size="14" font-weight="500" fill="#6B7280">Auto-decision rate</text>
  <text x="468" y="248" font-family="Arial, 'Segoe UI', sans-serif" font-size="38" font-weight="800" fill="#00003C">88.2%</text>

  <rect x="776" y="165" width="312" height="110" rx="16" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1.2" />
  <text x="798" y="200" font-family="Arial, 'Segoe UI', sans-serif" font-size="14" font-weight="500" fill="#6B7280">Fraud flags caught</text>
  <text x="798" y="248" font-family="Arial, 'Segoe UI', sans-serif" font-size="38" font-weight="800" fill="#00003C">0 false</text>

  <!-- Left Card: Risk Rules Pipeline -->
  <rect x="116" y="300" width="530" height="385" rx="18" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1.2" />
  <text x="140" y="336" font-family="Arial, 'Segoe UI', sans-serif" font-size="17" font-weight="800" fill="#00003C">Risk engine rules</text>
  <text x="590" y="336" font-family="Arial, 'Segoe UI', sans-serif" font-size="13" font-weight="600" fill="#0033FF" text-anchor="end">Active engine</text>

  <!-- Rule 1 -->
  <rect x="140" y="360" width="482" height="66" rx="12" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1" />
  <text x="156" y="388" font-family="Arial, 'Segoe UI', sans-serif" font-size="14" font-weight="800" fill="#00003C">RULE-101 · Debt-to-income threshold</text>
  <text x="156" y="410" font-family="Arial, 'Segoe UI', sans-serif" font-size="12" fill="#64748B">DTI &lt; 38% · Auto-route to Tier 1 approval</text>
  <rect x="532" y="377" width="76" height="26" rx="13" fill="#E8F9EE" />
  <text x="570" y="394" font-family="Arial, 'Segoe UI', sans-serif" font-size="11" font-weight="700" fill="#059669" text-anchor="middle">Passed</text>

  <!-- Rule 2 -->
  <rect x="140" y="440" width="482" height="66" rx="12" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1" />
  <text x="156" y="468" font-family="Arial, 'Segoe UI', sans-serif" font-size="14" font-weight="800" fill="#00003C">RULE-104 · Sanctions &amp; PEP screening</text>
  <text x="156" y="490" font-family="Arial, 'Segoe UI', sans-serif" font-size="12" fill="#64748B">Real-time watchlist check across 4 databases</text>
  <rect x="532" y="457" width="76" height="26" rx="13" fill="#E8F9EE" />
  <text x="570" y="474" font-family="Arial, 'Segoe UI', sans-serif" font-size="11" font-weight="700" fill="#059669" text-anchor="middle">Cleared</text>

  <!-- Rule 3 -->
  <rect x="140" y="520" width="482" height="66" rx="12" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1" />
  <text x="156" y="548" font-family="Arial, 'Segoe UI', sans-serif" font-size="14" font-weight="800" fill="#00003C">RULE-108 · Velocity anomaly trigger</text>
  <text x="156" y="570" font-family="Arial, 'Segoe UI', sans-serif" font-size="12" fill="#64748B">Flags &gt;2 loan requests in 7 days</text>
  <rect x="518" y="537" width="90" height="26" rx="13" fill="#FEF3C7" />
  <text x="563" y="554" font-family="Arial, 'Segoe UI', sans-serif" font-size="11" font-weight="700" fill="#B45309" text-anchor="middle">Triggered</text>

  <!-- Right Card: Active Loan Pipeline -->
  <rect x="666" y="300" width="422" height="385" rx="18" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1.2" />
  <text x="690" y="336" font-family="Arial, 'Segoe UI', sans-serif" font-size="17" font-weight="800" fill="#00003C">Recent loan decisions</text>
  <text x="1064" y="336" font-family="Arial, 'Segoe UI', sans-serif" font-size="13" font-weight="600" fill="#6B7280" text-anchor="end">View all</text>

  <!-- Item 1 -->
  <rect x="690" y="360" width="374" height="88" rx="14" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" />
  <text x="708" y="390" font-family="Arial, 'Segoe UI', sans-serif" font-size="15" font-weight="800" fill="#00003C">LN-4890 · $85,000</text>
  <rect x="980" y="373" width="70" height="24" rx="12" fill="#E0E7FF" />
  <text x="1015" y="389" font-family="Arial, 'Segoe UI', sans-serif" font-size="11" font-weight="700" fill="#3730A3" text-anchor="middle">Disbursed</text>
  <text x="708" y="420" font-family="Arial, 'Segoe UI', sans-serif" font-size="12" fill="#64748B">Commercial credit · 36 mo term</text>

  <!-- Item 2 -->
  <rect x="690" y="460" width="374" height="88" rx="14" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" />
  <text x="708" y="490" font-family="Arial, 'Segoe UI', sans-serif" font-size="15" font-weight="800" fill="#00003C">LN-4886 · $24,000</text>
  <rect x="944" y="473" width="106" height="24" rx="12" fill="#F3EEFF" />
  <text x="997" y="489" font-family="Arial, 'Segoe UI', sans-serif" font-size="11" font-weight="700" fill="#7C3AED" text-anchor="middle">Maker-Checker</text>
  <text x="708" y="520" font-family="Arial, 'Segoe UI', sans-serif" font-size="12" fill="#64748B">Awaiting Risk Lead second review</text>

  <!-- Item 3 -->
  <rect x="690" y="560" width="374" height="88" rx="14" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" />
  <text x="708" y="590" font-family="Arial, 'Segoe UI', sans-serif" font-size="15" font-weight="800" fill="#00003C">LN-4882 · $12,500</text>
  <rect x="975" y="573" width="75" height="24" rx="12" fill="#E8F9EE" />
  <text x="1012" y="589" font-family="Arial, 'Segoe UI', sans-serif" font-size="11" font-weight="700" fill="#059669" text-anchor="middle">Approved</text>
  <text x="708" y="620" font-family="Arial, 'Segoe UI', sans-serif" font-size="12" fill="#64748B">Auto-underwritten in 14 seconds</text>
</svg>
`;

// 03 Payments & Operations
const svg03 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 720" width="1120" height="720">
  ${baseChrome({
    activeNum: '03',
    breadcrumbSubtitle: 'Payments &amp; Operations',
    pageTitle: 'Transaction ledger &amp; reconciliation',
    actionButtonText: '+ Reconcile now',
  })}

  <!-- Left: Settlement by Gateway -->
  <rect x="116" y="165" width="530" height="520" rx="18" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1.2" />
  <text x="140" y="202" font-family="Arial, 'Segoe UI', sans-serif" font-size="18" font-weight="800" fill="#00003C">Settlement streams</text>
  <text x="590" y="202" font-family="Arial, 'Segoe UI', sans-serif" font-size="13" font-weight="600" fill="#6B7280" text-anchor="end">Daily total: $4.85M</text>

  <!-- Gateway 1 -->
  <rect x="140" y="225" width="482" height="96" rx="14" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1" />
  <text x="160" y="255" font-family="Arial, 'Segoe UI', sans-serif" font-size="15" font-weight="800" fill="#00003C">Card Rails &amp; Gateways</text>
  <text x="600" y="255" font-family="Arial, 'Segoe UI', sans-serif" font-size="15" font-weight="800" fill="#00003C" text-anchor="end">$2,840,000</text>
  <rect x="160" y="275" width="440" height="8" rx="4" fill="#E2E8F0" />
  <rect x="160" y="275" width="380" height="8" rx="4" fill="#0033FF" />
  <text x="160" y="303" font-family="Arial, 'Segoe UI', sans-serif" font-size="12" font-weight="600" fill="#059669">✓ 100% matched to ledger</text>

  <!-- Gateway 2 -->
  <rect x="140" y="335" width="482" height="96" rx="14" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1" />
  <text x="160" y="365" font-family="Arial, 'Segoe UI', sans-serif" font-size="15" font-weight="800" fill="#00003C">ACH &amp; Batch Clearing</text>
  <text x="600" y="365" font-family="Arial, 'Segoe UI', sans-serif" font-size="15" font-weight="800" fill="#00003C" text-anchor="end">$1,450,000</text>
  <rect x="160" y="385" width="440" height="8" rx="4" fill="#E2E8F0" />
  <rect x="160" y="385" width="310" height="8" rx="4" fill="#7C3AED" />
  <text x="160" y="413" font-family="Arial, 'Segoe UI', sans-serif" font-size="12" font-weight="600" fill="#0033FF">Batch 402 in transit</text>

  <!-- Gateway 3 -->
  <rect x="140" y="445" width="482" height="96" rx="14" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1" />
  <text x="160" y="475" font-family="Arial, 'Segoe UI', sans-serif" font-size="15" font-weight="800" fill="#00003C">Instant Payments / RTP</text>
  <text x="600" y="475" font-family="Arial, 'Segoe UI', sans-serif" font-size="15" font-weight="800" fill="#00003C" text-anchor="end">$560,000</text>
  <rect x="160" y="495" width="440" height="8" rx="4" fill="#E2E8F0" />
  <rect x="160" y="495" width="410" height="8" rx="4" fill="#06B6D4" />
  <text x="160" y="523" font-family="Arial, 'Segoe UI', sans-serif" font-size="12" font-weight="600" fill="#059669">Real-time gross settlement</text>

  <!-- Right: Exception Queue -->
  <rect x="666" y="165" width="422" height="520" rx="18" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1.2" />
  <text x="690" y="202" font-family="Arial, 'Segoe UI', sans-serif" font-size="18" font-weight="800" fill="#00003C">Exception queue</text>
  <text x="1064" y="202" font-family="Arial, 'Segoe UI', sans-serif" font-size="13" font-weight="600" fill="#6B7280" text-anchor="end">SLA Active</text>

  <!-- Exception 1 -->
  <rect x="690" y="225" width="374" height="110" rx="14" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" />
  <text x="708" y="255" font-family="Arial, 'Segoe UI', sans-serif" font-size="14" font-weight="800" fill="#00003C">EX-941 · Gateway fee variance</text>
  <rect x="980" y="240" width="70" height="24" rx="12" fill="#E0E7FF" />
  <text x="1015" y="256" font-family="Arial, 'Segoe UI', sans-serif" font-size="11" font-weight="700" fill="#0033FF" text-anchor="middle">In transit</text>
  <text x="708" y="285" font-family="Arial, 'Segoe UI', sans-serif" font-size="12" fill="#64748B">Merchant #812 · $14.20 delta</text>
  <text x="708" y="312" font-family="Arial, 'Segoe UI', sans-serif" font-size="11" font-weight="600" fill="#0033FF">Assigned: L1 Finance Ops · SLA 2h</text>

  <!-- Exception 2 -->
  <rect x="690" y="350" width="374" height="110" rx="14" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" />
  <text x="708" y="380" font-family="Arial, 'Segoe UI', sans-serif" font-size="14" font-weight="800" fill="#00003C">EX-938 · Cut-off timing</text>
  <rect x="970" y="365" width="80" height="24" rx="12" fill="#FEF3C7" />
  <text x="1010" y="381" font-family="Arial, 'Segoe UI', sans-serif" font-size="11" font-weight="700" fill="#B45309" text-anchor="middle">Awaiting batch</text>
  <text x="708" y="410" font-family="Arial, 'Segoe UI', sans-serif" font-size="12" fill="#64748B">Batch #4012 · $850 pending bank post</text>
  <text x="708" y="437" font-family="Arial, 'Segoe UI', sans-serif" font-size="11" font-weight="600" fill="#64748B">Auto-resolve rule scheduled</text>

  <!-- Exception 3 -->
  <rect x="690" y="475" width="374" height="110" rx="14" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" />
  <text x="708" y="505" font-family="Arial, 'Segoe UI', sans-serif" font-size="14" font-weight="800" fill="#00003C">EX-930 · Reversal match</text>
  <rect x="980" y="490" width="70" height="24" rx="12" fill="#E8F9EE" />
  <text x="1015" y="506" font-family="Arial, 'Segoe UI', sans-serif" font-size="11" font-weight="700" fill="#059669" text-anchor="middle">Resolved</text>
  <text x="708" y="535" font-family="Arial, 'Segoe UI', sans-serif" font-size="12" fill="#64748B">Refund TX-201 · Clean paper trail</text>
  <text x="708" y="562" font-family="Arial, 'Segoe UI', sans-serif" font-size="11" font-weight="600" fill="#059669">Audit log sealed 14:10 UTC</text>
</svg>
`;

// 04 Customer & Reporting
const svg04 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 720" width="1120" height="720">
  ${baseChrome({
    activeNum: '04',
    breadcrumbSubtitle: 'Customer &amp; Reporting',
    pageTitle: 'Operations &amp; financial analytics',
    actionButtonText: 'Export report',
  })}

  <!-- 4 Top KPI Cards -->
  <rect x="116" y="165" width="225" height="110" rx="16" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1.2" />
  <text x="136" y="198" font-family="Arial, 'Segoe UI', sans-serif" font-size="13" font-weight="500" fill="#6B7280">Total processed</text>
  <text x="136" y="244" font-family="Arial, 'Segoe UI', sans-serif" font-size="32" font-weight="800" fill="#00003C">$18.4M</text>
  <text x="136" y="262" font-family="Arial, 'Segoe UI', sans-serif" font-size="12" font-weight="600" fill="#059669">+14% vs last mo</text>

  <rect x="365" y="165" width="225" height="110" rx="16" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1.2" />
  <text x="385" y="198" font-family="Arial, 'Segoe UI', sans-serif" font-size="13" font-weight="500" fill="#6B7280">Reconciliation rate</text>
  <text x="385" y="244" font-family="Arial, 'Segoe UI', sans-serif" font-size="32" font-weight="800" fill="#00003C">99.8%</text>
  <text x="385" y="262" font-family="Arial, 'Segoe UI', sans-serif" font-size="12" font-weight="600" fill="#059669">0 unassigned</text>

  <rect x="614" y="165" width="225" height="110" rx="16" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1.2" />
  <text x="634" y="198" font-family="Arial, 'Segoe UI', sans-serif" font-size="13" font-weight="500" fill="#6B7280">Dispute rate</text>
  <text x="634" y="244" font-family="Arial, 'Segoe UI', sans-serif" font-size="32" font-weight="800" fill="#00003C">0.03%</text>
  <text x="634" y="262" font-family="Arial, 'Segoe UI', sans-serif" font-size="12" font-weight="600" fill="#6B7280">Benchmark &lt;0.1%</text>

  <rect x="863" y="165" width="225" height="110" rx="16" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1.2" />
  <text x="883" y="198" font-family="Arial, 'Segoe UI', sans-serif" font-size="13" font-weight="500" fill="#6B7280">Audit readiness</text>
  <text x="883" y="244" font-family="Arial, 'Segoe UI', sans-serif" font-size="32" font-weight="800" fill="#00003C">100%</text>
  <text x="883" y="262" font-family="Arial, 'Segoe UI', sans-serif" font-size="12" font-weight="600" fill="#059669">All trails signed</text>

  <!-- Left: Bar Chart -->
  <rect x="116" y="300" width="560" height="385" rx="18" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1.2" />
  <text x="140" y="336" font-family="Arial, 'Segoe UI', sans-serif" font-size="17" font-weight="800" fill="#00003C">Transaction volume · last 8 weeks</text>
  
  <!-- 8 Bars -->
  <!-- Bar 1 -->
  <rect x="150" y="520" width="46" height="110" rx="8" fill="#E0E7FF" />
  <!-- Bar 2 -->
  <rect x="210" y="500" width="46" height="130" rx="8" fill="#E0E7FF" />
  <!-- Bar 3 -->
  <rect x="270" y="510" width="46" height="120" rx="8" fill="#E0E7FF" />
  <!-- Bar 4 -->
  <rect x="330" y="470" width="46" height="160" rx="8" fill="#E0E7FF" />
  <!-- Bar 5 -->
  <rect x="390" y="480" width="46" height="150" rx="8" fill="#E0E7FF" />
  <!-- Bar 6 -->
  <rect x="450" y="440" width="46" height="190" rx="8" fill="#E0E7FF" />
  <!-- Bar 7 -->
  <rect x="510" y="420" width="46" height="210" rx="8" fill="#E0E7FF" />
  <!-- Bar 8 (Active) -->
  <rect x="570" y="370" width="46" height="260" rx="8" fill="#0033FF" />

  <!-- Right: Customer CRM & Cases by Category -->
  <rect x="696" y="300" width="392" height="385" rx="18" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1.2" />
  <text x="720" y="336" font-family="Arial, 'Segoe UI', sans-serif" font-size="17" font-weight="800" fill="#00003C">Cases by category</text>
  
  <!-- Segment bar -->
  <rect x="720" y="360" width="344" height="14" rx="7" fill="#E2E8F0" />
  <rect x="720" y="360" width="140" height="14" rx="7" fill="#0033FF" />
  <rect x="860" y="360" width="90" height="14" rx="0" fill="#7C3AED" />
  <rect x="950" y="360" width="70" height="14" rx="0" fill="#06B6D4" />
  <rect x="1020" y="360" width="44" height="14" rx="7" fill="#F43F5E" />

  <!-- Category List -->
  <rect x="720" y="398" width="12" height="12" rx="3" fill="#0033FF" />
  <text x="742" y="410" font-family="Arial, 'Segoe UI', sans-serif" font-size="14" font-weight="600" fill="#00003C">Onboarding guidance</text>
  <text x="1064" y="410" font-family="Arial, 'Segoe UI', sans-serif" font-size="14" font-weight="700" fill="#00003C" text-anchor="end">41%</text>

  <rect x="720" y="438" width="12" height="12" rx="3" fill="#7C3AED" />
  <text x="742" y="450" font-family="Arial, 'Segoe UI', sans-serif" font-size="14" font-weight="600" fill="#00003C">Disbursal status</text>
  <text x="1064" y="450" font-family="Arial, 'Segoe UI', sans-serif" font-size="14" font-weight="700" fill="#00003C" text-anchor="end">26%</text>

  <rect x="720" y="478" width="12" height="12" rx="3" fill="#06B6D4" />
  <text x="742" y="490" font-family="Arial, 'Segoe UI', sans-serif" font-size="14" font-weight="600" fill="#00003C">Dispute &amp; chargeback</text>
  <text x="1064" y="490" font-family="Arial, 'Segoe UI', sans-serif" font-size="14" font-weight="700" fill="#00003C" text-anchor="end">21%</text>

  <rect x="720" y="518" width="12" height="12" rx="3" fill="#F43F5E" />
  <text x="742" y="530" font-family="Arial, 'Segoe UI', sans-serif" font-size="14" font-weight="600" fill="#00003C">Reconciliation question</text>
  <text x="1064" y="530" font-family="Arial, 'Segoe UI', sans-serif" font-size="14" font-weight="700" fill="#00003C" text-anchor="end">12%</text>

  <rect x="720" y="560" width="344" height="90" rx="14" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1" />
  <text x="738" y="590" font-family="Arial, 'Segoe UI', sans-serif" font-size="13" font-weight="800" fill="#00003C">Natural-language audit search</text>
  <text x="738" y="612" font-family="Arial, 'Segoe UI', sans-serif" font-size="12" fill="#64748B">Ops &amp; compliance search across unified records</text>
  <text x="738" y="634" font-family="Arial, 'Segoe UI', sans-serif" font-size="11" font-weight="700" fill="#0033FF">Active across all channels</text>
</svg>
`;

async function run() {
  const images = [
    { name: '01-onboarding-compliance.webp', svg: svg01 },
    { name: '02-lending-risk.webp', svg: svg02 },
    { name: '03-payments-operations.webp', svg: svg03 },
    { name: '04-customer-reporting.webp', svg: svg04 },
  ];

  for (const { name, svg } of images) {
    const dest = path.join(outDir, name);
    await sharp(Buffer.from(svg))
      .webp({ quality: 95 })
      .toFile(dest);
    console.log(`Generated ${dest}`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
