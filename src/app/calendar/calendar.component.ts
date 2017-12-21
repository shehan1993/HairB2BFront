import { Component, OnInit } from '@angular/core';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  



  years = [
    {value: 2017, viewValue: '2017'},
    {value: 2018, viewValue: '2018'},
    {value: 2019, viewValue: '2019'},
    {value: 2020, viewValue: '2020'},
    {value: 2021, viewValue: '2021'},
    {value: 2022, viewValue: '2022'},
    {value: 2023, viewValue: '2023'},
    {value: 2024, viewValue: '2024'},
    {value: 2025, viewValue: '2025'}
  ];
  
  months = [
    {value: 0, viewValue: 'January'},
    {value: 1, viewValue: 'February'},
    {value: 2, viewValue: 'March'},
    {value: 3, viewValue: 'April'},
    {value: 4, viewValue: 'May'},
    {value: 5, viewValue: 'June'},
    {value: 6, viewValue: 'July'},
    {value: 7, viewValue: 'August'},
    {value: 8, viewValue: 'September'},
    {value: 9, viewValue: 'October'},
    {value: 10, viewValue: 'November'},
    {value: 11, viewValue: 'December'},
    
  ];

  sevenDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

year:number;
month:number;
//here month is 0-11(jan=0,dec=11)

count = 0;
cal = function(){
this.count++;
  this.sevenDays[0] = this.year;

  
}   


calendarArray = [];

  daysInMonth = function (month,year) {
    return new Date(year, month+1, 0).getDate();    
  }

  

  calendar = function(){

    var busyDay = 5;

    var date = new Date(this.year,this.month,1);
    var day = date.getDay();
console.log(day);
    var lastMonthNoOfdays = this.daysInMonth(this.month-1,this.year); 
    var thisMonthNoOfdays = this.daysInMonth(this.month,this.year);     

    var j =0;
    for(var i=day;i>0;i--){
       this.calendarArray[j] = lastMonthNoOfdays-i+1;   
       j++;
       
       
    }

    for( i=0;i<thisMonthNoOfdays;i++){
      this.calendarArray[j] = i+1;   
      j++;

      //check and set state of the stylist(as busy)
      
      if(this.calendarArray[j] == busyDay){
        
      }

    }

    var remain = 1;
    while(j< 43){
      this.calendarArray[j] = remain;
      j++;
      remain++;
    }



}

//set the styles
//law prioroty for last month and previous month days 
setStylesUpper = function(value){
  //if(value > 20 || value< 15){
   
    value = this.calendarArray[value];
    if(value > 22){
    let styles = {
   'background-color':'#000000'    
   };
   return styles;
  };
     
}

setStylesDown = function(value){
  //if(value > 20 || value< 15){
   
    value = this.calenderArray[value];
    if(value <15){
    let styles = {
   'background-color':'#000000'    
   };
   return styles;
  };
   
  
}

setBusyStylist( day ){


}



  constructor() { 
    //get the last month last dates, to put present month first week   
    /** 
    var lastMonthNoOfdays = this.daysInMonth(this.month-1,this.year); 

    var thisMonthNoOfdays = this.daysInMonth(this.month,this.year); 
    console.log(thisMonthNoOfdays);
    var j =0;
     for(var i=this.day;i>0;i--){
        this.calenderArray[j] = lastMonthNoOfdays-i+1;   
        j++
     }

     for(var i=0;i<thisMonthNoOfdays;i++){
      this.calenderArray[j] = i+1;   
      j++;
   }

var remain = 1;
   while(j< 43){
     this.calenderArray[j] = remain;
     j++;
     remain++;
   }
**/

  }

  ngOnInit() {
    this.year = 2017;
    this.month = 1; 
this.calendar();
  }

 


 
 


}
