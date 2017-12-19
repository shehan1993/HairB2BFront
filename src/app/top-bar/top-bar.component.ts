import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material/form-field';
import 'hammerjs';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

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
