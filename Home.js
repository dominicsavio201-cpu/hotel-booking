// Slideshow background functionality
  const images = [
    'images/image1.jpg',
    'images/image2.jpg',
    'images/image3.jpg',
    'images/image4.jpg',
    'images/image5.jpg'
  ];

  let currentIndex = 0;
  const slideshow = document.getElementById('slideshow');

  function showNextImage() {
    slideshow.style.backgroundImage = `url('${images[currentIndex]}')`;
    currentIndex = (currentIndex + 1) % images.length;
  }

  showNextImage();
  setInterval(showNextImage, 5000);

  // Booking form handling
  document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    alert(`Thank you, ${data.fullname}! Your booking for a ${data.roomtype} has been received.`);
    this.reset();
  });