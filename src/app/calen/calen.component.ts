import { Component, OnInit } from '@angular/core';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import {DatesOFBusy} from '../dates';
import { BDATES } from '../meta-Dates';
import { PDATES } from '../meta-Dates';

@Component({
  selector: 'app-calen',
  templateUrl: './calen.component.html',
  styleUrls: ['./calen.component.css']
})
export class CalenComponent implements OnInit {

  //years in view
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

//month in view
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

  //Days in view
  sevenDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  year:number;
  month:number;

/*0-41 days array (6 weeks in month with privious month last week and next month first week)
*all days have two slots morning and evening
*calender array length should be 82
*/
  calenderArray = [];
  
//return numbers of dates in a month  
    daysInMonth = function (month,year) {
      return new Date(year, month+1, 0).getDate();    
    }
  
/*
*generate calendarArray according user arguments year and month
*in calendar array ,calendarAray[value] ,if value%2 == 0 then morning slot othervise evening slot  
*/
calendar = function(){
      
          var date = new Date(this.year,this.month,1);
          var day = date.getDay();
     
          var lastMonthNoOfdays = this.daysInMonth(this.month-1,this.year); 
          var thisMonthNoOfdays = this.daysInMonth(this.month,this.year);     
      
          var j =0;
          for(var i=day;i>0;i--){
             this.calenderArray[j] = lastMonthNoOfdays-i+1;
             this.calenderArray[j+1] =  this.calenderArray[j];  
             j += 2;
                          
          }
      
          for( i=0;i<thisMonthNoOfdays;i++){
            this.calenderArray[j] = i+1;
            this.calenderArray[j+1] =  this.calenderArray[j];     
            j += 2;
               
          }
      
          var remain = 1;
          while(j< 84){
            this.calenderArray[j] = remain;
            this.calenderArray[j+1] =  this.calenderArray[j];  
            j +=2;
            remain++;
          }      
      
      }  
  
/**      
need to give diffrent identity to different dates

law prioroty for last month and previous month days 
if day is current month day or not, we have to check.
setStylesUpper() = set the styles for first week of month
**/

setStylesUpper = function(value){
   var slot:number = value%2;  

    value = this.calenderArray[value];
    if(value > 22){
    let styles = {
   'background-color':'#000000'//black color    
   };
   return styles;
  };


  if(value >= 1 && value <= 7){
    return this.dayStaus(this.year,this.month,value,slot);
  }
     
}      

//law priority for next months

setStylesDown = function(value){
  var slot:number = value%2;  
  
    value = this.calenderArray[value];
    if(value <15){
    let styles = {
   'background-color':'#000000'    
   };
   return styles;
  }else{
    return this.dayStaus(this.year,this.month,value,slot);
  }  
}

/*
status for middle three[weeks:1,2,3] (weeks define as [0->5])
get need dates from calender

setStyle() function call from .html
**/
setStyle = function(value){
  var slot:number = value%2;  
  value = this.calenderArray[value];
  return this.dayStaus(this.year,this.month,value,slot);

}


//need set status of the day as busy day or as pending day 
datesOfBusy = BDATES;
datesOfPend = PDATES;

/*
busy days, or booked dates indicate in 'red' color,
pending dates indicate in 'blue' color. 
*/
dayStaus = function(y,m,d,s){
var lengthOfArray = this.datesOfBusy.length

for(var i = 0;i< lengthOfArray;i++){
if(this.datesOfBusy[i].year == y && this.datesOfBusy[i].month == m){
  

    if(this.datesOfBusy[i].day == d && this.datesOfBusy[i].time == s){
      let styles = {
        'background-color':'#ff0000ea' //red color   
        }; 
        return styles;
    }
 
  }
}


var lengthOfArray = this.datesOfPend.length
for(var i =0;i< lengthOfArray;i++){
if(this.datesOfPend[i].year == y && this.datesOfPend[i].month == m){

    if(this.datesOfPend[i].day == d && this.datesOfBusy[i].time == s){
      let styles = {
        'background-color':'#132cbbec' //blue color   
        }; 
        return styles;
    }
  }
}

}

/**
 * salons can book the stylists by clicking on the  day(morning slot or evening slot)
 * myBookings[] store the (year, month, day, time, slot) salons cliking 
 */

myBookings = [];
numberOfBookings = 0;

selectedDate =  function(value){
  var bookingDescription;
  var timeSlot = (value % 2 == 0?"morning":"evening");
  
  bookingDescription = "I want to book: " + this.year + " " +  this.months[this.month].viewValue + " " + this.calenderArray[value] +" - " + timeSlot;
this.myBookings[this.numberOfBookings] = bookingDescription;
this.numberOfBookings++;
}

  constructor() { }

  ngOnInit() {
    
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth() ; 
    this.calendar();
  }

}
