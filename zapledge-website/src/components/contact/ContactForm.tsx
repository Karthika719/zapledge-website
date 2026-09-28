'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { validateContactFields, type ContactFieldErrors } from '@/lib/validateContact';
import { ArrowIcon, CheckIcon, SpinnerIcon } from './icons';
import { focusRing, outfitFont } from './shared';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneCountry: string;
  phoneNumber: string;
  message: string;
}

const EMPTY_VALUES: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phoneCountry: '+91',
  phoneNumber: '',
  message: '',
};

const COUNTRY_CODES = [
  { code: '+91', label: 'IN' },
  { code: '+971', label: 'AE' },
  { code: '+1', label: 'US' },
  { code: '+44', label: 'GB' },
  { code: '+65', label: 'SG' },
  { code: '+61', label: 'AU' },
  { code: '+49', label: 'DE' },
  { code: '+966', label: 'SA' },
  { code: '+974', label: 'QA' },
] as const;

const FIELD_ORDER: (keyof ContactFieldErrors)[] = ['firstName', 'lastName', 'email', 'phoneNumber', 'message'];

const errorBanner = 'mt-1 mb-1 rounded-xl border px-4 py-3 text-[14px] border-[#FECDCA] bg-[#FEF3F2] text-[#7A271A]';

function fieldClasses(hasError: boolean, extra = '') {
  return [
    'h-[54px] w-full rounded-xl border px-4 text-[16px] outline-none transition-colors',
    'placeholder:text-[#9AA0BF] disabled:cursor-not-allowed disabled:opacity-60',
    hasError
      ? 'border-[#D92D20] bg-[#FFFBFA] focus-visible:border-[#D92D20] focus-visible:shadow-[0_0_0_4px_rgba(217,45,32,0.14)] focus-visible:outline-[#D92D20]'
      : 'border-[#CDD2E8] bg-white hover:border-[#A9B0D6] focus-visible:border-accent focus-visible:shadow-[0_0_0_4px_rgba(0,51,255,0.15)] focus-visible:outline-accent',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px]',
    extra,
  ].join(' ');
}

function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="text-navy mb-1.5 block text-[14px] font-semibold">
      {children}
      {required && (
        <span aria-hidden="true" className="text-accent">
          {' '}
          *
        </span>
      )}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <p
      id={id}
      className={`mt-1.5 min-h-[20px] text-[13px] leading-[20px] ${message ? 'text-[#B42318]' : 'text-transparent'}`}
    >
      {message ?? ' '}
    </p>
  );
}

type StepState = 'done' | 'active' | 'pending' | 'error';

