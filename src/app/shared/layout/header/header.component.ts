import {Component, HostListener, OnInit} from '@angular/core';
import ScrollReveal from "scrollreveal";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  resolutionAlert: string;
  screenHeight: number;
  screenWidth: number;
  isDisabled: boolean;

  ngOnInit() {
    this.getScreenSize();
    ScrollReveal().reveal('.header', {
      distance: '60px',
      easing: 'ease-in-out',
      origin: 'top',
      delay: 300
    });
  }
  constructor() {

  }
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.isDisabled = this.screenWidth > 1039;
    if(this.screenWidth > 1039 ){
      document.getElementById('menu__btn')?.classList.add('disabled')
      this.resolutionAlert = 'This option is not allowed for this resolution.'
    }
    else{
      this.resolutionAlert = '';
      document.getElementById('menu__btn')?.classList.remove('disabled')
    }
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event?: any) {
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(window.scrollY >= 50) header?.classList.add('scroll-header'); else header?.classList.remove('scroll-header')

    const articles: HTMLElement[] = [];
    articles.push(
      document.getElementById('home') as HTMLElement,
      document.getElementById('forecast') as HTMLElement,
      document.getElementById('wind') as HTMLElement,
      document.getElementById('precipitation') as HTMLElement,
      document.getElementById('sun-moon') as HTMLElement
    )
    const scrollY = window.scrollY
    const innerHeight = window.innerHeight
    const bodyOffsetHeight = document.body.offsetHeight
    articles.forEach(current  => {
      const articleHeight = current.offsetHeight,
        articleTop = current.offsetTop - 78,
        articleId = current.getAttribute('id');

      if(scrollY > articleTop && scrollY <= articleTop + articleHeight){
        let articleIdSunWidget = 'sun-moon'
        document.querySelector('.nav__menu a[href*=' + articleIdSunWidget + ']')?.classList.remove('active-link')
        document.querySelector('.nav__menu a[href*=' + articleId + ']')?.classList.add('active-link')
      }else{
        document.querySelector('.nav__menu a[href*=' + articleId + ']')?.classList.remove('active-link')
      }
      if((innerHeight + scrollY) >= bodyOffsetHeight){
        let articleIdSunWidget = 'sun-moon'
        let articleIdPrecipitationWidget = 'precipitation'
        document.querySelector('.nav__menu a[href*=' + articleIdPrecipitationWidget + ']')?.classList.remove('active-link')
        document.querySelector('.nav__menu a[href*=' + articleIdSunWidget + ']')?.classList.add('active-link')
      }
    })

  }
  test(){
    const navMenu = document.getElementById('nav-menu');
    const switchersIcons = document.querySelectorAll<HTMLTableElement>('.s-icon');
    Array.from(switchersIcons).forEach((el) => { el.style.display = 'none'});
    navMenu?.classList.add("show-menu");
  }
  closeMenu(){
    const navMenu = document.getElementById('nav-menu');
    const switchersIcons = document.querySelectorAll<HTMLTableElement>('.s-icon');
    Array.from(switchersIcons).forEach((el) => { el.style.display = 'flex'});
    navMenu?.classList.remove('show-menu');
  }
}
