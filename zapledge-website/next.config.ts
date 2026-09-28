import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/ai-automation-cost-india',
        destination: '/blog/ai-automation-cost-india',
        permanent: false,
      },
      {
        source: '/signs-you-need-workflow-automation',
        destination: '/blog/signs-you-need-workflow-automation',
        permanent: false,
      },
      {
        source: '/5-signs-you-need-workflow-automation',
        destination: '/blog/signs-you-need-workflow-automation',
        permanent: false,
      },
      {
        source: '/signs-your-business-is-losing-time-to-manual-workflows',
        destination: '/blog/signs-you-need-workflow-automation',
        permanent: false,
      },
      {
        source: '/5-signs-your-business-is-losing-time-to-manual-workflows',
        destination: '/blog/signs-you-need-workflow-automation',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
