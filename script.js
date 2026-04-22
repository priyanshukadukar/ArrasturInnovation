
 
    gsap.registerPlugin(ScrollTrigger);

    /* Lenis */
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    /* Color section animation */
    const colorSections = gsap.utils.toArray('.color-section');

    colorSections.forEach((sec) => {
      const bg = sec.getAttribute('data-bgcolor');
      const txt = sec.getAttribute('data-textcolor');

      ScrollTrigger.create({
        trigger: sec,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => gsap.to("body", { backgroundColor: bg, color: txt, duration: 0.8, overwrite: "auto" }),
        onEnterBack: () => gsap.to("body", { backgroundColor: bg, color: txt, duration: 0.8, overwrite: "auto" })
      });
    });

    /* Flying image setup */
    const flyingContainer = document.getElementById("flyingContainer");
    const imgStart = document.getElementById("imgStart");
    const imgTarget = document.getElementById("imgTarget");

    function getPageOffset(el) {
      const rect = el.getBoundingClientRect();
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      return {
        x: rect.left + scrollLeft,
        y: rect.top + scrollTop,
        width: rect.width,
        height: rect.height
      };
    }

    gsap.fromTo(flyingContainer,
      {
        x: () => getPageOffset(imgStart).x,
        y: () => getPageOffset(imgStart).y,
        width: () => getPageOffset(imgStart).width,
        height: () => getPageOffset(imgStart).height,
        borderRadius: 15
      },
      {
        scrollTrigger: {
          trigger: ".next-section",
          start: "top bottom",
          end: "top top",
          scrub: 1,
          invalidateOnRefresh: true
        },
        x: () => getPageOffset(imgTarget).x,
        y: () => getPageOffset(imgTarget).y,
        width: () => getPageOffset(imgTarget).width,
        height: () => getPageOffset(imgTarget).height,
        borderRadius: 20,
        ease: "none"
      }
    );

    gsap.to("#flipper", {
      rotateY: 180,
      scrollTrigger: {
        trigger: ".next-section",
        start: "top top",
        end: "center top",
        scrub: 1
      }
    });

    const cardVideo = document.getElementById("cardVideo");
    ScrollTrigger.create({
      trigger: ".next-section",
      start: "top bottom",
      end: "bottom top",
      onEnter: () => cardVideo.play(),
      onLeave: () => cardVideo.pause(),
      onEnterBack: () => cardVideo.play(),
      onLeaveBack: () => cardVideo.pause()
    });

    /* Section animations */
    gsap.from(".hero-content", {
      opacity: 0,
      y: 80,
      duration: 1.4,
      ease: "power4.out"
    });

    gsap.from("header", {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    gsap.from(".next-section .left", {
      scrollTrigger: {
        trigger: ".next-section",
        start: "top 80%",
        end: "top 40%",
        scrub: true
      },
      x: -200,
      opacity: 0
    });

    gsap.from(".section-header h1, .section-header .fade-text", {
      scrollTrigger: {
        trigger: ".services-section",
        start: "top 70%",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });

    gsap.utils.toArray(".service-card").forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        y: 80,
        opacity: 0,
        duration: 1,
        delay: i * 0.1,
        ease: "power3.out"
      });
    });

    gsap.from(".project-card", {
      scrollTrigger: {
        trigger: ".projects-section",
        start: "top 75%",
        toggleActions: "play none none reverse"
      },
      y: 60,
      opacity: 0,
      duration: 1
    });

    function animateProjectCards() {
      gsap.to(".single-project-card", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out"
      });
    }

    window.addEventListener("load", animateProjectCards);

    /* Trusted animations */
    window.addEventListener('DOMContentLoaded', () => {
      initAllAnimations();
      initCustomCursor();
    });

    function initAllAnimations() {
      gsap.fromTo('.section-number-animate',
        { opacity: 0, x: -40, rotationY: -90 },
        {
          opacity: 0.4,
          x: 0,
          rotationY: 0,
          duration: 1.2,
          ease: "back.out(0.6)",
          scrollTrigger: {
            trigger: '.section-number-animate',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      const headings = document.querySelectorAll('.reveal-text-heading');
      headings.forEach(heading => {
        const text = heading.innerText;
        heading.innerHTML = '';
        text.split('').forEach((char, i) => {
          const span = document.createElement('span');
          span.className = 'char';
          span.style.transitionDelay = `${i * 0.02}s`;
          span.textContent = char === ' ' ? '\u00A0' : char;
          heading.appendChild(span);
        });

        const chars = heading.querySelectorAll('.char');
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.015,
          ease: "back.out(0.7)",
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });

      const paragraphs = document.querySelectorAll('.reveal-text-paragraph');
      paragraphs.forEach(para => {
        gsap.fromTo(para,
          { opacity: 0, y: 40, filter: "blur(5px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: para,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      gsap.fromTo('.marquee-section',
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.marquee-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      const clients = document.querySelectorAll('.client-item');
      gsap.fromTo(clients,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.03,
          scrollTrigger: {
            trigger: '.marquee-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo('.contact-section',
        { opacity: 0, scale: 0.9, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "back.out(0.5)",
          scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo('footer',
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: 'footer',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    /* Custom cursor */
    function initCustomCursor() {
      const cursor = document.getElementById('customCursor');
      const hoverElements = document.querySelectorAll('a, button, .client-item, .contact-btn');

      if (window.innerWidth > 768 && cursor) {
        document.addEventListener('mousemove', (e) => {
          gsap.to(cursor, {
            duration: 0.1,
            left: e.clientX,
            top: e.clientY
          });
        });

        hoverElements.forEach(el => {
          el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
          el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
      }
    }

    /* Contact button */
    const contactBtn = document.getElementById('contactBtn');
    if (contactBtn) {
      contactBtn.addEventListener('click', () => {
        gsap.to(contactBtn, {
          scale: 0.95,
          duration: 0.15,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        });
        alert("Thank you for your interest! We'll get back to you soon.");
      });
    }

    /* Projects */
    const projects = {
      "3d": {
        title: "3D Website Projects",
        links: [
          {
            name: "3D Project 1",
            desc: "This is a 3D website project.",
            url: "https://your-3d-project1.com"
          },
          {
            name: "3D Project 2",
            desc: "This is another 3D website project.",
            url: "https://your-3d-project2.com"
          }
        ]
      },
      normal: {
        title: "Normal Website Projects",
        links: [
          {
            name: "Website Project 1",
            desc: "This is a normal website project.",
            url: "https://your-normal-project1.com"
          },
          {
            name: "Website Project 2",
            desc: "This is another normal website project.",
            url: "https://your-normal-project2.com"
          }
        ]
      },
      app: {
        title: "Application Projects",
        links: [
          {
            name: "App Project 1",
            desc: "This is an application project.",
            url: "https://your-app-project1.com"
          },
          {
            name: "App Project 2",
            desc: "This is another application project.",
            url: "https://your-app-project2.com"
          }
        ]
      }
    };

    function showProjects(type, button) {
      document.getElementById("card-title").textContent = projects[type].title;

      const linksContainer = document.getElementById("project-links");
      linksContainer.innerHTML = "";

      projects[type].links.forEach(project => {
        const card = document.createElement("div");
        card.classList.add("single-project-card");

        card.innerHTML = `
          <h4>${project.name}</h4>
          <p>${project.desc}</p>
          <a href="${project.url}" target="_blank">View Project</a>
        `;

        linksContainer.appendChild(card);
      });

      document.querySelectorAll(".project-btn").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      animateProjectCards();
    }

    /* Header color / background animation */
    ScrollTrigger.create({
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        if (self.scroll() > 50) {
          gsap.to("#siteHeader", {
            background: "rgba(10, 20, 40, 0.35)",
            duration: 0.3
          });
        } else {
          gsap.to("#siteHeader", {
            background: "rgba(255,255,255,0.08)",
            duration: 0.3
          });
        }
      }
    });

    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
    });



    gsap.from(".contact-form-intro, .contact-form", {
  scrollTrigger: {
    trigger: ".contact-form-section",
    start: "top 80%",
    toggleActions: "play none none reverse"
  },
  y: 60,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out"
});
  