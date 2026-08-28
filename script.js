/* ==========================================================================
   CREATION OF ERAA — INTERACTIVITY & LOGIC (script.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
      
  /* 1. STICKY NAVBAR SCROLL STATE & ACTIVE LINK HIGHLIGHT */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section, footer');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link scroll spy
    let currentSectionId = 'home';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  /* 2. MOBILE DRAWER MENU */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const drawerClose = document.getElementById('drawer-close');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  /* 3. GALLERY FILTERING */
  const filterBtns = document.querySelectorAll('.tab-btn');
  const artCards = document.querySelectorAll('.art-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      artCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* 4. GALLERY LIGHTBOX MODAL & NAVIGATION */
  const lightbox = document.getElementById('lightbox');
  const lbClose = document.getElementById('lb-close');
  const lbPrev = document.getElementById('lb-prev');
  const lbNext = document.getElementById('lb-next');

  const lbImg = document.getElementById('lb-img');
  const lbTitle = document.getElementById('lb-title');
  const lbCat = document.getElementById('lb-cat');
  const lbMedium = document.getElementById('lb-medium');
  const lbSize = document.getElementById('lb-size');
  const lbDesc = document.getElementById('lb-desc');
  const lbPrice = document.getElementById('lb-price');
  const lbEnquireBtn = document.getElementById('lb-enquire-btn');

  let currentGalleryItems = Array.from(artCards);
  let currentIndex = 0;

  function updateLightbox(index) {
    currentIndex = index;
    const item = currentGalleryItems[currentIndex];
    
    lbImg.src = item.getAttribute('data-img');
    lbTitle.textContent = item.getAttribute('data-title');
    lbCat.textContent = item.getAttribute('data-category').toUpperCase();
    lbMedium.textContent = item.getAttribute('data-medium');
    lbSize.textContent = item.getAttribute('data-size');
    lbDesc.textContent = item.getAttribute('data-desc');
    lbPrice.textContent = item.getAttribute('data-price');
  }

  function openLightbox(index) {
    updateLightbox(index);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  artCards.forEach((card, idx) => {
    card.addEventListener('click', () => openLightbox(idx));
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  
  if (lbPrev) {
    lbPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      const prevIdx = (currentIndex - 1 + currentGalleryItems.length) % currentGalleryItems.length;
      updateLightbox(prevIdx);
    });
  }

  if (lbNext) {
    lbNext.addEventListener('click', (e) => {
      e.stopPropagation();
      const nextIdx = (currentIndex + 1) % currentGalleryItems.length;
      updateLightbox(nextIdx);
    });
  }

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && lbPrev) lbPrev.click();
    if (e.key === 'ArrowRight' && lbNext) lbNext.click();
  });

  if (lbEnquireBtn) {
    lbEnquireBtn.addEventListener('click', () => {
      const title = lbTitle.textContent;
      const price = lbPrice.textContent;
      closeLightbox();
      showToast(`Redirecting to enquire for "${title}" (${price})...`);
      setTimeout(() => {
        window.open(`https://wa.me/?text=Hi%20Annanya,%20I%20am%20interested%20in%20buying%20"${encodeURIComponent(title)}"%20listed%20for%20${encodeURIComponent(price)}.`, '_blank');
      }, 1200);
    });
  }

  /* 5. SHOP BUY BUTTONS */
  const shopBuyBtns = document.querySelectorAll('.shop-buy-btn');
  shopBuyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const product = btn.getAttribute('data-product');
      const price = btn.getAttribute('data-price');
      showToast(`Opening order enquiry for "${product}" (${price})`);
      setTimeout(() => {
        window.open(`https://wa.me/?text=Hi%20Annanya,%20I%20would%20like%20to%20order%20"${encodeURIComponent(product)}"%20for%20${encodeURIComponent(price)}.`, '_blank');
      }, 1200);
    });
  });

  /* 6. PROCESS VIDEO MODAL */
  const videoModal = document.getElementById('video-modal');
  const videoClose = document.getElementById('video-modal-close');
  const videoIframe = document.getElementById('video-iframe');
  const videoThumbs = document.querySelectorAll('.video-thumb-wrap');

  videoThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const src = thumb.getAttribute('data-video-src');
      if (videoIframe) videoIframe.src = src + '?autoplay=1';
      if (videoModal) videoModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (videoClose) {
    videoClose.addEventListener('click', () => {
      if (videoModal) videoModal.classList.remove('active');
      if (videoIframe) videoIframe.src = '';
      document.body.style.overflow = '';
    });
  }

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal && videoClose) {
        videoClose.click();
      }
    });
  }

  /* 7. FORM SUBMISSIONS & TOAST NOTIFICATION */
  const commForm = document.getElementById('commission-form');
  const contactForm = document.getElementById('contact-form');
  const toastMsg = document.getElementById('toast-msg');
  const toastText = document.getElementById('toast-text');

  function showToast(message) {
    if (!toastMsg || !toastText) return;
    toastText.textContent = message;
    toastMsg.classList.add('show');
    setTimeout(() => {
      toastMsg.classList.remove('show');
    }, 4000);
  }

  if (commForm) {
    commForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('comm-name').value;
      commForm.reset();
      showToast(`Thank you, ${name}! Your commission request has been received.`);
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      contactForm.reset();
      showToast(`Thank you, ${name}! Message sent successfully.`);
    });
  }

  /* 8. SCROLL REVEAL ANIMATION */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach(el => revealObserver.observe(el));
});
