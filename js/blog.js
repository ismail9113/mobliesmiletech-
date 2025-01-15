let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    if (index < 0) {
        slideIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
        slideIndex = 0;
    }

    const slideWidth = slides[0].clientWidth;
    const offset = -slideIndex * slideWidth;

    document.querySelector('.slider').style.transform = `translateX(${offset}px)`;
}

function prevSlide() {
    slideIndex--;
    showSlide(slideIndex);
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

// Automatic slide change (optional)
// setInterval(nextSlide, 3000); // Change slide every 3 seconds


// This adds some nice ellipsis to the description:
document.querySelectorAll(".projcard-description").forEach(function(box) {
	$clamp(box, {clamp: 6});
});
