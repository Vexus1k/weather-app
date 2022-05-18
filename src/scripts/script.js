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
    sliderImages[0].style.display = "block";

    if(arrowLeft){
      arrowLeft.addEventListener("click", function() {
        if (current === 0) {
          current = sliderImages.length;
        }
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

function setup(){
  loadJSON("https://www.7timer.info/bin/astro.php?lon=19.2&lat=50.3&ac=0&unit=metric&output=json&tzshift=0", gotData)
}

function gotData(data){
  console.log(data)
}

function setSwitchesToSetWindSpeed(data) {
  switch (data)
  {
    case 1: return "Below 0.3m/s (calm)";
    case 2: return "0.3-3.4m/s (light)";
    case 3: return "3.4-8.0m/s (moderate)";
    case 4: return "8.0-10.8m/s (fresh)";
    case 5: return "10.8-17.2m/s (strong)";
    case 6: return "17.2-24.5m/s (gale)";
    case 7: return "24.5-32.6m/s (storm)";
    case 8: return "Over 32.6m/s (hurricane)";

  }
}

function setSwitchesToSetCloudy(data) {
  switch (data)
  {
    case 1: return "0%-6%";
    case 2: return "6%-19%";
    case 3: return "19%-31%";
    case 4: return "31%-44%";
    case 5: return "44%-56%";
    case 6: return "56%-69%";
    case 7: return "69%-81%";
    case 8: return "81%-94%";
    case 9: return "94%-100%";

  }
}
















