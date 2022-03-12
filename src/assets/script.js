let sliderImages = [];
let arrowLeft;
let arrowRight;
let current;

function setValues(){
    sliderImages = document.querySelectorAll('.slide');
    arrowLeft = document.querySelector('#arrow-left');
    arrowRight = document.querySelector('#arrow-right');
    current = 0;
}
// Clear all images
function reset() {
  for (let i = 0; i < sliderImages.length; i++) {
    sliderImages[i].style.display = "none";
  }
}
// Init slider and add events for buttons
function startSlide() {
    reset();
    console.log(sliderImages)
    sliderImages[0].style.display = "block";

    if(arrowLeft){
      arrowLeft.addEventListener("click", function() {
        if (current === 0) {
          current = sliderImages.length;
          console.log("1")
        }
        console.log("1")
        slideLeft();

      });
    }
  if (arrowRight) {
    arrowRight.addEventListener("click", function () {
      if (current === sliderImages.length - 1) {
        current = -1;
      }
      slideRight();
    });
  }

}


// Show prev
function slideLeft() {
  reset();
  sliderImages[current - 1].style.display = "block";
  current--;
}

// Show next
function slideRight() {
  reset();
  sliderImages[current + 1].style.display = "block";
  current++;
}


















