import { Component } from '@angular/core';
import {TimeHistoryService} from '../services/time-history.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public time: any = {
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    milliTotal: 0
  };
  public timer: any;
  public started: boolean = false;
  public date: any;
  public average: any;

  constructor(private timeHistory: TimeHistoryService) {
    timeHistory.getAverage();
    timeHistory.average.subscribe((time) => {
      console.log(time);
      this.average = time;
    });
  }

  screenTap() {
    if (this.started) {
      this.started = false;
      this.stopTimer();
    } else {
      this.started = true;
      this.startTimer()
    }
  }

  startTimer() {
    this.resetTimer();
    this.date = Date.now();
    this.timer = setInterval(() => {
      const timePassed = Date.now() - this.date;
      this.time.milliTotal = timePassed;
      if (timePassed < 1000) {
        this.time.milliseconds = Math.floor(timePassed / 10);
      } else{
        this.time.minutes = Math.floor(timePassed / 60000);
        this.time.seconds = Math.floor(timePassed / 1000);
        this.time.milliseconds = Math.floor((timePassed - (this.time.seconds * 1000)) / 10);
      }
    });
  }

  stopTimer() {
    if(this.timer) {
      clearInterval(this.timer);
      this.timeHistory.addTime(this.time);
    }
  }

  resetTimer() {
    this.time = {
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      milliTotal: 0
    }
  }
}
