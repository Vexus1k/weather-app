import { Component, OnInit } from '@angular/core';


declare function startSlide(): void;
declare function setValues(): void;


@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit{
  ngOnInit(){
    setValues();
    startSlide();
  }
}

