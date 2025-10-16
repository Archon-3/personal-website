# personal-website
It is all about my information work status and experience.

## Contact Form Setup

The contact form now uses **FormSubmit** - a simple, free service that sends form submissions directly to your email without requiring any backend code or SMTP configuration.

### How it works:
1. When someone fills out your contact form on `html/contact.html`, it submits directly to FormSubmit
2. FormSubmit receives the data and emails it to: **abebeabenezer808@gmail.com**
3. The user is redirected to `html/sent.html` showing a success message

### First-time setup (Important!):
**On the very first form submission**, FormSubmit will send a verification email to `abebeabenezer808@gmail.com`. You must:
1. Check your inbox for an email from FormSubmit
2. Click the activation link in that email
3. After activation, all future form submissions will be delivered automatically

### Features:
- ✅ No PHP or backend code needed
- ✅ Works locally and when hosted online
- ✅ Spam protection with honeypot field
- ✅ Clean table format for emails
- ✅ Custom success page

### To change the recipient email:
Edit the form action in `html/contact.html`:
```html
<form action="https://formsubmit.co/YOUR_EMAIL@gmail.com" method="POST">
```
