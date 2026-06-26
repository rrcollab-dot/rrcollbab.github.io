document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.site-header');
  const navMenu = document.getElementById('navMenu');
  const toastElement = document.getElementById('contactToast');

  const toast =
    toastElement && window.bootstrap
      ? new bootstrap.Toast(toastElement, {
          delay: 2400
        })
      : null;

  document.body.classList.add('loaded');

  // Shrinks the navbar after scrolling.
  function updateHeader() {
    if (!header) {
      return;
    }

    header.classList.toggle(
      'scrolled',
      window.scrollY > 18
    );
  }

  updateHeader();

  window.addEventListener(
    'scroll',
    updateHeader,
    {
      passive: true
    }
  );

  // Reveals each section when it enters the screen.
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.13
    }
  );

  document
    .querySelectorAll('.fade-section')
    .forEach(function (section) {
      observer.observe(section);
    });

  // Closes the mobile navigation menu after selecting a link.
  document
    .querySelectorAll('#navMenu .nav-link')
    .forEach(function (link) {
      link.addEventListener('click', function () {
        if (
          navMenu &&
          navMenu.classList.contains('show') &&
          window.bootstrap
        ) {
          bootstrap.Collapse
            .getOrCreateInstance(navMenu)
            .hide();
        }
      });
    });

  // Typing animation inside the developer code window.
  const typingText =
    document.getElementById('typingText');

  const messages = [
    'npm run build',
    'building useful web systems',
    'connecting ideas to code',
    'deploying portfolio project'
  ];

  let messageIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    if (!typingText) {
      return;
    }

    const currentMessage =
      messages[messageIndex];

    if (!deleting) {
      typingText.textContent =
        currentMessage.slice(
          0,
          charIndex + 1
        );

      charIndex += 1;

      if (charIndex === currentMessage.length) {
        deleting = true;

        setTimeout(
          typeLoop,
          1500
        );

        return;
      }
    } else {
      typingText.textContent =
        currentMessage.slice(
          0,
          Math.max(0, charIndex - 1)
        );

      charIndex -= 1;

      if (charIndex === 0) {
        deleting = false;

        messageIndex =
          (messageIndex + 1) %
          messages.length;
      }
    }

    setTimeout(
      typeLoop,
      deleting ? 38 : 72
    );
  }

  setTimeout(
    typeLoop,
    850
  );

  // Opens the visitor's email application after form submission.
  const contactForm =
    document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener(
      'submit',
      function (event) {
        event.preventDefault();

        const name =
          document
            .getElementById('name')
            .value
            .trim();

        const email =
          document
            .getElementById('email')
            .value
            .trim();

        const message =
          document
            .getElementById('message')
            .value
            .trim();

        const subject =
          encodeURIComponent(
            'Portfolio inquiry from ' + name
          );

        const body =
          encodeURIComponent(
            'Name: ' +
              name +
              '\nEmail: ' +
              email +
              '\n\nMessage:\n' +
              message
          );

        const mailtoLink =
          'mailto:gaan0906@gmail.com?subject=' +
          subject +
          '&body=' +
          body;

        if (toast) {
          toast.show();
        }

        setTimeout(
          function () {
            window.location.href =
              mailtoLink;
          },
          350
        );
      }
    );
  }

  // Updates the footer year automatically.
  const currentYear =
    document.getElementById('currentYear');

  if (currentYear) {
    currentYear.textContent =
      new Date().getFullYear();
  }
});
