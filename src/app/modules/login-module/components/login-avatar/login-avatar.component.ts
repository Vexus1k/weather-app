import {Component, HostListener, OnInit} from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import {UserService} from "src/app/core/services/user.service";
import ScrollReveal from "scrollreveal";

@Component({
  selector: 'app-login-avatar',
  templateUrl: './login-avatar.component.html',
  styleUrls: ['./login-avatar.component.css', "../../../../../../node_modules/angular-bootstrap-md/assets/scss/bootstrap/bootstrap.scss"]
})
export class LoginAvatarComponent implements OnInit {
  editIconPath: string = '../../../../../assets/photos/edit-icon.svg';
  avatarIconPath: string = '../../../../../assets/photos/developer-icon.svg';
  astronautIconPath: string = '../../../../../assets/photos/astronaut-icon.svg';
  builderIconPath: string = '../../../../../assets/photos/builder-icon.svg';
  developerIconPath: string = '../../../../../assets/photos/developer-icon.svg';
  businessmanIconPath: string = '../../../../../assets/photos/businessman-icon.svg';
  username: string;
  iconChoiceBoxes: NodeListOf<HTMLElement>

  constructor(private userService: UserService, private auth: AuthService) {

  }

  ngOnInit(): void {
    this.userService.usernameCurrentlyLoginUser.subscribe((res: string) => this.username = res)
    if(this.username){
      console.log(this.username)
    }

  }
  showHideMenu() {
    let menuIcons = document.querySelector(".menu__icons");
    console.log(menuIcons)
    menuIcons?.classList.toggle('show')
  }
  changeAvatar(path: string, element: HTMLElement){
    let menuIcons = document.querySelector(".menu__icons");
    let boxes: NodeListOf<HTMLElement> = document.querySelectorAll('.icon__choice-box')
    boxes.forEach(element => element.classList.remove('active__box'))
    this.avatarIconPath = path;
    element?.classList.add('active__box')
    menuIcons?.classList.remove('show')
  }
  logout(){
    this.auth.logout()
  }
}
