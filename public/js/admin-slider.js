// Simple admin JS — currently relies on Bootstrap's carousel
document.addEventListener('DOMContentLoaded', function () {
  const el = document.getElementById('adminCarousel');
  if (!el) return;
  // Expose control to console for quick testing
  const carousel = bootstrap.Carousel.getOrCreateInstance(el);
  window.adminCarousel = carousel;
});
