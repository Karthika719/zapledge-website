import { ContactHero } from '@/components/contact/ContactHero';
import { EmailDirectory } from '@/components/contact/EmailDirectory';
import { SupportCategories } from '@/components/contact/SupportCategories';
import { ContactForm } from '@/components/contact/ContactForm';
import { contactGradient } from '@/components/contact/shared';

function GradientHairline() {
  return (
    <div
      aria-hidden="true"
      className="mx-5 mt-10 md:mx-10 md:mt-12 xl:mx-auto xl:max-w-[1280px] xl:px-16 xl:mt-14"
    >
      <div
        className="h-px w-full"
        style={{ backgroundImage: contactGradient }}
      />
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="w-full bg-off-white">
      <ContactHero />
      <GradientHairline />
      <div className="mx-auto max-w-[1280px] px-5 py-10 md:px-10 md:py-12 xl:grid xl:grid-cols-[5fr_7fr] xl:gap-14 xl:px-16 xl:pt-14 xl:pb-20">
        <div className="flex flex-col gap-10 xl:gap-12">
          <EmailDirectory />
          <SupportCategories />
        </div>
        <div className="mt-10 xl:mt-0">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
