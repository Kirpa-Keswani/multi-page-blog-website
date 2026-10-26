# MyBlog:  Multi-Page Blog Website

**The Sky Gen | Web Development | Project 03 **
Ref: TSG/WD/P03/2026

A three-page blog website built with HTML5, CSS3 and Flexbox, with smooth animations and a little JavaScript for interactivity. The focus of the project is linking pages together and keeping the design consistent across all of them.

## Live Site

- **Live URL:** https://multiblogpage.netlify.app/
- **Repository:** https://github.com/Kirpa-Keswani/multi-page-blog-website.git
## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Animated hero, stats counters, topic marquee, feature cards, latest posts and a call to action |
| Blog | `blog.html` | Four different post types (meme, social media post, story, thread), each with a real cover photo, title, date and preview, plus filter buttons |
| Contact | `contact.html` | Styled form with live validation, contact details and a FAQ |

## Features

- Shared navigation bar with an animated active page indicator
- Identical header and footer on every page
- **One shared stylesheet** (`css/style.css`) used by all three pages
- Responsive layout with a mobile menu and no horizontal scrolling
- Colours and font defined once as CSS variables
- Animations: hero text reveal, rotating words, floating shapes, scroll reveal, hover effects, scroll progress bar, back-to-top button
- Respects `prefers-reduced-motion` for users who want less movement

## Folder Structure

```
tsg-webdev-p03-yourname/
├── index.html
├── blog.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   ├── hero.jpg
│   ├── post1.jpg
│   ├── post2.jpg
│   ├── post3.jpg
│   └── post4.jpg
└── README.md
```


## Technologies

HTML5, CSS3 (animations, Flexbox), vanilla JavaScript, Google Fonts, Font Awesome, VS Code, Git & GitHub, Netlify


## Note

The contact form validates input in the browser but does not send messages, as the brief does not require a backend.


