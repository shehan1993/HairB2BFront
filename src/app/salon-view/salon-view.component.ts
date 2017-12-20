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

  description = "A Fashion Stylist is one of the most popular emerging professions in the fashion world globally and is the job  title of someone who selects the clothing and accessories for published editorial features, print or television advertising campaigns, music videos, concert performances, and any public appearances made by ...";
  skills_1 = "(1)Style Sense. Fashion stylists stay on top of the latest trends in the fashion community so that they can dress clients appropriately.Communication Skills. .."
  skill_2 = "(2)Organizational Skills. ...Business Sense."
}
