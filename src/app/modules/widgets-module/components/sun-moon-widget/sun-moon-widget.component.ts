import { Component, OnInit } from '@angular/core';
import ScrollReveal from "scrollreveal";
import { PercentSignAddPipePipe } from 'src/app/core/pipes/percent-sign-add-pipe.pipe';
import {readDataFromObject} from "../../../../core/models/global-interfaces";
import {WeatherService} from "../../../../core/services/weather.service";
import {take} from "rxjs";

@Component({
  selector: 'app-sun-moon-widget',
  templateUrl: './sun-moon-widget.component.html',
  styleUrls: ['./sun-moon-widget.component.css']
})
export class SunMoonWidgetComponent implements OnInit {
  sunriseHour: string;
  sunsetHour: string;
  sunrise: Date = new Date();
  sunset: Date = new Date();
  actuallyTime: Date = new Date();
  midNightHourNight: Date = new Date();
  midNightHourDay: Date = new Date();
  advancedWeatherInfoObject: readDataFromObject;
  actuallyIdCity: string | null;


  constructor(private percentSignPipe: PercentSignAddPipePipe, private weatherService: WeatherService) { }

  ngOnInit(): void {
    // this.actuallyIdCity = this.weatherService.getCookie("cityId")
    // this.weatherService.cityId.subscribe(cityId => {
    //   if (cityId != this.actuallyIdCity) {
    //     this.getAdvancedWeatherInfo()
    //   }
    // })
    // this.getAdvancedWeatherInfo()
    this.midNightHourDay.setHours(0, 0, 0)
    this.midNightHourNight.setHours(24, 0, 0)
    ScrollReveal().reveal('.parameter__sun-moon', {
      distance: '60px',
      easing: 'ease-in-out',
      origin: 'bottom',
      delay: 300
    });

  }
  getAdvancedWeatherInfo(){
    setTimeout(()=>this.weatherService.getAdvancedWeatherInfo().pipe(take(1)).subscribe((res) => {
      console.log(res)
      this.advancedWeatherInfoObject = res.forecast[0];
      this.initializeSunriseAndSunsetHours()
      this.sunGraphStatusChanged()
    }), 7000)

  }
  initializeSunriseAndSunsetHours(){
    console.log(typeof this.advancedWeatherInfoObject.sunrise, typeof this.advancedWeatherInfoObject.sunset)
    this.sunriseHour = this.advancedWeatherInfoObject.sunrise
    this.sunsetHour = this.advancedWeatherInfoObject.sunset
    // @ts-ignore
    this.sunrise.setHours(this.sunriseHour[0] + this.sunriseHour[1], this.sunriseHour[3] + this.sunriseHour[4], this.sunriseHour[6] + this.sunriseHour[7])
    // @ts-ignore
    this.sunset.setHours(this.sunsetHour[0] + this.sunsetHour[1], this.sunsetHour[3] + this.sunsetHour[4], this.sunsetHour[6] + this.sunsetHour[7])
    let sunsetTime = this.sunset.getTime()
    let sunriseTime = this.sunrise.getTime()
    this.weatherService.setCookie("sunsetTime", String(sunsetTime), 30)
  }

  t(){
    console.log(this.actuallyTime.getTime() > this.sunrise.getTime() || this.actuallyTime.getTime() < this.sunset.getTime(), this.actuallyTime.getTime() < this.sunrise.getTime() || this.actuallyTime.getTime() > this.sunset.getTime(), this.actuallyTime.getTime(), this.sunset.getTime(), this.sunrise.getTime())
  }
  sunGraphStatusChanged(){
    let sunGraphMask = document.getElementById('sunGraphMask')
    let firstPoint = -83.165;
    let secondPoint = -46.86;
    let differenceBetweenFirstAndSecondPoint = secondPoint - firstPoint;
    if(this.actuallyTime.getTime() > this.sunrise.getTime() || this.actuallyTime.getTime() < this.sunset.getTime()) {
      let dayTime = (this.sunset.getTime() - this.sunrise.getTime()) / 60000;
      let partDayBeforeSunsetInPercents = ((this.actuallyTime.getTime() - this.sunrise.getTime()) / 60000) / dayTime * 100;
      let amountToAddToFirstPoint = firstPoint + ((differenceBetweenFirstAndSecondPoint * partDayBeforeSunsetInPercents) / 100);
      let timeToSunsetInPercents = 100 - partDayBeforeSunsetInPercents;
      let partToAddPerMinute = ((firstPoint * timeToSunsetInPercents) / 100) / (dayTime * (timeToSunsetInPercents / 100))
      // @ts-ignore
      sunGraphMask!.style.x = this.percentSignPipe.transform(amountToAddToFirstPoint);
      setInterval(() => {
        amountToAddToFirstPoint += partToAddPerMinute;
        // @ts-ignore
        sunGraphMask!.style.x = this.percentSignPipe.transform(amountToAddToFirstPoint);
      } ,60000)
    }
    if(this.actuallyTime.getTime() < this.sunrise.getTime() || this.actuallyTime.getTime() > this.sunset.getTime()){
      document.getElementById('moon-icon')?.style.setProperty('display', 'block')
      document.getElementById('Sun')?.style.setProperty('display', 'none')
      document.getElementById('Bg-path')?.style.setProperty('fill', 'purple')
      const points = document.querySelectorAll<HTMLTableElement>('.Points')
      Array.from(points).forEach((el) => { el.style.fill = '#6495ed'});
      if(this.actuallyTime <= this.midNightHourNight && this.actuallyTime > this.sunset){
        let nightTime = (this.midNightHourNight.getTime() - this.sunset.getTime()) / 60000;
        let partTimeBeforeMidNightInPercents = 50 - ((((this.midNightHourNight.getTime() - this.actuallyTime.getTime()) / 60000) / nightTime * 100) / 2)
        let setGraphStatus = firstPoint + ((differenceBetweenFirstAndSecondPoint * partTimeBeforeMidNightInPercents) / 100);
        let timeToMidNightInPercents = 50 - partTimeBeforeMidNightInPercents;
        let partAddPerMinute = ((firstPoint * timeToMidNightInPercents) / 100) / (nightTime * (timeToMidNightInPercents / 100)) / 2
        // @ts-ignore
        sunGraphMask!.style.x = this.percentSignPipe.transform(setGraphStatus);
        setInterval(() => {
          setGraphStatus += partAddPerMinute;
          // @ts-ignore
          sunGraphMask!.style.x = this.percentSignPipe.transform(setGraphStatus);
        } ,60000)
      }
      if(this.actuallyTime < this.sunrise){
        let nightTime = (this.sunrise.getTime() - this.midNightHourDay.getTime()) / 60000;
        let partTimeAfterMidNightInPercents = 50 - ((((this.midNightHourDay.getTime() - this.actuallyTime.getTime()) / 60000) / nightTime * 100) / 2)
        let setGraphStatus = firstPoint + ((differenceBetweenFirstAndSecondPoint * partTimeAfterMidNightInPercents) / 100);
        let timeToSunriseInPercents = 50 - partTimeAfterMidNightInPercents;
        let partAddPerMinute = ((firstPoint * timeToSunriseInPercents) / 100) / (nightTime * (timeToSunriseInPercents / 100)) / 2
        // @ts-ignore
        sunGraphMask!.style.x = this.percentSignPipe.transform(setGraphStatus);
        setInterval(() => {
          setGraphStatus += partAddPerMinute;
          // @ts-ignore
          sunGraphMask!.style.x = this.percentSignPipe.transform(setGraphStatus);
        } ,60000)
      }
    }
  }
}
