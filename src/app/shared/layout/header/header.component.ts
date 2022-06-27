import {Component, HostListener, OnInit} from '@angular/core';
import ScrollReveal from "scrollreveal";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  screenHeight: number;
  screenWidth: number;
  isDisabled: boolean;

  ngOnInit() {
    ScrollReveal().reveal('.header', {
      distance: '60px',
      easing: 'ease-in-out',
      origin: 'top',
      delay: 300
    });
  }
  constructor() {
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.isDisabled = this.screenWidth > 1039;
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event?: any) {
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(window.scrollY >= 50) header?.classList.add('scroll-header'); else header?.classList.remove('scroll-header')

    const sections: HTMLElement[] = [];
    sections.push(
      document.getElementById('home') as HTMLElement,
      document.getElementById('forecast') as HTMLElement,
      document.getElementById('wind') as HTMLElement,
      document.getElementById('precipitation') as HTMLElement,
      document.getElementById('sun-moon') as HTMLElement
    )
    const scrollY = window.pageYOffset

    sections.forEach(current  => {
      const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 58,
        sectionId = current.getAttribute('id')

      if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
        document.querySelector('.nav__menu a[href*=' + sectionId + ']')?.classList.add('active-link')
      }else{
        document.querySelector('.nav__menu a[href*=' + sectionId + ']')?.classList.remove('active-link')
      }
    })
  }
  test(){
    const navMenu = document.getElementById('nav-menu');
    navMenu?.classList.add("show-menu")
  }
  closeMenu(){
    const navMenu = document.getElementById('nav-menu');
    navMenu?.classList.remove('show-menu')
  }
}