function StatusTracker({ status }: { status: Status }) {
  const stepState = (index: number): StepState => {
    if (status === 'error') return index === 0 ? 'done' : index === 1 ? 'error' : 'pending';
    if (status === 'success') return 'done';
    if (status === 'loading') return index === 0 ? 'done' : index === 1 ? 'active' : 'pending';
    return index === 0 ? 'active' : 'pending';
  };

  const steps = [
    { key: 'details', label: 'DETAILS' },
    {
      key: 'send',
      label: status === 'loading' ? 'SENDING' : status === 'success' ? 'SENT' : status === 'error' ? 'NOT SENT' : 'SEND',
    },
    { key: 'received', label: 'RECEIVED' },
  ];

  return (
    <div aria-hidden="true" className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1">
      {steps.map((step, i) => {
        const state = stepState(i);
        const dotClass = state === 'error' ? 'bg-[#D92D20]' : state === 'pending' ? 'bg-[#CDD2E8]' : 'bg-accent';
        const textClass = state === 'error' ? 'text-[#D92D20]' : state === 'pending' ? 'text-[#9AA0BF]' : 'text-navy';
        const connectorClass = state === 'pending' ? 'bg-border-subtle' : 'bg-accent';
        return (
          <div key={step.key} className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span
                className={`h-2 w-2 rounded-full ${dotClass} ${state === 'active' ? 'motion-safe:animate-pulse' : ''}`}
              />
              <span className={`text-[10px] font-semibold tracking-[0.08em] ${textClass}`}>{step.label}</span>
            </div>
            {i < steps.length - 1 && <span className={`h-px w-6 ${connectorClass}`} />}
          </div>
        );
      })}
    </div>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [liveMessage, setLiveMessage] = useState('');
  const [successInfo, setSuccessInfo] = useState<{ firstName: string; email: string } | null>(null);
  const [resetToken, setResetToken] = useState(0);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  const fieldRefs: Record<string, React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>> = {
    firstName: firstNameRef,
    lastName: lastNameRef,
    email: emailRef,
    phoneNumber: phoneRef,
    message: messageRef,
  };

  const errors = validateContactFields(values);
  const errorCount = Object.keys(errors).length;

  useEffect(() => {
    if (status === 'success') {
      successHeadingRef.current?.focus();
    }
  }, [status]);

  useEffect(() => {
    if (resetToken > 0) {
      firstNameRef.current?.focus();
    }
  }, [resetToken]);

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function focusFirstInvalid(currentErrors: ContactFieldErrors) {
    for (const key of FIELD_ORDER) {
      if (currentErrors[key]) {
        fieldRefs[key]?.current?.focus();
        return;
      }
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'loading') return;

    setAttempted(true);
    const currentErrors = validateContactFields(values);

    if (Object.keys(currentErrors).length > 0) {
      setLiveMessage(`Please check the ${Object.keys(currentErrors).length} highlighted fields above.`);
      focusFirstInvalid(currentErrors);
      return;
    }

    setStatus('loading');
    setLiveMessage('Sending your message…');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;

      if (!res.ok || !data?.ok) {
        throw new Error('Contact form submission failed.');
      }

      setSuccessInfo({ firstName: values.firstName.trim(), email: values.email.trim() });
      setStatus('success');
      setLiveMessage('Your message has been sent.');
    } catch {
      setStatus('error');
      setLiveMessage("We couldn't send your message. Please try again.");
    }
  }

  function handleReset() {
    setValues(EMPTY_VALUES);
    setAttempted(false);
    setStatus('idle');
    setSuccessInfo(null);
    setLiveMessage('');
    setResetToken((t) => t + 1);
  }

  const isLoading = status === 'loading';
  const phoneError = attempted ? errors.phoneNumber : undefined;

  return (
    <div className="border-border-subtle rounded-3xl border bg-white p-6 shadow-[0_40px_80px_-48px_rgba(10,11,61,0.35)] sm:p-9 xl:p-11">
      <StatusTracker status={status} />

      {status === 'success' && successInfo ? (
        <div className="flex flex-col items-start gap-4">
          <div className="text-accent flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF1FF]">
            <CheckIcon className="h-6 w-6" />
          </div>
          <h3
            ref={successHeadingRef}
            tabIndex={-1}
            className={`${outfitFont} text-navy text-[22px] font-semibold outline-none`}
          >
            Message sent.
          </h3>
          <p className="text-text-secondary text-[15.5px] leading-[1.6]">
            Thanks, {successInfo.firstName}. We&apos;ve received your message and will reply to {successInfo.email}.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className={`text-navy inline-flex h-[54px] items-center justify-center rounded-full border border-[#CDD2E8] px-6 text-[15px] font-semibold transition-colors hover:border-[#A9B0D6] ${focusRing}`}
          >
            Send another message
          </button>
        </div>
      ) : (
        <form noValidate onSubmit={handleSubmit}>
          <fieldset disabled={isLoading} className="m-0 min-w-0 border-0 p-0">
            <legend className="sr-only">Contact form</legend>

            <h2 className={`${outfitFont} text-navy text-[22px] font-semibold`}>Send us a message.</h2>
            <p className="text-text-secondary mt-1 text-[14px]">
              Fields marked <span className="text-accent">*</span> are required.
            </p>

            <div className="mt-7 grid grid-cols-1 gap-x-5 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="firstName" required>
                  First name
                </FieldLabel>
                <input
                  id="firstName"
                  ref={firstNameRef}
                  name="firstName"
                  autoComplete="given-name"
                  value={values.firstName}
                  onChange={(e) => update('firstName', e.target.value)}
                  aria-invalid={attempted && !!errors.firstName}
                  aria-describedby="firstName-error"
                  className={fieldClasses(attempted && !!errors.firstName)}
                />
                <FieldError id="firstName-error" message={attempted ? errors.firstName : undefined} />
              </div>
              <div>
                <FieldLabel htmlFor="lastName" required>
                  Last name
                </FieldLabel>
                <input
                  id="lastName"
                  ref={lastNameRef}
                  name="lastName"
                  autoComplete="family-name"
                  value={values.lastName}
                  onChange={(e) => update('lastName', e.target.value)}
                  aria-invalid={attempted && !!errors.lastName}
                  aria-describedby="lastName-error"
                  className={fieldClasses(attempted && !!errors.lastName)}
                />
                <FieldError id="lastName-error" message={attempted ? errors.lastName : undefined} />
              </div>
            </div>

            <div className="mt-1 grid grid-cols-1 gap-x-5 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="email" required>
                  Email
                </FieldLabel>
                <input
                  id="email"
                  ref={emailRef}
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => update('email', e.target.value)}
                  aria-invalid={attempted && !!errors.email}
                  aria-describedby="email-error"
                  className={fieldClasses(attempted && !!errors.email)}
                />
                <FieldError id="email-error" message={attempted ? errors.email : undefined} />
              </div>
              <div>
                <FieldLabel htmlFor="phoneNumber">Phone number</FieldLabel>
                <div
                  className={[
                    'flex h-[54px] w-full items-stretch overflow-hidden rounded-xl border transition-colors',
                    phoneError
                      ? 'border-[#D92D20] bg-[#FFFBFA] focus-within:shadow-[0_0_0_4px_rgba(217,45,32,0.14)]'
                      : 'border-[#CDD2E8] bg-white focus-within:border-accent focus-within:shadow-[0_0_0_4px_rgba(0,51,255,0.15)]',
                    'focus-within:outline focus-within:outline-2 focus-within:outline-offset-[3px]',
                    phoneError ? 'focus-within:outline-[#D92D20]' : 'focus-within:outline-accent',
                  ].join(' ')}
                >
                  <select
                    aria-label="Country code"
                    value={values.phoneCountry}
                    onChange={(e) => update('phoneCountry', e.target.value)}
                    className="text-navy h-full shrink-0 border-none bg-transparent pl-3 pr-1 text-[16px] outline-none disabled:cursor-not-allowed"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.label} {c.code}
                      </option>
                    ))}
                  </select>
                  <span aria-hidden="true" className="my-2.5 w-px bg-[#CDD2E8]" />
                  <input
                    id="phoneNumber"
                    ref={phoneRef}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    placeholder="10-digit number"
                    value={values.phoneNumber}
                    onChange={(e) => update('phoneNumber', e.target.value)}
                    aria-invalid={!!phoneError}
                    aria-describedby="phoneNumber-error"
                    className="text-navy h-full w-full border-none bg-transparent px-3 text-[16px] outline-none placeholder:text-[#9AA0BF] disabled:cursor-not-allowed"
                  />
                </div>
                <FieldError id="phoneNumber-error" message={phoneError} />
              </div>
            </div>

            <div className="mt-1">
              <FieldLabel htmlFor="message" required>
                How can we help?
              </FieldLabel>
              <textarea
                id="message"
                ref={messageRef}
                value={values.message}
                onChange={(e) => update('message', e.target.value)}
                aria-invalid={attempted && !!errors.message}
                aria-describedby="message-error"
                className={fieldClasses(attempted && !!errors.message, 'h-[148px] resize-y py-3')}
              />
              <FieldError id="message-error" message={attempted ? errors.message : undefined} />
            </div>

            {attempted && errorCount > 0 && status !== 'loading' && (
              <div role="alert" className={errorBanner}>
                Please check the {errorCount} highlighted fields above.
              </div>
            )}

            {status === 'error' && (
              <div role="alert" className={errorBanner}>
                We couldn&apos;t send your message. Please try again, or email us directly at{' '}
                <a
                  href="mailto:info@zapledge.com"
                  className={`font-semibold underline underline-offset-4 ${focusRing}`}
                >
                  info@zapledge.com
                </a>
                .
              </div>
            )}

            <p className="text-text-secondary mt-4 text-center text-[13px] sm:text-left">
              By contacting us, you agree to our{' '}
              <Link href="/terms" className={`text-accent rounded-sm underline-offset-4 hover:underline ${focusRing}`}>
                Terms of service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className={`text-accent rounded-sm underline-offset-4 hover:underline ${focusRing}`}>
                Privacy Policy
              </Link>
              .
            </p>

            <button
              type="submit"
              aria-busy={isLoading}
              className={`bg-cta-gradient mt-5 inline-flex h-[56px] w-full items-center justify-center gap-2 rounded-full text-[16px] font-semibold text-white transition-transform motion-safe:hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-8 ${focusRing}`}
            >
              {isLoading ? (
                <>
                  <SpinnerIcon className="h-5 w-5 motion-safe:animate-spin motion-reduce:[animation-duration:1.6s]" />
                  Sending…
                </>
              ) : status === 'error' ? (
                <>
                  Try again
                  <ArrowIcon className="h-4 w-4" />
                </>
              ) : (
                <>
                  Send message
                  <ArrowIcon className="h-4 w-4" />
                </>
              )}
            </button>
          </fieldset>
        </form>
      )}

      <div aria-live="polite" role="status" className="sr-only">
        {liveMessage}
      </div>
    </div>
  );
}
