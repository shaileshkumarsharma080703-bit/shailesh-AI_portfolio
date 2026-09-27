# Shailesh Sharma — Portfolio Website

A responsive portfolio website with a Gemini-powered "Ask About Me" assistant.

## Features

- Modern responsive design
- About, skills, education, project placeholders and contact sections
- Downloadable resume
- Gemini AI assistant
- API key stays on the Node.js server instead of being exposed in browser JavaScript

## 1. Install Node.js

Install Node.js 18+ if it is not already installed.

## 2. Install project packages

Open a terminal in this folder:

```bash
npm install
```

## 3. Create your Gemini API key in Google AI Studio

1. Open Google AI Studio.
2. Create/copy a Gemini API key.
3. Duplicate `.env.example` and rename the copy to `.env`.
4. Paste your API key:

```env
GEMINI_API_KEY=your_real_key_here
GEMINI_MODEL=gemini-3.8-flash
PORT=3000
```

Never upload `.env` to GitHub.

## 4. Run the website

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

## 5. Edit your project cards

Your uploaded resume did not list projects, so the Projects section contains editable placeholders instead of invented work.

Open:

```text
public/index.html
```

and replace the first two project cards with your real projects, links and technologies.

## Deploying

For a public deployment, use a host that can run a Node.js server and store environment variables securely. Add `GEMINI_API_KEY` as a server-side environment variable in your hosting dashboard.

Do not put the Gemini API key directly inside `public/app.js` or HTML.
