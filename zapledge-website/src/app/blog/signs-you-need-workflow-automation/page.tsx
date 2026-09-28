import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '5 Signs Your Business Needs Workflow Automation | Zapledge',
  description:
    'IDC research shows businesses lose 20-30% of revenue to process inefficiencies. Here are 5 signs your manual workflows are costing you more than time.',
};

export default function SignsYouNeedWorkflowAutomationPage() {
  return (
    <div className="w-full bg-[#FAFAFA] min-h-[75vh] pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#00003C]">
          5 Signs Your Business Needs Workflow Automation
        </h1>
        <p className="text-sm sm:text-base text-[#555555] mt-4">
          This article is currently being prepared for publication.
        </p>
      </div>
    </div>
  );
}
