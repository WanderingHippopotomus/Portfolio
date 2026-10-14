# Kushagra Shrivastava — portfolio

A single-page portfolio built with React, Vite and Tailwind CSS.

## Run it locally

```bash
npm install
npm run dev
```

Open the address it prints (usually http://localhost:5173).

## Change the content

Everything you read on the site lives in `src/data.js`: projects, chess results, skills, links.

To show your photo in the About section, save it as `public/photo.jpg`. Without it, the site shows your initials.

## Deploy to Vercel

**Option A: from GitHub (recommended)**

1. Create a new GitHub repository and push this folder to it.
2. Go to https://vercel.com/new and import the repository.
3. Vercel detects Vite automatically. Leave the defaults (build command `npm run build`, output `dist`) and click Deploy.

**Option B: from the command line**

```bash
npm install -g vercel
vercel
```

Run `vercel --prod` to publish to your production URL.

## Project structure

```
index.html            page shell, fonts, SEO tags
vercel.json           Vercel build settings
src/data.js           all site content
src/components/       Sidebar, Hero, Projects, About, Chess, Skills, Contact
tailwind.config.js    colors and fonts
```
