import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactEmail } from './ContactEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Contact Form <noreply@holidaykosh.com>',
      to: ['queries@holidaykosh.com'],
      subject: 'New Message from Contact Form',
      react: ContactEmail({ name, email, message }),
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
} 