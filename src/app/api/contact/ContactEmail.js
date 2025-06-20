import React from 'react';

export const ContactEmail = ({ name, email, message }) => (
  <div>
    <h1>New Contact Form Submission</h1>
    <p>
      You have received a new message from your website contact form.
    </p>
    <ul>
      <li><strong>Name:</strong> {name}</li>
      <li><strong>Email:</strong> {email}</li>
    </ul>
    <h2>Message:</h2>
    <p>{message}</p>
  </div>
); 