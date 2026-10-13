document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', event => {
    const targetId = anchor.getAttribute('href').slice(1);
    const target = targetId ? document.getElementById(targetId) : null;
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const availabilityForm = document.querySelector('.availability-form');
const formStatus = document.querySelector('.form-status');

if (availabilityForm && formStatus) {
  availabilityForm.addEventListener('submit', async event => {
    event.preventDefault();

    const submitButton = availabilityForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    formStatus.hidden = true;
    formStatus.className = 'form-status';
    formStatus.setAttribute('role', 'status');
    formStatus.textContent = 'Sending your request...';
    formStatus.hidden = false;

    try {
      const response = await fetch(availabilityForm.action, {
        method: 'POST',
        body: new FormData(availabilityForm),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}.`);
      }

      availabilityForm.hidden = true;
      formStatus.textContent = "Thank you! We'll check your area and get back to you shortly.";
      formStatus.classList.add('is-success');
      formStatus.hidden = false;
    } catch (error) {
      console.error('Availability form submission failed.', error);
      formStatus.textContent = 'We could not submit your request. Please check your connection and try again.';
      formStatus.classList.add('is-error');
      formStatus.setAttribute('role', 'alert');
      formStatus.hidden = false;
      submitButton.disabled = false;
    }
  });
}

if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
  console.error('GSAP and ScrollTrigger are required for the hero scroll animation.');
} else {
  gsap.registerPlugin(ScrollTrigger);

  gsap.matchMedia().add({
    isMobile: '(max-width: 768px)',
    isDesktop: '(min-width: 769px)'
  }, ({ conditions }) => {
    const isMobile = conditions.isMobile;
    const introTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: isMobile ? '+=450' : '+=650',
        scrub: 0.4,
        pin: true,
        anticipatePin: 1
      }
    });

    introTl.to('.hero-graphic-wrapper', {
      scale: isMobile ? 1.5 : 1.8,
      opacity: 0.18,
      duration: 1.2,
      ease: 'power2.inOut'
    }, 0);

    introTl.to('.logo-dynamic', {
      opacity: 1,
      pointerEvents: 'auto',
      ease: 'power2.out'
    }, 0.4);

    introTl.to('.nav-glass', {
      opacity: 1,
      y: 0,
      pointerEvents: 'auto',
      ease: 'power2.out'
    }, 0.5);

    introTl.from('.hero-content', {
      opacity: 0,
      y: 30,
      ease: 'power2.out'
    }, 0.6);

    gsap.utils.toArray('.reveal').forEach(element => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    });

    const nav = document.querySelector('.nav-glass');
    const navIndicator = nav.querySelector('.nav-indicator');
    const navLinks = [...nav.querySelectorAll('a')];
    let activeNavLink = null;

    const moveIndicator = (link, updateActiveLink = true) => {
      if (!link) {
        gsap.to(navIndicator, { opacity: 0, duration: 0.3 });
        return;
      }

      gsap.to(navIndicator, {
        left: link.offsetLeft,
        width: link.offsetWidth,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      });

      if (updateActiveLink) {
        activeNavLink = link;
        navLinks.forEach(navLink => navLink.classList.toggle('active', navLink === link));
      }
    };

    navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => moveIndicator(link, false));
      link.addEventListener('focus', () => moveIndicator(link, false));
    });

    const restoreActiveIndicator = () => moveIndicator(activeNavLink);
    nav.addEventListener('mouseleave', restoreActiveIndicator);
    nav.addEventListener('focusout', event => {
      if (!nav.contains(event.relatedTarget)) {
        restoreActiveIndicator();
      }
    });

    document.querySelectorAll('section[id], footer[id]').forEach(section => {
      const link = nav.querySelector(`a[href="#${section.id}"]`);
      if (!link) return;

      ScrollTrigger.create({
        trigger: section,
        start: 'top 85%',
        end: 'bottom 15%',
        onEnter: () => moveIndicator(link),
        onEnterBack: () => moveIndicator(link),
        onLeaveBack: () => {
          if (activeNavLink === link) {
            const precedingSection = [...document.querySelectorAll('section[id], footer[id]')]
              .filter(candidate => candidate !== section
                && candidate.getBoundingClientRect().top < section.getBoundingClientRect().top)
              .pop();
            activeNavLink = precedingSection
              ? nav.querySelector(`a[href="#${precedingSection.id}"]`)
              : null;
            navLinks.forEach(navLink => navLink.classList.toggle('active', navLink === activeNavLink));
            moveIndicator(activeNavLink, false);
          }
        }
      });
    });

    gsap.set(navIndicator, { opacity: 0 });
  });
}
