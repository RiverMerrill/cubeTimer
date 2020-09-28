import { Component, OnInit } from '@angular/core';
import {TimeHistoryService} from '../services/time-history.service';
import {SettingsService} from '../services/settings.service';
import { Observable} from 'rxjs';
import {Settings} from '../models/settings.model';
import {Time} from '../models/time.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public time: Time = new Time();
  public timer: any;
  public started: boolean = false;
  public date: number;
  public average: Time;
  public totalTimes: number;
  public bestTime: Time;
  public settings: Observable<Settings>;

  constructor(private timeHistory: TimeHistoryService, private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.timeHistory.getAverage();
    this.timeHistory.average.subscribe((time) => {
      this.average = time;
    });
    this.timeHistory.allTimes.subscribe((times: Time[]) => {
      this.totalTimes = times ? times.length : 0;
    });
    this.timeHistory.bestTime.subscribe((time: Time) => {
      this.bestTime = time;
    });
    this.settings = this.settingsService.getSettings();
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
    this.time = new Time();
  }
}
