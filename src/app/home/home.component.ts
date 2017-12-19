import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

export class User {
  constructor(public name: string) { }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {
  searchString = "type the stylist name for search";

  constructor() { }

  myControl: FormControl = new FormControl();
  
    options = [
      'One',
      'Two',
      'Three'
    ];
  
    filteredOptions: Observable<string[]>;
  
    ngOnInit() {
      //search bar
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(val => this.filter(val))
        );
    }
  

    //filter for search bar 
    filter(val: string): string[] {
      return this.options.filter(option =>
        option.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }


    //Exapanding windows
    step = 0;
    
      setStep(index: number) {
        this.step = index;
      }
    
      nextStep() {
        this.step++;
      }
    
      prevStep() {
        this.step--;
      }
  
}
