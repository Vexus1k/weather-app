import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-up-theme-switcher',
  templateUrl: './scroll-up-theme-switcher.component.html',
  styleUrls: ['./scroll-up-theme-switcher.component.css']
})
export class ScrollUpThemeSwitcherComponent implements OnInit {
  darkStatus: boolean = true;
  optionStatus: string = "theme_1";
  constructor() { }

  ngOnInit(): void {
  }
  changeStatus(){
    const body = document.getElementById('body');
    this.darkStatus = !this.darkStatus
    if(this.darkStatus && body){
      body.style.backgroundImage = `url(../assets/photos/${this.optionStatus}.jpg)`
    }
    else if(!this.darkStatus && body){
      body.style.backgroundImage = "url(../assets/photos/night-option.jpg)"
    }
  }
  changeBg(className: string){
    const body = document.getElementById('body');
    if(body){
      if(className == "option-1"){
        body.style.backgroundImage = "url(../assets/photos/option-1.jpg)"
        this.optionStatus = "option-1"
        console.log("1")
      }
      else if(className == "option-2"){
        body.style.backgroundImage = "url(../assets/photos/option-2.jpg)"
        this.optionStatus = "option-2"
        console.log("2")
      }
      else if(className == "option-3"){
        body.style.backgroundImage = "url(../assets/photos/option-3.jpg)"
        this.optionStatus = "option-3"
        console.log("3")
      }
      else if(className == "option-4"){
        body.style.backgroundImage = "url(../assets/photos/option-4.jpg)"
        this.optionStatus = "option-4"
        console.log("4")
      }
      else if(className == "option-5"){
        body.style.backgroundImage = "url(../assets/photos/option-5.jpg)"
        this.optionStatus = "option-5"
        console.log("4")
      }
      else if(className == "default-option"){
        body.style.backgroundImage = "url(../assets/photos/theme_1.jpg)"
        this.optionStatus = "theme_1"
        console.log("4")
      }

    }
  }

}
