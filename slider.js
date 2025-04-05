document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot');
    
    // Variables
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;
    const autoSlideDelay = 5000; // 5 seconds
    
    // Function to set the active slide
    function setActiveSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Update current slide index
        currentSlide = index;
    }
    
    // Function for next slide
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= totalSlides) {
            nextIndex = 0; // Loop back to first slide
        }
        setActiveSlide(nextIndex);
    }
    
    // Function for previous slide
    function prevSlide() {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = totalSlides - 1; // Loop to last slide
        }
        setActiveSlide(prevIndex);
    }
    
    // Set up auto sliding
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
    }
    
    function resetAutoSlideTimer() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlideTimer();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlideTimer();
    });
    
    // Add event listeners to dots
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-index'));
            setActiveSlide(slideIndex);
            resetAutoSlideTimer();
        });
    });
    
    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    const sliderContainer = document.querySelector('.hero-slider-container');
    
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        // Left swipe (to next slide)
        if (touchStartX - touchEndX > swipeThreshold) {
            nextSlide();
            resetAutoSlideTimer();
        }
        
        // Right swipe (to previous slide)
        if (touchEndX - touchStartX > swipeThreshold) {
            prevSlide();
            resetAutoSlideTimer();
        }
    }
    
    // Pause auto-sliding when user hovers over slider
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
    
    // Initialize the slider
    setActiveSlide(currentSlide);
    startAutoSlide();
});