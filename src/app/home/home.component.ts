import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { HttpClient , HttpErrorResponse,HttpParams, HttpHeaders } from '@angular/common/http'

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {Http} from '@angular/http'


export class User {
  constructor(public name: string) { }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
 
  constructor(private http:HttpClient) { }
  searchString = "type the stylist name for search";

  myControl: FormControl = new FormControl();
    
    options = [];
    options_id = [];
   
    stylists = [];
    stylist_details = [];    
    filteredOptions: Observable<string[]>;
  
    ngOnInit() {
      //search bar
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(val => this.filter(val))
        );

//all the names and ids fro database
        this.http.get('http://localhost:54949/api/get_stylists_name').subscribe(
          data =>{
                       
          for(let key in data){
            
             if(parseInt(key)%2 ==0 ){         
               this.options.push(data[key]);

             }else{
              this.options_id.push(data[key]);
             }
           
           }
            
          })
     
//add few stylist to beginig of the page
        this.http.get('http://localhost:54949/api/getStylistsProfileDetails').subscribe(
          data =>{
        
            for(let key in data){
             
              this.stylist_details.push(data[key]);
              this.store.push(data[key]);
            }
          }
        )  


//getting skils of the stylists to advance search
this.http.get('http://localhost:54949/api/getSkills').subscribe(
  data =>{

    for(let key in data){
    this.skills.push({ value:data[key].id,viewValue:data[key].skill});
      
    }
    this.skills.push({ value:1000 ,viewValue:"All"});
  }
)}
  

    //filter for search bar 
    filter(val: string): string[] {
      return this.options.filter(option =>
        option.toLowerCase().indexOf(val.toLowerCase()) === 0);
     // return this.options
       
    }


    //Exapanding windows
    step = -1;
    
      setStep(index: number) {
        this.step = index;
      }
    
      nextStep() {
        this.step++;
      }
    
      prevStep() {
        this.step--;
      }

      skills = [];
    

/**
 * to get the search itemfrom the search bar
 * and get related details from the database and show them
 */


id:number;
search_item:string;

      search = function(search_item){
    
        let empty = [];
        console.log("search item: "+this.options_id[this.options.indexOf(search_item)]);
        this.http.get('http://localhost:54949/api/get_stylists_name/'+this.options_id[this.options.indexOf(search_item)]).subscribe(
          
          data =>{
           
          for(let key in data){
            
              this.stylist_details[0] = data[key];
              this.stylist_details.splice(1,this.stylist_details.length)
                      
           }
          this.id = parseInt(data[0].id)
            
          })
        
      }
//advance search functions

skill=1000;
checked=false;
advaceSearchSkillsDetails = [];
advaceSearchpaymentDetails = [];
store = [];
sliderValue = 200;
priceSearchResults = [];
filterResults = [];
advance_search = function(){

  if(!this.checked){
    this.advaceSearchSkillDetails = [];
    this.priceSearchResults = [];
  

  this.http.get('http://localhost:54949/api/getSkills/'+ this.skill).subscribe(
    
    data =>{
     
    for(let key in data){
      
      if(data[key].charge_per_slot <= this.sliderValue){
      this.advaceSearchSkillDetails.push(data[key]);
      this.advaceSearchpaymentDetails.push(data[key]);
      }

         
     }
   // this.id = parseInt(data[0].id)
      
    })



    this.store = this.stylist_details;
    
      this.stylist_details = this.advaceSearchSkillDetails;

  }else{

    this.stylist_details = this.store;
  }

  
}

selectSkill = function(){
 
  if(this.checked){
//console.log("here ");    //this.store = this.stylist_details;
    this.http.get('http://localhost:54949/api/getSkills/'+ this.skill).subscribe(
      
      data =>{
        this.advaceSearchSkillDetails = [];
      for(let key in data){
        if(data[key].charge_per_slot <= this.sliderValue){       
        this.advaceSearchSkillDetails.push(data[key]);
        }
       }
     // this.id = parseInt(data[0].id)
     if(this.advaceSearchSkillDetails.length >= 4 ){
      for(var j =0;j<4;j++){
        
      this.stylist_details[j] = this.advaceSearchSkillDetails[j];
      }
    }else{
      this.stylist_details = this.advaceSearchSkillDetails;
    }
    
      })

    

  }
}

// setPayment = function(){
//   if(this.checked){
//     this.http.get('http://localhost:54949/api/getPayments/'+ this.sliderValue).subscribe(
      
//       data =>{
//         this.advaceSearchpaymentDetails = [];
//       for(let key in data){
               
//         this.advaceSearchpaymentDetails.push(data[key]);
              
//        }
//      this.id = parseInt(data[0].id)
//     if(this.advaceSearchpaymentDetails.length >= 4 ){
//       for(var j =0;j<4;j++){

//      this.stylist_details[j] = this.advaceSearchpaymentDetails[j];
//       }
//     }else{
//       this.stylist_details = this.advaceSearchpaymentDetails;
//     }
    
//       })


//   }
// }


}
