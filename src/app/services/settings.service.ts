import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {StorageService} from './storage.service';
import {Settings} from '../models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public settings: BehaviorSubject<Settings> = new BehaviorSubject<Settings>(new Settings());

  constructor(private storageService: StorageService) {
    const localSettings = this.storageService.getItem('settings');
    if(localSettings) {
      this.settings.next(localSettings);
    } else {
      this.storageService.setItem('settings', new Settings());
    }
  }

  public getSettings(): Observable<Settings> {
    return this.settings;
  }

  public getSettingsSync(): Settings {
    return this.storageService.getItem('settings');
  };

  changeSettings(newSettings: Settings): void {
    this.storageService.setItem('settings', newSettings);
    this.settings.next(newSettings);
  }
}
