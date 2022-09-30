import { Component, DoCheck, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ErrorService } from 'src/app/core/services/error.service';
import {WeatherService} from "../../../../core/services/weather.service";

@Component({
  selector: 'app-scroll-up-theme-switcher',
  templateUrl: './scroll-up-theme-switcher.component.html',
  styleUrls: ['./scroll-up-theme-switcher.component.css']
})

export class ScrollUpThemeSwitcherComponent implements OnInit, DoCheck {
  nightModeStatus: boolean;
  optionStatus: string = "theme_1";
  actuallyTime: number;
  pageBody: HTMLElement | null;
  scrollUp: HTMLElement | null;
  styleSwitchersContainer: HTMLElement | null;
  isLoggedIn: boolean;

  constructor(private weatherService: WeatherService, private auth: AuthService, private errorService: ErrorService) { }

  ngDoCheck() {
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.scrollUp = document.getElementById('scroll-up');
    this.pageBody = document.getElementById('body');
    this.styleSwitchersContainer = document.querySelector('.style-switchers-container');
    this.weatherService.currentTime.subscribe((res) => {
      if(res){
        if(res[1] == ":"){
          this.actuallyTime = Number(res[0])
        }
        else if(Number(res[1]) < 10){
          this.actuallyTime = Number(res[0] + res[1])
          if(this.actuallyTime >= 18 || this.actuallyTime <= 6){
            this.pageBody!.style.backgroundImage = "url(../assets/photos/night-option.jpg)"
            this.nightModeStatus = false
          }
          else{
            this.pageBody!.style.backgroundImage = `url(../assets/photos/${this.optionStatus}.jpg)`
            this.nightModeStatus = true
          }
        }
      }
    })
  }

  @HostListener('window:scroll', ['$event'])
  showScrollUpArrow($event: any) {
    if(scrollY >= 490) this.scrollUp?.classList.add('show-scroll'); else this.scrollUp?.classList.remove('show-scroll')
    if(document.querySelector('.style-switchers-container')?.classList.contains("open")){
      document.querySelector('.style-switchers-container')?.classList.remove("open")
    }
  }

  scrollToStartWebsite(){
    window.scrollTo(0,0)
  }

  showHideThemeSwitcher(){
    this.styleSwitchersContainer?.classList.toggle('open')
  }

  changeDayStatusForBackground(){
    this.nightModeStatus =! this.nightModeStatus
    if(this.nightModeStatus && this.pageBody){
      this.pageBody.style.backgroundImage = `url(../assets/photos/${this.optionStatus}.jpg)`
    }
    else if(!this.nightModeStatus && this.pageBody){
      this.pageBody.style.backgroundImage = "url(../assets/photos/night-option.jpg)"
    }
  }

  changeBackgroundOption(className: string){
    if(className == "option-1"){
      this.pageBody!.style.backgroundImage = "url(../assets/photos/option-1.jpg)"
      this.optionStatus = "option-1"
      this.nightModeStatus = true
      document.querySelector('.style-switchers-container')?.classList.remove('open')
    }
    else if(className == "option-2"){
      this.pageBody!.style.backgroundImage = "url(../assets/photos/option-2.jpg)"
      this.optionStatus = "option-2"
      this.nightModeStatus = true
      document.querySelector('.style-switchers-container')?.classList.remove('open')
    }
    else if(className == "option-3"){
      this.pageBody!.style.backgroundImage = "url(../assets/photos/option-3.jpg)"
      this.optionStatus = "option-3"
      this.nightModeStatus = true
      document.querySelector('.style-switchers-container')?.classList.remove('open')
    }
    else if(className == "option-4"){
      this.pageBody!.style.backgroundImage = "url(../assets/photos/option-4.jpg)"
      this.optionStatus = "option-4"
      this.nightModeStatus = true
      document.querySelector('.style-switchers-container')?.classList.remove('open')
    }
    else if(className == "option-5"){
      this.pageBody!.style.backgroundImage = "url(../assets/photos/option-5.jpg)"
      this.optionStatus = "option-5"
      this.nightModeStatus = true
      document.querySelector('.style-switchers-container')?.classList.remove('open')
    }
    else if(className == "default-option"){
      this.pageBody!.style.backgroundImage = "url(../assets/photos/theme_1.jpg)"
      this.optionStatus = "theme_1"
      this.nightModeStatus = true
      document.querySelector('.style-switchers-container')?.classList.remove('open')
    }
  }

  showError(){
    this.errorService.setErrorStatusAndMessage("Login to use this function", false)
  }
}
