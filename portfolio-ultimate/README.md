# Sujal Suresh Saptal — Portfolio Ultimate v3.0

The complete, feature-rich portfolio with all 19 enhancements.

## ✨ Features Included

| Feature | Status |
|---------|--------|
| 🎨 Custom Cursor (glowing dot + ring) | ✅ |
| 📊 Scroll Progress Bar | ✅ |
| ⏳ Animated Loading Screen | ✅ |
| 🌙 Dark / Light Mode Toggle | ✅ |
| ✨ Floating Particles (Hero) | ✅ |
| 📄 Resume Download Button | ✅ |
| 📈 GitHub Stats & Contribution Graph | ✅ |
| 💻 Coding Profiles (LeetCode, HackerRank, Kaggle) | ✅ |
| 🏆 Certifications Section | ✅ |
| 💬 Testimonials Section | ✅ |
| 🔢 Animated Stat Counters | ✅ |
| 💚 WhatsApp Floating Button | ✅ |
| 📧 Working Contact Form (with loading state) | ✅ |
| 🔗 All Clickable Links (email, phone, social) | ✅ |
| 🌈 Gradient Mesh Backgrounds | ✅ |
| 💎 Glassmorphism Cards | ✅ |
| 📱 Fully Responsive (mobile + desktop) | ✅ |
| 🔍 SEO Meta Tags | ✅ |
| ⬆️ Back to Top Button | ✅ |

## 🚀 Quick Start

```bash
npm install
npm run dev
# → http://localhost:5173
```

## 🌐 Deploy (Vercel — Free, ~2 min)

```bash
npm run build
npx vercel --prod
```

## 📧 Make Contact Form Actually Send Emails

Install EmailJS (free):
```bash
npm install @emailjs/browser
```

Replace the `send` function in Contact component:
```js
import emailjs from '@emailjs/browser'

const send = async (e) => {
  e.preventDefault()
  setSending(true)
  await emailjs.send(
    'YOUR_SERVICE_ID',    // from emailjs.com
    'YOUR_TEMPLATE_ID',   // from emailjs.com
    { name: form.name, email: form.email, subject: form.subject, message: form.message },
    'YOUR_PUBLIC_KEY'     // from emailjs.com
  )
  ss(true)
  setSending(false)
}
```

## 🖼️ Add Your Profile Photo

1. Drop `profile.jpg` into the `public/` folder
2. In `Hero()` inside `App.jsx`, find the comment:
   ```
   {/* Replace emoji with ... */}
   ```
3. Replace the emoji div with:
   ```jsx
   <img src="/profile.jpg" alt="Sujal"
     style={{ width:150, height:150, borderRadius:"50%",
               objectFit:"cover", position:"relative", zIndex:2 }} />
   ```

## 📄 Add Your Resume

Drop your `resume.pdf` into the `public/` folder.
The "Download Resume" button already points to `/resume.pdf`.

## 🎨 Customize

| What | Where in App.jsx |
|------|-----------------|
| Phone number | `CONTACT_LINKS` — `tel:+918010291863` |
| Email | `CONTACT_LINKS` — `mailto:saptalsujal041@gmail.com` |
| LinkedIn | `CONTACT_LINKS` array |
| Projects | `PROJECTS` array |
| Certifications | `CERTS` array |
| Testimonials | `TESTIMONIALS` array |
| Coding profiles | `CODING_PROFILES` array |
| Gradient colors | `src/index.css` → `--grad-main` |

## 📁 File Structure

```
portfolio-ultimate/
├── index.html          ← SEO meta + Google Fonts
├── vite.config.js
├── package.json
├── public/
│   ├── favicon.svg     ← Gradient S favicon
│   ├── resume.pdf      ← ADD YOUR RESUME HERE
│   └── profile.jpg     ← ADD YOUR PHOTO HERE
└── src/
    ├── main.jsx
    ├── index.css       ← All styles, animations, dark mode
    └── App.jsx         ← All components + data
```
