const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("show");
});



// ========================================================

document.addEventListener("DOMContentLoaded", () => {
  const cardStack = document.getElementById("cardStack");
  const dots = document.querySelectorAll("#carouselDots .dot");
  let currentIndex = 0;
  const cards = cardStack.children;
  const total = cards.length;

  function showSlide(index) {
    for (let i = 0; i < total; i++) {
      cards[i].style.transform = `translate(-${30 * ((i - index + total) % total)}px, 0)`;
      cards[i].style.zIndex = total - ((i - index + total) % total);
    }
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % total;
    showSlide(currentIndex);
  }

  setInterval(nextSlide, 4000);

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentIndex = i;
      showSlide(currentIndex);
    });
  });

  showSlide(currentIndex);
});

// ========================================================
// Events Carousel - Infinite Scroll
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
  const eventsCarousel = document.getElementById("eventsCarousel");
  const prevBtn = document.getElementById("eventsPrev");
  const nextBtn = document.getElementById("eventsNext");
  
  if (!eventsCarousel) return;
  
  const slides = eventsCarousel.children;
  const totalSlides = slides.length;
  const slidesToShow = window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : 3;
  
  // Clone slides for infinite effect
  function cloneSlides() {
    // Clone first few slides and append to end
    for (let i = 0; i < slidesToShow; i++) {
      const clone = slides[i].cloneNode(true);
      eventsCarousel.appendChild(clone);
    }
    
    // Clone last few slides and prepend to beginning
    for (let i = totalSlides - slidesToShow; i < totalSlides; i++) {
      const clone = slides[i].cloneNode(true);
      eventsCarousel.insertBefore(clone, eventsCarousel.firstChild);
    }
  }
  
  cloneSlides();
  
  let currentPosition = totalSlides; // Start at the original first slide
  let isTransitioning = false;
  let autoSlideInterval;

  function updateCarousel(instant = false) {
    const slideWidth = 100 / slidesToShow;
    const translateX = -(currentPosition * slideWidth);
    
    if (instant) {
      eventsCarousel.style.transition = 'none';
    } else {
      eventsCarousel.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    eventsCarousel.style.transform = `translateX(${translateX}%)`;
  }

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    currentPosition++;
    updateCarousel();
    
    setTimeout(() => {
      // If we've reached the cloned slides at the end, reset to original slides
      if (currentPosition >= totalSlides + slidesToShow) {
        currentPosition = totalSlides;
        updateCarousel(true);
      }
      isTransitioning = false;
    }, 800);
  }

  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    currentPosition--;
    updateCarousel();
    
    setTimeout(() => {
      // If we've reached the cloned slides at the beginning, reset to original slides
      if (currentPosition < 0) {
        currentPosition = totalSlides - 1;
        updateCarousel(true);
      }
      isTransitioning = false;
    }, 800);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000); // Faster movement for infinite effect
  }

  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }
  }

  // Event listeners
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      stopAutoSlide();
      startAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      stopAutoSlide();
      startAutoSlide();
    });
  }

  // Pause on hover
  eventsCarousel.addEventListener("mouseenter", stopAutoSlide);
  eventsCarousel.addEventListener("mouseleave", startAutoSlide);

  // Handle window resize
  window.addEventListener("resize", () => {
    const newSlidesToShow = window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : 3;
    if (newSlidesToShow !== slidesToShow) {
      // Recreate carousel for new layout
      eventsCarousel.innerHTML = '';
      for (let i = 0; i < totalSlides; i++) {
        eventsCarousel.appendChild(slides[i]);
      }
      cloneSlides();
      currentPosition = totalSlides;
      updateCarousel(true);
    }
  });

  // Initialize
  updateCarousel(true);
  startAutoSlide();
});

// ========================================================
// Blogs Carousel
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
  const blogsCarousel = document.getElementById("blogsCarousel");
  const prevBtn = document.getElementById("blogPrev");
  const nextBtn = document.getElementById("blogNext");
  
  if (!blogsCarousel) return;
  
  const blogCards = blogsCarousel.children;
  const totalCards = blogCards.length;
  let currentIndex = 0;
  const cardsToShow = window.innerWidth <= 768 ? 1 : 3;
  let autoSlideInterval;

  function updateBlogsCarousel() {
    const cardWidth = 100 / cardsToShow;
    const translateX = -(currentIndex * cardWidth);
    blogsCarousel.style.transform = `translateX(${translateX}%)`;
  }

  function nextBlog() {
    currentIndex = (currentIndex + 1) % (totalCards - cardsToShow + 1);
    updateBlogsCarousel();
  }

  function prevBlog() {
    currentIndex = currentIndex === 0 ? (totalCards - cardsToShow) : currentIndex - 1;
    updateBlogsCarousel();
  }

  function startBlogAutoSlide() {
    autoSlideInterval = setInterval(nextBlog, 5000);
  }

  function stopBlogAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }
  }

  // Event listeners
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextBlog();
      stopBlogAutoSlide();
      startBlogAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevBlog();
      stopBlogAutoSlide();
      startBlogAutoSlide();
    });
  }

  // Pause on hover
  blogsCarousel.addEventListener("mouseenter", stopBlogAutoSlide);
  blogsCarousel.addEventListener("mouseleave", startBlogAutoSlide);

  // Handle window resize
  window.addEventListener("resize", () => {
    const newCardsToShow = window.innerWidth <= 768 ? 1 : 3;
    if (newCardsToShow !== cardsToShow) {
      currentIndex = 0;
      updateBlogsCarousel();
    }
  });

  // Initialize
  updateBlogsCarousel();
  startBlogAutoSlide();
});