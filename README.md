# Highnet WiFi

Responsive landing page for the Highnet WiFi hotspot service.

## Structure

- `index.html` — landing page content and availability form
- `css/styles.css` — responsive page styles
- `js/main.js` — smooth scrolling, pinned GSAP hero intro, and scroll-triggered section reveals
- `assets/images/highnetlogo.svg` — site logo
- `assets/images/feature-network.jpg` and `assets/images/feature-reliability.jpg` — About section photography
- `assets/images/favicons/` — browser and Apple touch icons

## Run locally

Serve this directory with the VS Code Live Server extension, or run `npx serve .`
from this directory and open the local URL it prints.

## Deploy to Netlify

This is a static site and does not require a build command. The included
`netlify.toml` publishes the project root.

To deploy from GitHub:

1. Import `mizzlebankai/highnet-hotspot` in Netlify.
2. Select the `main` branch.
3. Leave the build command empty and use `.` as the publish directory.
4. Deploy the site. Netlify will use these settings from `netlify.toml`.

The availability form posts directly to Formspree, and GSAP, ScrollTrigger, and
Bootstrap Icons are loaded from their CDNs.
