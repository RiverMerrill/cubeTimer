import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {StorageService} from './storage.service';
import {SettingsService} from './settings.service';
import { Time } from '../models/time.model';

@Injectable({
  providedIn: 'root'
})
export class TimeHistoryService {
  public average: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public bestTime: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public allTimes: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(private storageService: StorageService, private settingsService: SettingsService) {
    this.average.next(this.getAverage());
    this.allTimes.next(this.storageService.getItem('time-history'));
    this.bestTime.next(this.getBest());
  }
  
  public getHistory(): void {
    this.average.next(this.getAverage());
    this.allTimes.next(this.storageService.getItem('time-history'));
    this.bestTime.next(this.getBest());
  }

  public addTime(time: Time): void {
    const history = this.storageService.getItem('time-history');
    const arrToSet = history || [];
    arrToSet.push(time);
    this.storageService.setItem('time-history', arrToSet);
    this.getHistory();
  }

  public getAllTimes(): Observable<any> { 
    return this.allTimes;
  }

  public getAverage(): any {
    const settings = this.settingsService.getSettingsSync();
    let history: Time[] = this.storageService.getItem('time-history');
    if (!history) {
      return new Time();
    } else if(settings.average > history.length - 1) {
        history = history.reverse().slice(0, settings.average)
    }
    let sum = 0;
    history.forEach((time: Time) => {
      sum += time.milliTotal;
    })
    const date = new Date(sum/history.length);
    return new Time(
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds() > 99 ?  Math.floor(date.getMilliseconds() / 10) : date.getMilliseconds()
    )
  }

  public getBest(): any {
    const history: Time[] = this.storageService.getItem('time-history');
    if(!history) return new Time();
    const date = new Date(history.map((x: any) => x.milliTotal).sort((a, b) => {return a - b})[0]);
    return new Time(
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds() > 99 ?  Math.floor(date.getMilliseconds() / 10) : date.getMilliseconds()
    )
  }

  public clearAllTimes(): void {
    this.storageService.setItem('time-history', []);
    this.getHistory();
  }
}
