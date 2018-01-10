import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { HttpClient , HttpErrorResponse,HttpParams, HttpHeaders } from '@angular/common/http';
//import {DatesOFBusy} from './dates';
import {DateOFPendings} from '../dates';

import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import {DatesOFBusy} from '../dates';
// import { BDATES } from '../meta-Dates';

// import { PDATES } from '../meta-Dates';


export class datesofbusy{
  year:number;
  month:number;
  day:number;
  time:number;
  
  }


@Component({
  selector: 'app-calen',
  templateUrl: './calen.component.html',
  styleUrls: ['./calen.component.css']
})

export class CalenComponent implements OnInit {

userId;
    
BDATE: datesofbusy;
PDATE: datesofbusy;
BUSY =[];
PENDING = []
constructor(private activatedRoute: ActivatedRoute,private http:HttpClient) {

    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['id'];
     
   });
   

  
  }
  
    ngOnInit() {
          
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth() ; 
    this.today = new Date().getDate();
    this.calendar();

    this.http.get('http://localhost:54949/api/mark_as_busy/'+this.userId).subscribe(
      data =>{                 
  for(let key in data){
    if(data[key].type == 0){
       this.BUSY.push(data[key]);
    }else if(data[key].type == 1){
        this.PENDING.push(data[key]);
    }    
  }         
      }) 
    
    }

  //years in view
  years = [
    {value: 2016, viewValue: '2016'},
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
/**
 * these are relative
 * year is  calender viewing year
 * month is calender viewing month
 * but today is alway correct date 
 */

  year:number;
  month:number;
  today:number;

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
    
//console.log(this.datesOfBusy.length)
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

law prioroty for last month and previous month days.

if day is current month day or not, we have to check.
setStylesUpper() = set the styles for first week of month
**/

setStylesUpper = function(value){
   var slot:number = value%2;  

    var d = this.calenderArray[value];
    if(d > 22){
    let styles = {
   'background-color':' rgba(29, 27, 26, 0.76)' //black color    
   };
   return styles;
  };

  if(d >= 1 && d <= 7){
    return this.dayStaus(this.year,this.month,value,slot);
  }
     
}      

//law priority for next months

setStylesDown = function(value){
  var slot:number = value%2;  
  
    var d = this.calenderArray[value];
    if(d <15){
    let styles = {
   'background-color':' rgba(29, 27, 26, 0.76)'    
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

count = 0;
setStyle = function(value){
this.count++;
var slot:number = value%2;  
//this.setDayStatus();
return this.dayStaus(this.year,this.month,value,slot);  

}


//need set status of the day as busy day or as pending day 
datesOfBusy = [];
datesOfPend = [];
/** 
* busy days, or booked dates indicate in 'red' color,
* pending dates indicate in 'blue' color. 
*/
dayStaus = function(y,m,value,s){

 this.datesOfBusy = this.BUSY;
 this.datesOfPend = this.PENDING;

var d = this.calenderArray[value];
var lengthOfArray = this.datesOfBusy.length;
for(var i = 0;i< lengthOfArray;i++){

if(this.datesOfBusy[i].year == y && this.datesOfBusy[i].month-1 == m){

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
if(this.datesOfPend[i].year == y && this.datesOfPend[i].month-1 == m){

    if(this.datesOfPend[i].day == d && this.datesOfPend[i].time == s){
      let styles = {
        'background-color':'#132cbbec' //blue color   

        }; 
        return styles;
    }
  }
}

}



/**
 * salon can click past days and today for bookings, this 
 * bookings can be disable by disableButton() function
 * 
 * salon get view previous month and next month few dates or weeks
 * that dates can be disable by disableButton() function
 * 
 * if time slot is busy, need to disable it 
 */


disableButton = function(value){

  if(value < 14 && this.calenderArray[value] > 7){

    return true;
    
  }else if(value > 55 && this.calenderArray[value] < 15 ){

    return true;

  }else{

  var presentYear = new Date().getFullYear();
  var presentMonth = new Date().getMonth();
  
  if(this.year < presentYear){
    return true;
  }else if(this.year == presentYear){
    if( this.month < presentMonth){
      return true;
    }else if(this.month == presentMonth){
      if(this.calenderArray[value] <= this.today){
        return true;
      }
    }
  }
}


//this.datesOfPend = this.PENDING;
var d = this.calenderArray[value];
var lengthOfArray = this.BUSY.length;
var y = this.year;
var m = this.month;
var s = value%2;

for(var i = 0;i< lengthOfArray;i++){

if(this.BUSY[i].year == y && this.BUSY[i].month-1 == m){

   if(this.BUSY[i].day == d && this.BUSY[i].time == s){
   
       return true;
   }

 }
}


}



/**
 * salons can book the stylists by clicking on the day(morning slot or evening slot)
 * myBookings[] store the (year, month, day, time, slot) salons clicking 
 */

myBookings = [];
myStoreOfBooking = [];
numberOfBookings = 0;

selectedDate =  function(value){
  var bookingDescription;
  var timeSlot = (value % 2 == 0 ? "morning":"evening");
  
  bookingDescription = this.year + "/" +  this.months[this.month].viewValue + "/" + this.calenderArray[value] +" - " + timeSlot;
  if(this.myBookings.indexOf(bookingDescription) == -1 && this.numberOfBookings <=14 ){
this.myBookings[this.numberOfBookings] = bookingDescription;
this.numberOfBookings++;
  }
}


 remove = function(i){
 
  this.myBookings.splice(this.myBookings.indexOf(i), 1);
  this.numberOfBookings--;

 }


}
