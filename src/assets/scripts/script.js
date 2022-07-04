
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
function millisToMinutes(millis) {
  var minutes = millis / 60000;
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return (
    seconds == 60 ?
      minutes+1 :
      minutes
  );
}

const date = new Date();
const sunSetHour = date.setHours(6);
const sunOver = date.setHours(18);
const millisTimeConvertedToMinutes = millisToMinutes(sunOver - sunSetHour);
let firstPoint = -83.165;
let secondPoint = -46.86;
const differenceBetweenFirstAndSecondPoint = Math.abs(firstPoint - secondPoint);
const percentWhichIsAddedPerMinute = (differenceBetweenFirstAndSecondPoint / millisTimeConvertedToMinutes);


function tillBackground(){
  const element = document.getElementById('chuj');
  let actuallyTime = new Date().getTime();
  //SunSetSettings
  let timeSinceSunSetMillis = actuallyTime - sunSetHour;
  let timeSinceSunSetConvertedToMinutes = millisToMinutes(timeSinceSunSetMillis)
  let sunPositionInPercentsForGraph = (timeSinceSunSetConvertedToMinutes / millisTimeConvertedToMinutes) * 100
  let percentsForAddToSunGraph = (differenceBetweenFirstAndSecondPoint / 100) * sunPositionInPercentsForGraph
  let number = firstPoint + percentsForAddToSunGraph;
  //MoonSettings
  let timeSinceSunOverMillis = actuallyTime - sunOver;
  let timeSinceSunOverConvertedToMinutes = millisToMinutes(timeSinceSunOverMillis)
  let moonPositionInPercentsForGraph = (timeSinceSunOverConvertedToMinutes / millisTimeConvertedToMinutes) * 100
  let percentsForAddToMoonGraph = (differenceBetweenFirstAndSecondPoint / 100) * moonPositionInPercentsForGraph
  let number2 = firstPoint + percentsForAddToMoonGraph;

  if(actuallyTime >= sunSetHour && sunOver <= actuallyTime){
    element.style.x = (number) + '%'
    setInterval(function () {
      number += percentWhichIsAddedPerMinute
      element.style.x = (number) + '%'
      console.log('partAddedToTheGraph-Sun', number)
    }, 60000)
  }
  else{
    element.style.x = (number2) + '%'
    setInterval(function () {
      number2 += percentWhichIsAddedPerMinute
      element.style.x = (number2) + '%'
      console.log('partAddedToTheGraph-Moon', number2)
    }, 60000)
    document.getElementById('moon-icon').style.setProperty('display', 'block')
    document.getElementById('Sun').style.setProperty('display', 'none')
    document.getElementById('Bg-path').style.setProperty('fill', 'purple')

    const points = document.querySelectorAll('.Points')
    points[0].style.fill = '#6495ed'
    points[1].style.fill = '#6495ed'

  }
}

function scrollUp(){
  const scrollUp = document.getElementById('scroll-up');
  if(this.scrollY >= 490) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)


setTimeout(() => {
  const styleSwitcherToggle = document.querySelector(".settings-theme");
  if(styleSwitcherToggle){
    styleSwitcherToggle.addEventListener("click", () => {
      document.querySelector('.style-switchers-container').classList.toggle('open')
    })
  }
  window.addEventListener("scroll", () => {
    if(document.querySelector('.style-switchers-container').classList.contains("open")){
      document.querySelector('.style-switchers-container').classList.remove("open")
    }
  })

}, 100)






