# Email Configuration

This project uses Resend for email notifications. Emails are sent for:
- Booking confirmation (when a booking is created)
- Payment confirmation (when a payment is successful)

## Setup

### 1. Get a Resend API Key

1. Go to [https://resend.com](https://resend.com)
2. Sign up for an account
3. Navigate to API Keys in your dashboard
4. Create a new API key
5. Copy the API key

### 2. Configure Environment Variables

Add your Resend API key to your `.env` file:

```env
RESEND_API_KEY="re_xxxxxxxxxxxxx"
```

For production, update your hosting platform's environment variables.

### 3. Verify Domain (Optional but Recommended)

For production, verify your domain in Resend to send emails from your own domain instead of the default `onboarding@resend.dev`.

1. Go to [https://resend.com/domains](https://resend.com/domains)
2. Add your domain (e.g., `h5creative.com`)
3. Add the DNS records provided by Resend to your domain's DNS settings
4. Wait for verification
5. Update the `from` field in email functions to use your verified domain

## Email Templates

### Booking Confirmation Email

Sent when a booking is successfully created. Contains:
- Booking code
- Package name
- Studio name
- Date and time
- Total price
- Link to view booking status

Location: `app/lib/email.ts` - `sendBookingConfirmationEmail()`

### Payment Confirmation Email

Sent when payment is successfully completed. Contains:
- Booking code
- Package name
- Studio name
- Date and time
- Total price
- Confirmation of successful payment
- Link to view booking details

Location: `app/lib/email.ts` - `sendPaymentConfirmationEmail()`

## API Endpoints

### Booking Creation with Email

`POST /api/bookings`

Creates a new booking and sends a confirmation email to the customer.

**Response:**
- Success: Email is sent automatically
- Failure: Booking still created, but email error is logged to console

### Payment Webhook with Email

`POST /api/payments/webhook`

Handles Midtrans payment notifications and sends payment confirmation emails for successful payments.

**Response:**
- Success: Email is sent for successful payments
- Failure: Payment still processed, but email error is logged to console

## Testing Email Locally

### 1. Start the development server

```bash
npm run dev
```

### 2. Test Booking Email

Make a booking through the application. Check your email (and spam folder) for the booking confirmation.

### 3. Test Payment Email

Complete a payment through Midtrans. The webhook will automatically send a payment confirmation email.

### 4. Check Logs

Email errors are logged to the console. If emails aren't being sent, check:
- RESEND_API_KEY is set correctly
- Network connectivity
- Resend API status
- Console logs for specific error messages

## Troubleshooting

### Email Not Sending

1. Check that `RESEND_API_KEY` is set in `.env`
2. Verify the API key is valid
3. Check console for error messages
4. Ensure Resend account is active and not over limits

### Email Going to Spam

1. Verify your domain in Resend
2. Use a verified domain instead of `onboarding@resend.dev`
3. Check your email content for spam triggers
4. Add your email address to contacts

### Rate Limits

Free Resend account:
- 3,000 emails per day
- 100 emails per hour

If you exceed limits:
1. Upgrade your Resend plan
2. Implement rate limiting in your application
3. Queue emails for later sending

## Production Considerations

1. **Domain Verification**: Always use a verified domain in production
2. **Error Handling**: Email failures don't block booking/payment completion
3. **Retry Logic**: Consider implementing email retry for failed sends
4. **Monitoring**: Track email delivery rates and failures
5. **Templates**: Consider using a transactional email service for better templates

## Customization

### Change Email Templates

Edit the HTML in `app/lib/email.ts`:

```typescript
html: `
  <!-- Your custom HTML here -->
`
```

### Change From Address

```typescript
from: "Your Name <noreply@yourdomain.com>",
```

### Add More Email Types

Create new functions in `app/lib/email.ts`:

```typescript
export async function sendCustomEmail(data: CustomEmailData) {
  const { error } = await resend.emails.send({
    from: "H5 Creative <noreply@yourdomain.com>",
    to: data.to,
    subject: "Custom Subject",
    html: `<div>Your HTML content</div>`,
  })
  // ...
}
```

## Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend API Reference](https://resend.com/docs/api-reference/emails/send-email)
- [Email Best Practices](https://resend.com/docs/emails/introduction)
