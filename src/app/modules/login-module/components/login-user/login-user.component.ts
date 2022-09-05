import {Component, HostListener, OnInit} from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import {UserService} from "src/app/core/services/user.service";
import ScrollReveal from "scrollreveal";

import {readDataFromObject, UserInfo} from "../../../../core/models/global-interfaces";
import {SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";

declare var FB: any;

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css', "../../../../../../node_modules/angular-bootstrap-md/assets/scss/bootstrap/bootstrap.scss"]
})
export class LoginUserComponent implements OnInit {
  editIconPath: string = '../../../../../assets/photos/edit-icon.svg';
  avatarIconPath: string = '../../../../../assets/photos/developer-icon.svg';
  astronautIconPath: string = '../../../../../assets/photos/astronaut-icon.svg';
  builderIconPath: string = '../../../../../assets/photos/builder-icon.svg';
  developerIconPath: string = '../../../../../assets/photos/developer-icon.svg';
  businessmanIconPath: string = '../../../../../assets/photos/businessman-icon.svg';
  username: string | null;
  showMenu: boolean = false;
  userLogged: readDataFromObject;
  isLoggedIn: boolean;

  constructor( private userService: UserService, private auth: AuthService,
              private authService: SocialAuthService)
  {

  }

  ngOnInit(): void {
    // this.authService.authState.subscribe((user) => {
    //   this.userLogged = user;
    //   this.isLoggedIn = user != null;
    // });

    // if(this.googleApi.isLoggedIn()){
    //   this.googleApi.userProfileSubject.subscribe( (info) => {
    //     setTimeout(()=>{this.userInfo = info.info; console.log(this.userInfo)},  5000)
    //
    //
    //   })
    // }


    // (window as any).fbAsyncInit = function() {
    //   FB.init({
    //     appId      : '2035970956791547',
    //     cookie     : true,
    //     xfbml      : true,
    //     version    : 'v3.1'
    //   });
    //   FB.AppEvents.logPageView();
    //
    // };
    // (function(d, s, id){
    //   var js, fjs = d.getElementsByTagName(s)[0];
    //   if (d.getElementById(id)) {return;}
    //   js = d.createElement(s); js.id = id;
    //   // @ts-ignore
    //   js.src = "https://connect.facebook.net/en_US/sdk.js";
    //   fjs.parentNode?.insertBefore(js, fjs);
    // }(document, 'script', 'facebook-jssdk'));
    console.log("123")
    this.username = this.auth.getUsername()
    console.log(localStorage.getItem('google_auth'))
  }
  showHideMenu() {
    let menuIcons = document.querySelector(".menu__icons");
    console.log(menuIcons)
    menuIcons?.classList.toggle('show')
    this.showMenu =! this.showMenu
  }
  changeAvatar(path: string, element: HTMLElement){
    let menuIcons = document.querySelector(".menu__icons");
    let boxes: NodeListOf<HTMLElement> = document.querySelectorAll('.icon__choice-box')
    boxes.forEach(element => element.classList.remove('active__box'))
    this.avatarIconPath = path;
    element?.classList.add('active__box')
    menuIcons?.classList.remove('show')
    this.showMenu = false
  }

  singOut(): void {
    this.authService.authState.subscribe((user) => {
      console.log(user);
    });
  }
  logout(){
    this.singOut()
    FB.getLoginStatus((res:any)=>{
      if(res.status == 'connected'){
        FB.logout();
      }
    });
    this.auth.logout()
  }
}
