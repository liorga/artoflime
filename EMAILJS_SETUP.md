# EmailJS Setup Guide for Art of Lime

## Quick Setup (5 minutes)

### 1. Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

### 2. Create Email Service

1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (or your preferred email provider)
4. Connect your Gmail account (artoflime17@gmail.com)
5. Copy the **Service ID** (e.g., "service_abc123")

### 3. Create Email Template

1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template content:

**Subject:** New Contact Form Submission - Art of Lime

**Email Body:**

```
Hello,

You have received a new contact form submission from your Art of Lime website:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Message:
{{message}}

---
This email was sent automatically from your website contact form.
```

4. Copy the **Template ID** (e.g., "template_xyz789")

### 4. Get Public Key

1. Go to "Account" in EmailJS dashboard
2. Find your **Public Key** (e.g., "user_abcdef123456")

### 5. Update Your Website

Open the file: `src/app/core/services/email.service.ts`

Replace these values in the `emailJSConfig`:

```typescript
private emailJSConfig = {
  serviceId: 'YOUR_SERVICE_ID_HERE',     // From step 2
  templateId: 'YOUR_TEMPLATE_ID_HERE',   // From step 3
  publicKey: 'YOUR_PUBLIC_KEY_HERE'      // From step 4
};
```

### 6. Test Your Setup

1. Build and deploy your website
2. Fill out the contact form
3. Check artoflime17@gmail.com for the email

## Template Variables Available:

- `{{from_name}}` - Contact person's name
- `{{from_email}}` - Contact person's email
- `{{phone}}` - Contact person's phone (optional)
- `{{message}}` - Their message
- `{{to_email}}` - Your email (artoflime17@gmail.com)
- `{{reply_to}}` - Set to contact person's email for easy replies

## Free Tier Limits:

- 200 emails per month
- No credit card required
- Perfect for small business websites

## Support:

If you need help, EmailJS has excellent documentation at: https://www.emailjs.com/docs/
