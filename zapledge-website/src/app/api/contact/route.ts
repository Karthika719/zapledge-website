import { NextResponse } from 'next/server';
import { validateContactFields } from '@/lib/validateContact';

interface ContactRequestBody {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  phoneCountry?: unknown;
  phoneNumber?: unknown;
  message?: unknown;
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

export async function POST(request: Request) {
  let body: ContactRequestBody;
  try {
    body = (await request.json()) as ContactRequestBody;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const values = {
    firstName: asString(body.firstName),
    lastName: asString(body.lastName),
    email: asString(body.email),
    phoneNumber: asString(body.phoneNumber),
    message: asString(body.message),
  };
  const phoneCountry = asString(body.phoneCountry);

  const errors = validateContactFields(values);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  // TODO: send this submission to an email/CRM provider (e.g. Resend, SendGrid, HubSpot),
  // reading credentials from environment variables. For now the submission is only
  // validated and acknowledged — nothing is emailed or persisted yet.
  console.log('Contact form submission received', {
    ...values,
    phone: values.phoneNumber ? `${phoneCountry} ${values.phoneNumber}` : null,
  });

  return NextResponse.json({ ok: true });
}
