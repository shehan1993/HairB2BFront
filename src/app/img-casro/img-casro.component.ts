import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-img-casro',
  templateUrl: './img-casro.component.html',
  styleUrls: ['./img-casro.component.css']
})
export class ImgCasroComponent implements OnInit {

  i=0;
  constructor() { 
   
    setInterval(() => { this.slideShow(); },3*1000);
  
  }

  ngOnInit() {
   
  }

  

 img1 =  "http://content2.latest-hairstyles.com/wp-content/uploads/2014/01/Messy-Medium-Hairstyle-with-Waves-500x333-1453233184-1.jpg";
 img2 = "https://i.pinimg.com/736x/74/b7/f3/74b7f3958733dee04557f830f944eeea--trendy-hairstyles-grad-hairstyles.jpg";

 imgArray = [this.img1,this.img2];
 numOfImg = this.imgArray.length;
 showImg = this.imgArray[0];


 slideShow = function(){
  if(this.i >= this.numOfImg){
    this.i = 0;
  }
  this.showImg = this.imgArray[this.i];  
  this.i++;
  
};
 

 


}
