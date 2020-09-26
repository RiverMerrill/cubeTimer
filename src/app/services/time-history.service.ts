import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeHistoryService {
  public average: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(private storage: Storage) { }

  public addTime(time: any): void {
    this.storage.get('time-history').then((history: any) => {
        const arrToSet = history || [];
        arrToSet.push(time);
        this.storage.set('time-history', arrToSet).then(() => {
          this.getAverage();
        });
    });
  }

  public async getAllTimes(): Promise<string[]> {
    return await this.storage.get('time-history');
  }

  public getAverage(): void {
    this.storage.get('time-history').then(history => {
      let sum = 0;
      history.forEach((time: any) => {
        console.log(time);
        sum += time.milliTotal;
      })
      const date = new Date(sum/history.length-1);
      console.log(sum);
      this.average.next({
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        miliseconds: date.getMilliseconds()
      });
    });
  }
}
