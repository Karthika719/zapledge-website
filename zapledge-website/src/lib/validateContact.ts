export interface ContactFormInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export type ContactFieldErrors = Partial<
  Record<'firstName' | 'lastName' | 'email' | 'phoneNumber' | 'message', string>
>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Strips everything but digits so "6–14 digits" can be checked regardless of spacing/formatting. */
export function digitsOnly(value: string): string {
  return value.replace(/[^0-9]/g, '');
}

export function validateContactFields(values: ContactFormInput): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  if (!values.firstName.trim()) {
    errors.firstName = 'First name is required.';
  }

  if (!values.lastName.trim()) {
    errors.lastName = 'Last name is required.';
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  const phoneDigits = digitsOnly(values.phoneNumber);
  if (values.phoneNumber.trim() && (phoneDigits.length < 6 || phoneDigits.length > 14)) {
    errors.phoneNumber = 'Enter a valid phone number (6–14 digits).';
  }

  const message = values.message.trim();
  if (!message) {
    errors.message = 'Please tell us how we can help.';
  } else if (message.length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return errors;
}
