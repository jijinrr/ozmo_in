/**
 * OZMO Digital - Modern IT Company Website JS Core
 * Premium UI/UX Interactions, Transitions, & Animations
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // CUSTOM CURSOR
  // ==========================================================================
  const cursor = document.getElementById('customCursor');
  const cursorDot = document.getElementById('customCursorDot');

  if (cursor && cursorDot) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;


      // ==========================================================================
      // AMBIENT AURORA & PARTICLE CANVAS BACKGROUND
      // ==========================================================================
      const initAmbientCanvas = () => {
        const canvas = document.getElementById('ambientCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        let mouse = { x: width / 2, y: height / 2 };

        window.addEventListener('resize', () => {
          width = canvas.width = window.innerWidth;
          height = canvas.height = window.innerHeight;
        });

        window.addEventListener('mousemove', (e) => {
          mouse.x = e.clientX;
          mouse.y = e.clientY;
        });

        // Particle nodes
        const particleCount = Math.min(Math.floor(width / 25), 45);
        const particles = [];

        class Particle {
          constructor() {
            this.reset();
          }

          reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.radius = Math.random() * 2 + 1;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.alpha = Math.random() * 0.5 + 0.2;
            this.color = Math.random() > 0.4 ? '#000000' : '#4b5563';
          }

          update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
          }

          draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }

        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle());
        }

        // Soft Subtle Background Orbs
        let time = 0;
        const animate = () => {
          ctx.clearRect(0, 0, width, height);
          time += 0.005;

          // Draw soft gradient background light orbs
          const orb1X = width * 0.3 + Math.sin(time) * 150;
          const orb1Y = height * 0.3 + Math.cos(time * 0.8) * 100;
          const grad1 = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, 450);
          grad1.addColorStop(0, 'rgba(0, 0, 0, 0.025)');
          grad1.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = grad1;
          ctx.globalAlpha = 1;
          ctx.fillRect(0, 0, width, height);

          const orb2X = width * 0.75 + Math.cos(time * 0.7) * 120;
          const orb2Y = height * 0.7 + Math.sin(time * 0.9) * 120;
          const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, 500);
          grad2.addColorStop(0, 'rgba(0, 0, 0, 0.025)');
          grad2.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = grad2;
          ctx.fillRect(0, 0, width, height);

          // Render particles & connection lines
          for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
              const dx = particles[i].x - particles[j].x;
              const dy = particles[i].y - particles[j].y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < 130) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = '#000000';
                ctx.globalAlpha = (1 - dist / 130) * 0.12;
                ctx.stroke();
              }
            }
          }

          requestAnimationFrame(animate);
        };

        animate();
      };

      initAmbientCanvas();

      // ==========================================================================
      // 3D TILT CARDS & MOUSE SPOTLIGHT TRACKING
      // ==========================================================================
      const init3DTiltCards = () => {
        const cards = document.querySelectorAll('.innovation-card');

        cards.forEach(card => {
          card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Spotlight CSS Variables
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Calculate 3D tilt
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
          });

          card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
          });
        });
      };

      init3DTiltCards();

      // ==========================================================================
      // INNOVATIONS TAB FILTER
      // ==========================================================================
      const initInnovationsFilter = () => {
        const filterBtns = document.querySelectorAll('.tech-filter-btn');
        const cards = document.querySelectorAll('.innovation-card');

        if (!filterBtns.length || !cards.length) return;

        filterBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            cards.forEach(card => {
              const category = card.getAttribute('data-category');
              if (filter === 'all' || category === filter) {
                card.classList.remove('hide');
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
              } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                  card.classList.add('hide');
                }, 300);
              }
            });
          });
        });
      };

      initInnovationsFilter();

      // ==========================================================================
      // LIVE INTERACTIVE VISUALIZERS
      // ==========================================================================
      const initInteractiveVisualizers = () => {
        // 1. Neural Node Graph Canvas Visualizer
        const nCanvas = document.getElementById('neuralCanvas');
        if (nCanvas) {
          const nCtx = nCanvas.getContext('2d');
          const nWidth = (nCanvas.width = nCanvas.parentElement.clientWidth || 300);
          const nHeight = (nCanvas.height = 100);

          const nodes = [
            { x: 30, y: 50 },
            { x: 100, y: 25 },
            { x: 100, y: 75 },
            { x: 180, y: 20 },
            { x: 180, y: 50 },
            { x: 180, y: 80 },
            { x: 260, y: 50 }
          ];

          const connections = [
            [0, 1], [0, 2],
            [1, 3], [1, 4], [2, 4], [2, 5],
            [3, 6], [4, 6], [5, 6]
          ];

          let pulseProgress = 0;

          const drawNeural = () => {
            nCtx.clearRect(0, 0, nWidth, nHeight);
            pulseProgress += 0.02;

            // Draw connections
            connections.forEach(([from, to]) => {
              const start = nodes[from];
              const end = nodes[to];

              nCtx.beginPath();
              nCtx.moveTo(start.x, start.y);
              nCtx.lineTo(end.x, end.y);
              nCtx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
              nCtx.lineWidth = 1.5;
              nCtx.stroke();

              // Animated pulse along line
              const pX = start.x + (end.x - start.x) * ((pulseProgress + from) % 1);
              const pY = start.y + (end.y - start.y) * ((pulseProgress + from) % 1);

              nCtx.beginPath();
              nCtx.arc(pX, pY, 2.5, 0, Math.PI * 2);
              nCtx.fillStyle = '#4b5563';
              nCtx.shadowBlur = 4;
              nCtx.shadowColor = 'rgba(0, 0, 0, 0.1)';
              nCtx.fill();
              nCtx.shadowBlur = 0;
            });

            // Draw nodes
            nodes.forEach(node => {
              nCtx.beginPath();
              nCtx.arc(node.x, node.y, 4, 0, Math.PI * 2);
              nCtx.fillStyle = '#000000';
              nCtx.fill();
            });

            requestAnimationFrame(drawNeural);
          };

          drawNeural();
        }

        // 2. Encryption Hash Generator
        const cipherHash = document.getElementById('cipherHash');
        if (cipherHash) {
          const hexChars = '0123456789ABCDEF';
          setInterval(() => {
            let hash = '0x';
            for (let i = 0; i < 4; i++) hash += hexChars[Math.floor(Math.random() * 16)];
            hash += '...';
            for (let i = 0; i < 4; i++) hash += hexChars[Math.floor(Math.random() * 16)];
            cipherHash.textContent = hash;
          }, 350);
        }

        // 3. Live CPU Load & Node Metrics
        const cpuLoad = document.getElementById('cpuLoad');
        const nodeCount = document.getElementById('nodeCount');
        if (cpuLoad) {
          setInterval(() => {
            const val = Math.floor(Math.random() * 12) + 14;
            cpuLoad.textContent = `${val}%`;
          }, 2000);
        }
      };

      initInteractiveVisualizers();

    });

    // Add scale/glow class on interactive elements hover
    const clickables = document.querySelectorAll('a, button, select, input, textarea, .logo-card, .portfolio-card, .accordion-header');
    clickables.forEach(elem => {
      elem.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
      });
      elem.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
      });
    });

    document.addEventListener('mousedown', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    document.addEventListener('mouseup', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  }

  // ==========================================================================
  // STICKY HEADER & SCROLL NAVIGATION ACTIVE LINKS
  // ==========================================================================
  const header = document.getElementById('mainHeader');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  const handleScroll = () => {
    // 1. Header scroll class toggle
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // 2. Navigation link active state highlight
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - varHeaderHeightOffset())) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  };

  const varHeaderHeightOffset = () => {
    return header ? header.offsetHeight + 100 : 150;
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger initial check

  // ==========================================================================
  // MOBILE HAMBURGER MENU
  // ==========================================================================
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuToggle && mobileMenu) {
    const toggleMenuState = () => {
      menuToggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');

      // Toggle scroll lock on body
      if (mobileMenu.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    menuToggle.addEventListener('click', toggleMenuState);

    // Close mobile nav when clicking on a link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('open')) {
          toggleMenuState();
        }
      });
    });
  }

  // ==========================================================================
  // LOGO MARQUEE DUPLICATION (Infinite scroll helper)
  // ==========================================================================
  const marqueeTrack = document.getElementById('marqueeTrack');
  if (marqueeTrack) {
    // Duplicate the logos in the DOM to ensure smooth infinite loop
    const logos = Array.from(marqueeTrack.children);
    logos.forEach(logo => {
      const clone = logo.cloneNode(true);
      marqueeTrack.appendChild(clone);
    });
  }

  // ==========================================================================
  // INTERSECTION OBSERVER FOR FADE-UP REVEAL ANIMATIONS
  // ==========================================================================
  const animatedElements = document.querySelectorAll('.reveal-fade-up');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => revealObserver.observe(el));

  // ==========================================================================
  // NUMERIC STATS COUNTER ANIMATION
  // ==========================================================================
  const statsSection = document.querySelector('.about-section');
  const statNumbers = document.querySelectorAll('.stat-number');
  let countersAnimated = false;

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const duration = 2000; // Animation duration in ms
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        // Easing function (Out Quad)
        const easeProgress = progress * (2 - progress);
        const currentValue = Math.floor(easeProgress * target);

        stat.textContent = currentValue;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = target; // Ensure exact final number
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  if (statsSection && statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          animateCounters();
          countersAnimated = true;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    statsObserver.observe(statsSection);
  }

  // ==========================================================================
  // PROCESS TIMELINE CONNECTING LINE HEIGHT LINKED TO SCROLL
  // ==========================================================================
  const processSection = document.querySelector('.process-section');
  const timelineProgress = document.getElementById('timelineProgress');
  const processSteps = document.querySelectorAll('.process-step');

  const animateTimelineProgress = () => {
    if (!processSection || !timelineProgress) return;

    const rect = processSection.getBoundingClientRect();
    const sectionHeight = rect.height;
    const viewHeight = window.innerHeight;

    // Calculate progress as section passes through viewport center
    const sectionTopFromMid = rect.top - (viewHeight / 2);
    const totalScrollingRange = sectionHeight - 200;

    let scrollProgress = -sectionTopFromMid / totalScrollingRange;
    scrollProgress = Math.max(0, Math.min(scrollProgress, 1)); // Clamp 0 to 1

    timelineProgress.style.height = `${scrollProgress * 100}%`;

    // Highlight timeline circles based on current step progression
    processSteps.forEach((step, idx) => {
      const stepRect = step.getBoundingClientRect();
      const stepMid = stepRect.top + (stepRect.height / 2);

      if (stepMid < (viewHeight / 2) + 100) {
        step.classList.add('active-step');
      } else {
        step.classList.remove('active-step');
      }
    });
  };

  window.addEventListener('scroll', animateTimelineProgress);

  // ==========================================================================
  // PORTFOLIO FILTER CATEGORIES
  // ==========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle Active Button styling
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
          const category = item.getAttribute('data-category');

          if (filterValue === 'all' || category === filterValue) {
            item.classList.remove('hidden');

            // Fade-in effect via scale and opacity transition helper
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';

            // Delay hiding node display to let fade out finish
            setTimeout(() => {
              item.classList.add('hidden');
            }, 300);
          }
        });
      });
    });
  }

  // ==========================================================================
  // TESTIMONIAL CAROUSEL
  // ==========================================================================
  const testimonialsWrapper = document.getElementById('testimonialsWrapper');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const dotsContainer = document.getElementById('sliderDots');

  let currentIndex = 0;
  let autoplayInterval;

  if (testimonialsWrapper && slides.length > 0) {
    // 1. Build slide navigation dots
    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        goToSlide(idx);
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    // 2. Go to slide function
    const goToSlide = (index) => {
      currentIndex = index;

      // Clamp index range
      if (currentIndex < 0) currentIndex = slides.length - 1;
      if (currentIndex >= slides.length) currentIndex = 0;

      // Slide translation
      testimonialsWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Update Active Slide class
      slides.forEach((slide, idx) => {
        slide.classList.remove('active');
        if (idx === currentIndex) slide.classList.add('active');
      });

      // Update Dot active class
      dots.forEach((dot, idx) => {
        dot.classList.remove('active');
        if (idx === currentIndex) dot.classList.add('active');
      });
    };

    // 3. Navigation arrows click triggers
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
      resetAutoplay();
    });

    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
      resetAutoplay();
    });

    // 4. Autoplay settings
    const startAutoplay = () => {
      autoplayInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 6000);
    };

    const resetAutoplay = () => {
      clearInterval(autoplayInterval);
      startAutoplay();
    };

    // Mobile Swipe/Touch support
    let startX = 0;
    let endX = 0;

    testimonialsWrapper.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    testimonialsWrapper.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (diff > 50) {
        // Swipe Left -> Next Slide
        goToSlide(currentIndex + 1);
        resetAutoplay();
      } else if (diff < -50) {
        // Swipe Right -> Prev Slide
        goToSlide(currentIndex - 1);
        resetAutoplay();
      }
    });

    startAutoplay();
  }

  // ==========================================================================
  // FAQ ACCORDION COLLAPSE
  // ==========================================================================
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      const item = header.closest('.accordion-item');
      const collapse = item.querySelector('.accordion-collapse');

      // Close other accordions
      accordionHeaders.forEach(otherHeader => {
        if (otherHeader !== header && otherHeader.getAttribute('aria-expanded') === 'true') {
          otherHeader.setAttribute('aria-expanded', 'false');
          const otherItem = otherHeader.closest('.accordion-item');
          const otherCollapse = otherItem.querySelector('.accordion-collapse');
          otherCollapse.style.maxHeight = '0px';
          otherCollapse.setAttribute('aria-hidden', 'true');
        }
      });

      // Toggle current accordion
      if (isExpanded) {
        header.setAttribute('aria-expanded', 'false');
        collapse.style.maxHeight = '0px';
        collapse.setAttribute('aria-hidden', 'true');
      } else {
        header.setAttribute('aria-expanded', 'true');
        collapse.style.maxHeight = `${collapse.scrollHeight}px`;
        collapse.setAttribute('aria-hidden', 'false');
      }
    });
  });

  // ==========================================================================
  // CONTACT FORM VALIDATION & MOCK SUBMIT
  // ==========================================================================
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const btnSpinner = document.getElementById('btnSpinner');
  const formSuccessBox = document.getElementById('formSuccessBox');

  const fields = [
    { id: 'contactName', errorId: 'nameError', check: (val) => val.trim().length > 0 },
    { id: 'contactEmail', errorId: 'emailError', check: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) },
    { id: 'contactProject', errorId: 'projectError', check: (val) => val !== '' },
    { id: 'contactMessage', errorId: 'messageError', check: (val) => val.trim().length >= 10 }
  ];

  if (contactForm) {
    // Validate individual fields on input/blur
    fields.forEach(field => {
      const input = document.getElementById(field.id);
      const errorMsg = document.getElementById(field.errorId);

      if (input && errorMsg) {
        const validate = () => {
          const isValid = field.check(input.value);
          const formGroup = input.closest('.form-group');

          if (!isValid) {
            formGroup.classList.add('invalid');
          } else {
            formGroup.classList.remove('invalid');
          }
          return isValid;
        };

        input.addEventListener('blur', validate);
        input.addEventListener('input', () => {
          // If already invalid, validate live on input to clear the state early
          if (input.closest('.form-group').classList.contains('invalid')) {
            validate();
          }
        });
      }
    });

    // Form Submit handling
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isFormValid = true;

      fields.forEach(field => {
        const input = document.getElementById(field.id);
        const errorMsg = document.getElementById(field.errorId);

        if (input && errorMsg) {
          const isValid = field.check(input.value);
          const formGroup = input.closest('.form-group');

          if (!isValid) {
            formGroup.classList.add('invalid');
            isFormValid = false;
          } else {
            formGroup.classList.remove('invalid');
          }
        }
      });

      if (isFormValid) {
        // Trigger Loading state
        submitBtn.disabled = true;
        btnSpinner.style.display = 'inline-block';
        submitBtn.childNodes[0].textContent = 'Transmitting... ';

        // Simulate secure server submission delay (1.8 seconds)
        setTimeout(() => {
          // Hide loading
          submitBtn.disabled = false;
          btnSpinner.style.display = 'none';
          submitBtn.childNodes[0].textContent = 'Send Message';

          // Show Success box
          formSuccessBox.style.display = 'flex';

          // Reset form fields
          contactForm.reset();

          // Auto hide success box after 7 seconds
          setTimeout(() => {
            formSuccessBox.style.display = 'none';
          }, 7000);

        }, 1800);
      }
    });
  }

  // ==========================================================================
  // NEWSLETTER FORM VALIDATION
  // ==========================================================================
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const newsletterStatus = document.getElementById('newsletterStatus');

  if (newsletterForm && newsletterEmail && newsletterStatus) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailVal = newsletterEmail.value.trim();
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);

      if (!isValid) {
        newsletterStatus.textContent = 'Please enter a valid email.';
        newsletterStatus.className = 'newsletter-status error';
        newsletterStatus.style.opacity = '1';

        setTimeout(() => { newsletterStatus.style.opacity = '0'; }, 3000);
      } else {
        // Mock successful registration
        newsletterStatus.textContent = 'Subscribed! Check your inbox.';
        newsletterStatus.className = 'newsletter-status success';
        newsletterStatus.style.opacity = '1';
        newsletterEmail.value = '';

        setTimeout(() => { newsletterStatus.style.opacity = '0'; }, 5000);
      }
    });
  }
  // ==========================================================================
  // NOVIINDUS REPLICA CARD STACKING EFFECT (SCALE & DIM)
  // ==========================================================================
  const stackCards = document.querySelectorAll('.novi-card');
  if (stackCards.length > 0) {
    const handleCardStack = () => {
      stackCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const nextCard = stackCards[index + 1];

        if (nextCard) {
          const nextRect = nextCard.getBoundingClientRect();
          // How far below is the next card relative to this card?
          const distance = nextRect.top - rect.top;
          const maxDistance = rect.height;

          const inner = card.querySelector('.novi-card-inner');
          if (!inner) return;

          if (distance < maxDistance && distance > 0) {
            // Next card is overlapping this card!
            const progress = 1 - (distance / maxDistance); // 0 (just touching) to 1 (fully covered)

            // Scale down from 1 to 0.95, and darken from 1 to 0.6
            const scale = 1 - (progress * 0.05);
            const brightness = 1 - (progress * 0.4);

            inner.style.transform = `scale(${scale})`;
            inner.style.filter = `brightness(${brightness})`;
            inner.style.transition = 'none'; // Real-time scroll update
          } else if (distance <= 0) {
            // Fully covered
            inner.style.transform = `scale(0.95)`;
            inner.style.filter = `brightness(0.6)`;
          } else {
            // Normal state
            inner.style.transform = `scale(1)`;
            inner.style.filter = `brightness(1)`;
            inner.style.transition = 'transform 0.2s ease-out, filter 0.2s ease-out';
          }
        }
      });
    };

    window.addEventListener('scroll', handleCardStack, { passive: true });
    handleCardStack(); // Initial check
  }

  // ==========================================================================
  // MARVELLOUX SCROLL REVEAL ANIMATION (Exact Replca)
  // ==========================================================================
  const marvCards = document.querySelectorAll('.marv-card');
  if (marvCards.length > 0) {
    const handleMarvScroll = () => {
      const viewHeight = window.innerHeight;

      marvCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();

        // Scrub start: Card enters viewport from bottom
        const start = viewHeight + 100; // Small buffer
        // Scrub end: Card is well within the viewport
        const end = viewHeight - Math.min(300, viewHeight * 0.3);

        let progress = (start - rect.top) / (start - end);
        progress = Math.max(0, Math.min(1, progress));

        const isLeft = index % 2 === 0;

        const opacity = progress;

        // Exact Marvelloux animation translation constraints
        // Max Offset: 250px, Max Rotation: 25deg
        const currentOffset = 250 * (1 - progress);

        const yOffset = currentOffset;
        const xOffset = isLeft ? -currentOffset : currentOffset;
        const zRot = isLeft ? -(currentOffset / 10) : (currentOffset / 10);

        card.style.willChange = 'opacity, transform';
        card.style.opacity = opacity;
        card.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(${zRot}deg) skew(0deg, 0deg)`;
        card.style.transformStyle = 'preserve-3d';
      });
    };

    window.addEventListener('scroll', handleMarvScroll, { passive: true });
    handleMarvScroll(); // Trigger initial check on load
  }

});

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // TEAM SPLIT CAROUSEL (ULTRA-LUXURY WITH COUNTER & PROGRESS)
  // ==========================================================================
  const teamTrack = document.getElementById('teamCarouselTrack');
  const teamPrevBtn = document.getElementById('prevTeamSlide');
  const teamNextBtn = document.getElementById('nextTeamSlide');
  const currentSlideEl = document.getElementById('teamCurrentSlide');
  const totalSlidesEl = document.getElementById('teamTotalSlides');
  const progressFillEl = document.getElementById('teamProgressFill');

  if (teamTrack && teamPrevBtn && teamNextBtn) {
    let isAnimating = false;
    let activeIndex = 1;
    const totalCards = teamTrack.children.length;

    if (totalSlidesEl) {
      totalSlidesEl.textContent = String(totalCards).padStart(2, '0');
    }

    const updateProgress = () => {
      if (currentSlideEl) {
        currentSlideEl.textContent = String(activeIndex).padStart(2, '0');
      }
      if (progressFillEl) {
        const percentage = (activeIndex / totalCards) * 100;
        progressFillEl.style.width = `${percentage}%`;
      }
    };

    updateProgress();

    teamNextBtn.addEventListener('click', () => {
      if (isAnimating) return;
      isAnimating = true;

      const firstCard = teamTrack.children[0];
      const gap = parseInt(window.getComputedStyle(teamTrack).gap) || 0;
      const shiftAmount = firstCard.offsetWidth + gap;

      activeIndex = activeIndex >= totalCards ? 1 : activeIndex + 1;
      updateProgress();

      teamTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
      teamTrack.style.transform = `translateX(-${shiftAmount}px)`;

      setTimeout(() => {
        teamTrack.style.transition = 'none';
        teamTrack.appendChild(firstCard);
        teamTrack.style.transform = 'translateX(0)';
        isAnimating = false;
      }, 600);
    });

    teamPrevBtn.addEventListener('click', () => {
      if (isAnimating) return;
      isAnimating = true;

      const lastCard = teamTrack.children[teamTrack.children.length - 1];
      const gap = parseInt(window.getComputedStyle(teamTrack).gap) || 0;
      const shiftAmount = lastCard.offsetWidth + gap;

      activeIndex = activeIndex <= 1 ? totalCards : activeIndex - 1;
      updateProgress();

      teamTrack.style.transition = 'none';
      teamTrack.prepend(lastCard);
      teamTrack.style.transform = `translateX(-${shiftAmount}px)`;

      // Force reflow
      void teamTrack.offsetWidth;

      teamTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
      teamTrack.style.transform = 'translateX(0)';

      setTimeout(() => {
        isAnimating = false;
      }, 600);
    });

    // Auto slide logic
    let autoSlideInterval = setInterval(() => {
      teamNextBtn.click();
    }, 4000);

    const teamSection = document.getElementById('team');
    if (teamSection) {
      teamSection.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
      teamSection.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
          teamNextBtn.click();
        }, 4000);
      });
    }
  }

  // Service Pills Selection Handler
  const servicePills = document.querySelectorAll('.service-pill');
  const projectInput = document.getElementById('contactProject');
  if (servicePills.length && projectInput) {
    servicePills.forEach(pill => {
      pill.addEventListener('click', () => {
        servicePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        projectInput.value = pill.getAttribute('data-value') || 'web';
      });
    });
  }

  // ==========================================
  // OZMO INTERACTIVE LOCATION HUB & CLOCK
  // ==========================================
  const officeData = {
    trivandrum: {
      statusText: 'TRIVANDRUM HQ • OPEN NOW',
      title: 'OZMO Global Headquarters & Innovation Hub',
      address: "Unicorn's Coworking Space, Trivandrum, Kerala • India",
      coords: '8.5058° N, 76.9084° E',
      mapUrl: "https://maps.google.com/?q=Unicorn's+Coworking+Space+Trivandrum",
      embedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d246.62083936115798!2d76.90840529309331!3d8.5058449181512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bdcd406d5789%3A0x6c9858263f1e2518!2sUnicorn's%20Coworking%20Space%20Trivandrum!5e0!3m2!1sen!2sin!4v1785677300194!5m2!1sen!2sin",
      timezone: 'Asia/Kolkata'
    }
  };

  let activeOfficeKey = 'trivandrum';

  const officeTabBtns = document.querySelectorAll('.office-tab-btn');
  const officeStatusText = document.getElementById('officeStatusText');
  const officeNameTitle = document.getElementById('officeNameTitle');
  const officeFullAddress = document.getElementById('officeFullAddress');
  const officeCoords = document.getElementById('officeCoords');
  const officeMapBtn = document.getElementById('officeMapBtn');
  const ozmoMapIframe = document.getElementById('ozmoMapIframe');
  const officeClock = document.getElementById('officeClock');

  function updateOfficeClock() {
    if (!officeClock) return;
    const tz = officeData[activeOfficeKey]?.timezone || 'Asia/Kolkata';
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const tzAbbr = tz === 'Asia/Kolkata' ? 'IST' : tz === 'America/Los_Angeles' ? 'PDT' : 'BST';
    officeClock.textContent = `${timeStr} ${tzAbbr}`;
  }

  if (officeTabBtns.length) {
    officeTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-office');
        if (!key || !officeData[key]) return;

        activeOfficeKey = key;
        officeTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const data = officeData[key];
        if (officeStatusText) officeStatusText.textContent = data.statusText;
        if (officeNameTitle) officeNameTitle.textContent = data.title;
        if (officeFullAddress) officeFullAddress.textContent = data.address;
        if (officeCoords) officeCoords.textContent = data.coords;
        if (officeMapBtn) officeMapBtn.href = data.mapUrl;
        if (ozmoMapIframe) {
          ozmoMapIframe.style.opacity = '0.3';
          setTimeout(() => {
            ozmoMapIframe.src = data.embedSrc;
            ozmoMapIframe.style.opacity = '1';
          }, 150);
        }
        updateOfficeClock();
      });
    });

    setInterval(updateOfficeClock, 1000);
    updateOfficeClock();
  }

  // Toast Alert Notification
  const toastEl = document.getElementById('ozmoToast');
  const toastMsg = document.getElementById('toastMsg');
  function showToast(message) {
    if (!toastEl || !toastMsg) return;
    toastMsg.textContent = message;
    toastEl.classList.add('show');
    setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2800);
  }

  // Copy buttons handler
  const copyBtns = document.querySelectorAll('.copy-quick-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard!`);
        }).catch(() => {
          showToast('Copied to clipboard!');
        });
      }
    });
  });

  // Schedule Call Modal Handler
  const openModalBtn = document.getElementById('openScheduleModalBtn');
  const closeModalBtn = document.getElementById('closeScheduleModalBtn');
  const scheduleModal = document.getElementById('scheduleModal');
  const confirmBookingBtn = document.getElementById('confirmBookingBtn');
  const bookingSuccessBox = document.getElementById('bookingSuccessBox');
  const timeSlotBtns = document.querySelectorAll('.time-slot-btn');

  if (openModalBtn && scheduleModal) {
    openModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      scheduleModal.classList.add('active');
    });
  }

  if (closeModalBtn && scheduleModal) {
    closeModalBtn.addEventListener('click', () => {
      scheduleModal.classList.remove('active');
    });
    scheduleModal.addEventListener('click', (e) => {
      if (e.target === scheduleModal) {
        scheduleModal.classList.remove('active');
      }
    });
  }

  timeSlotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timeSlotBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  if (confirmBookingBtn && bookingSuccessBox) {
    confirmBookingBtn.addEventListener('click', () => {
      confirmBookingBtn.style.opacity = '0.6';
      confirmBookingBtn.disabled = true;
      setTimeout(() => {
        confirmBookingBtn.style.display = 'none';
        bookingSuccessBox.style.display = 'flex';
        setTimeout(() => {
          if (scheduleModal) scheduleModal.classList.remove('active');
          setTimeout(() => {
            confirmBookingBtn.style.display = 'flex';
            confirmBookingBtn.style.opacity = '1';
            confirmBookingBtn.disabled = false;
            bookingSuccessBox.style.display = 'none';
          }, 500);
        }, 2500);
      }, 1200);
    });
  }

  // ==========================================
  // FOOTER KINETIC TEXT FALL observer & CLOCK
  // ==========================================
  const footerKineticBanner = document.getElementById('footerKineticBanner');
  if (footerKineticBanner) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          footerKineticBanner.classList.add('in-view');
        }
      });
    }, { threshold: 0.15 });
    observer.observe(footerKineticBanner);
  }

  const footerLiveClock = document.getElementById('footerLiveClock');
  function updateFooterClock() {
    if (!footerLiveClock) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    footerLiveClock.textContent = `${timeStr} IST`;
  }
  if (footerLiveClock) {
    updateFooterClock();
    setInterval(updateFooterClock, 1000);
  }

  const footerNewsletterForm = document.getElementById('footerNewsletterForm');
  if (footerNewsletterForm) {
    footerNewsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = footerNewsletterForm.querySelector('input[type="email"]');
      if (input && input.value.trim()) {
        showToast('Subscribed to OZMO Tech Digest!');
        input.value = '';
      }
    });
  }

  // ==========================================================================
  // NAVIGATION SMOOTH SCROLL & SCROLLSPY ACTIVE OBSERVER
  // ==========================================================================
  const allNavLinks = document.querySelectorAll('.cura-nav-link, .mobile-nav-link, a[href^="#"]');
  const mainHeader = document.getElementById('mainHeader');

  allNavLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#') && targetId.length > 1) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          e.preventDefault();

          // Close mobile menu if active
          const mobileMenu = document.getElementById('mobileMenu');
          const menuToggle = document.getElementById('menuToggle');
          if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
          }

          // Calculate header offset height
          const headerHeight = mainHeader ? mainHeader.offsetHeight : 80;
          const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
        }
      }
    });
  });

  // IntersectionObserver for Active Nav Link Highlighting on Scroll
  const pageSections = document.querySelectorAll('section[id]');
  const mainCuraNavLinks = document.querySelectorAll('.cura-nav-link');

  if (pageSections.length > 0 && mainCuraNavLinks.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -50% 0px',
      threshold: 0,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          mainCuraNavLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    pageSections.forEach((section) => sectionObserver.observe(section));
  }

  // ==========================================================================
  // FLOATING BACK TO TOP BUTTON LOGIC
  // ==========================================================================
  const backToTopBtn = document.getElementById('backToTopBtn');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
});
