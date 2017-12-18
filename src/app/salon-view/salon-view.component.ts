import { Component, OnInit } from '@angular/core';


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
  constructor() { }

  ngOnInit() {
  }

}
