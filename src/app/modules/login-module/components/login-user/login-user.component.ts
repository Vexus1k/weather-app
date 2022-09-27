import {Component, HostListener, OnInit} from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import {UserService} from "src/app/core/services/user.service";
import ScrollReveal from "scrollreveal";

import {readDataFromObject, UserInfo} from "../../../../core/models/global-interfaces";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ErrorService} from "../../../../core/services/error.service";

declare var FB: any;

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css', "../../../../../../node_modules/angular-bootstrap-md/assets/scss/bootstrap/bootstrap.scss"]
})
export class LoginUserComponent implements OnInit {
  declineIconPath: string = '../../../../../assets/photos/decline-icon.svg';
  acceptIconPath: string = '../../../../../assets/photos/accept-icon.svg';
  editIconPath: string = '../../../../../assets/photos/edit-icon.svg';
  settingsIconPath: string = '../../../../../assets/photos/settings-icon.svg';
  avatarIconPath: string = '../../../../../assets/photos/developer-icon.svg';
  astronautIconPath: string = '../../../../../assets/photos/astronaut-icon.svg';
  builderIconPath: string = '../../../../../assets/photos/builder-icon.svg';
  developerIconPath: string = '../../../../../assets/photos/developer-icon.svg';
  businessmanIconPath: string = '../../../../../assets/photos/businessman-icon.svg';
  username: string | null;
  showMenu: boolean = false;
  userLogged: readDataFromObject;
  isLoggedIn: boolean;
  isEditMode: boolean = false;
  changeUsernameFormGroup: UntypedFormGroup;

  constructor(private errorService: ErrorService, private formBuilder: UntypedFormBuilder,
              private userService: UserService, private auth: AuthService)
  {
  }

  ngOnInit(): void {
    this.changeUsernameFormGroup = this.formBuilder.group({
      username: [this.auth.getUsername(), [Validators.required]]
    })
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
  changeAvatar(path: string, element: HTMLElement) {
    let menuIcons = document.querySelector(".menu__icons");
    let boxes: NodeListOf<HTMLElement> = document.querySelectorAll('.icon__choice-box')
    boxes.forEach(element => element.classList.remove('active__box'))
    this.avatarIconPath = path;
    element?.classList.add('active__box')
    menuIcons?.classList.remove('show')
    this.showMenu = false
  }
  changeUsername() {
    if(this.changeUsernameFormGroup.value.username == ''){
      console.log("dasdsad")
      this.errorService.setErrorStatusAndMessage('Enter the username.', false)
      return
    }
    let oldUsername: string = this.username!
    let username: string = this.changeUsernameFormGroup.value.username
    if(username == oldUsername){
      this.errorService.setErrorStatusAndMessage('Change username.', false)
      return
    }
    console.log(username, oldUsername)
    this.userService.changeUsername(username, oldUsername).subscribe( (res) => {
      if(res.condition){
        this.errorService.setErrorStatusAndMessage('Username changed.', true)
        this.auth.setUsername(this.changeUsernameFormGroup.controls['username'].value)
        this.username = this.changeUsernameFormGroup.controls['username'].value
        this.changeUsernameFormGroup.reset()
        this.isEditMode =! this.isEditMode
        return
      }
      this.errorService.setErrorStatusAndMessage('Something went wrong. Try again.', false)
    })

  }
  switchEditMode() {
    this.isEditMode =! this.isEditMode
    this.changeUsernameFormGroup.value.username = this.auth.getUsername()
    console.log(this.auth.getUsername())
  }

  singOut(): void {
    // this.authService.authState.subscribe((user) => {
    //   console.log(user);
    // });
  }
  logout() {
    // this.singOut()
    // FB.getLoginStatus((res:any)=>{
    //   if(res.status == 'connected'){
    //     FB.logout();
    //   }
    // });
    this.auth.logout()
  }
}
