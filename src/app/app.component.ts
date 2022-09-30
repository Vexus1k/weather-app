import {
  Component,
  OnInit
} from '@angular/core';
import SwiperCore, {EffectCube, Navigation, Pagination, Mousewheel} from "swiper";
import Swiper, {Autoplay} from "swiper";
import ScrollReveal from "scrollreveal";
import { ErrorService } from './core/services/error.service';
import {NavigationEnd, Router} from "@angular/router";
// install Swiper modules
SwiperCore.use([EffectCube, Mousewheel, Pagination]);
Swiper.use([Autoplay, Navigation]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  messageSuccess: string;
  messageError: string;
  success: boolean;
  error: boolean;
  sub: any;

  constructor( private errorService: ErrorService, private router: Router){
    router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          const element = document.querySelector("#" + tree.fragment);
          if (element) { element.scrollIntoView(); }
        }
      }
    });
  }

  ngOnInit() {
    this.errorService.errorStatusAndMessage.subscribe( (res: {message: string, status: any}) => {
      if(res.status === true){
        this.messageSuccess = res.message;
        this.success = res.status;
        setTimeout(() => {
          this.success = false
        }, 2500)
      }
      else if(res.status === false){
        this.messageError = res.message;
        this.error = true;
        setTimeout(() =>  {
          this.error = false
        }, 2500)
      }
    });
    ScrollReveal().reveal('#login__article', {
      delay: 300,
      scale: 1.4,
      origin: "left",
      distance: "60px"
    });
    ScrollReveal().reveal('.widgets', {
      scale: 0.85,
      easing: 'ease-in',
    });
  }
}









