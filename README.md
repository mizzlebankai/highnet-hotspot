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

Before publishing, replace `YOUR_FORM_ID` in the availability form action with
your Formspree form ID. GSAP and ScrollTrigger are loaded from jsDelivr.
