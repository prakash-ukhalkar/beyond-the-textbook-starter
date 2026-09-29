# Beyond the Textbook: Starter Repository

<p>
  <img alt="Author" src="https://img.shields.io/badge/Author-Prakash%20Ukhalkar-0B2E59?style=flat-square&logo=github&logoColor=white">
  <img alt="Repo" src="https://img.shields.io/badge/Repo-beyond--textbook--starter-0B5FBF?style=flat-square&logo=github&logoColor=white">
  <img alt="Audience" src="https://img.shields.io/badge/Audience-12th%20Standard-00B4D8?style=flat-square">
  <a href="LICENSE"><img alt="License" src="https://img.shields.io/badge/License-MIT-5B6B7C?style=flat-square"></a>
</p>
<p>
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white">
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black">
  <img alt="Formspree" src="https://img.shields.io/badge/Formspree-forms-8B5CF6?style=flat-square">
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-database%20%26%20auth-3ECF8E?style=flat-square&logo=supabase&logoColor=white">
  <img alt="GitHub Pages" src="https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-181717?style=flat-square&logo=github&logoColor=white">
</p>

Sample code and step-by-step guides from the **Beyond the Textbook** web development workshop for 12th standard students.

Workshop led by **[Prakash Ukhalkar](https://github.com/prakash-ukhalkar)** — Educator · Mentor · Machine Learning, AI & Innovation · Pimpri Chinchwad College of Engineering, Pune.

## What's inside

```
beyond-the-textbook-starter/
├── index.html                      Home page that links to all examples
├── presentation/
│   └── Beyond the Textbook          Workshop slides
├── examples/
│   ├── 01-portfolio/               Personal portfolio (HTML + CSS)
│   ├── 02-formspree-contact/       Contact form that emails you (Formspree)
│   └── 03-supabase-guestbook/      Guestbook that saves messages (Supabase)
│       └── admin.html              Admin panel to review/delete messages (Supabase Auth)
└── guides/
    ├── 01 Portfolio Page Guide
    ├── 02 Formspree Contact Form Guide
    ├── 03 Supabase Guestbook Guide
    ├── 04 GitHub Pages Publishing Guide
    └── 05 Google Sites and Wix Guide
```

*Guides are Word documents; the presentation is a PowerPoint slide deck.*

## Quick start

1. Click the green **Code** button, then **Download ZIP**, and unzip it.
2. Open any `examples/.../index.html` file in Chrome or Edge to see it.
3. Open the matching guide in `guides/` and follow the steps.
4. Edit the code in [VS Code](https://code.visualstudio.com) and refresh the browser to see your changes.

| Example | Needs an account? | What you must change |
|---|---|---|
| 01 Portfolio | No | Your name, text, and project details |
| 02 Formspree contact form | Free [Formspree](https://formspree.io) account | `YOUR_FORM_ID` in `index.html` |
| 03 Supabase guestbook | Free [Supabase](https://supabase.com) account | `SUPABASE_URL` and `SUPABASE_KEY` in `app.js` **and** `admin.js`, and run `setup.sql` |

The guestbook's `admin.html` page lets you review and delete messages. It's protected by Supabase Auth — create an admin login under **Authentication → Users** in your Supabase dashboard first (see `setup.sql` for the matching delete policy).

## Publish your site

Follow **Guide 04** to put your site online for free with [GitHub Pages](https://pages.github.com).
Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

## Safety rules

- The Supabase **publishable** key (`sb_publishable_...`) is safe in a web page. The **secret** key (`sb_secret_...`) or `service_role` key must never go in your code or on GitHub.
- Keep Row Level Security **on** for every Supabase table.
- Never paste passwords into your code or into an AI chat.

## Useful links

- Learn: [MDN Web Docs](https://developer.mozilla.org) · [freeCodeCamp](https://www.freecodecamp.org) · [W3Schools](https://www.w3schools.com)
- Practise: [CodePen](https://codepen.io)
- Check your site: [PageSpeed Insights](https://pagespeed.web.dev)
- Docs: [Formspree help](https://help.formspree.io) · [Supabase docs](https://supabase.com/docs) · [GitHub Pages docs](https://docs.github.com/pages)

## License

Released under the [MIT License](LICENSE) — free to use, modify, and share for teaching and learning.

---

<div align="center">

**Prakash Ukhalkar**
Educator · Mentor · Machine Learning, AI & Innovation · Research Outreach
Pimpri Chinchwad College of Engineering, Pune

[GitHub](https://github.com/prakash-ukhalkar) · [Website](https://prakash-ukhalkar.github.io) · [LinkedIn](https://www.linkedin.com/in/prakash-ukhalkar)

© 2026 · Beyond the Textbook Workshop · Built for 12th standard students

</div>
