import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crude';
  cprice = 1234;
  call = 'buy'; calloptions = ['buy', 'sell'];
  trigger_span = 5;
  trigger: number;
  today = new Date();
  lastTime: any;

  ngOnInit(): void {
 
    if (this.call === 'buy') {
      this.stepUp();
    }
    if (this.call === 'sell') {
      this.stepDown();
    }
    this.lastTime = formatDate(this.today, 'hh:mm:ss a', 'en-US', '+0530');
  }

  callChecker()
  {
    if (this.call === 'buy') {
      this.stepUp();
    }
    if (this.call === 'sell') {
      this.stepDown();
    }
    this.lastTime = formatDate(this.today, 'hh:mm:ss a', 'en-US', '+0530');
  }


  stepUp() {
    this.trigger = this.cprice - this.trigger_span;
  }

  stepDown() {
    this.trigger = this.cprice + this.trigger_span;
  }


}
