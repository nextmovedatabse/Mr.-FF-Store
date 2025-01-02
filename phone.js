const images = [
    "https://i.ibb.co/2kk4JZ7/img1.jpg",
    "https://i.ibb.co/nMfyvfT/img2.jpg",
    "https://i.ibb.co/8YPVTrj/img3.jpg"
];
let currentIndex = 0;

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    document.getElementById("phoneImage").src = images[currentIndex];
}
