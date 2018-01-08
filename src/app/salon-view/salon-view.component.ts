import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { HttpClient , HttpErrorResponse,HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-salon-view',
  templateUrl: './salon-view.component.html',
  styleUrls: ['./salon-view.component.css']
})
export class SalonViewComponent implements OnInit {


  tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
   
  ];
  constructor(private activatedRoute: ActivatedRoute,private http:HttpClient) { }
  userId;

  
  stylist_details = [];
  ngOnInit() {
    // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
         this.userId = params['id'];
        
      });


      this.http.get('http://localhost:54949/api/get_stylists_name/'+this.userId).subscribe(
        data =>{                     
        for(let key in data){
                      
          this.stylist_details.push(data[key].id);
          this.stylist_details.push(data[key].first_name);
          this.stylist_details.push(data[key].last_name);
          this.stylist_details.push(data[key].address_line_01);
          this.stylist_details.push(data[key].address_line_02);
          this.stylist_details.push(data[key].city);
          this.stylist_details.push(data[key].state);
          this.stylist_details.push(data[key].zip);
          this.stylist_details.push(data[key].country);
          this.stylist_details.push(data[key].Telephone);
          this.stylist_details.push(data[key].description);
          this.stylist_details.push(data[key].term_and_conditions);
          this.stylist_details.push(data[key].charge_per_slot);
          this.stylist_details.push(data[key].job_role_id);
          this.stylist_details.push(data[key].src);
          
         //console.log(data[key]);
         }
          
        })
  }

}
