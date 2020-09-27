import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public theme: BehaviorSubject<string> = new BehaviorSubject<string>('default');

  constructor(private storageService: StorageService) {
    this.theme.next(this.storageService.getItem('settings').theme);
  }

  changeTheme(theme: string): void {
    this.theme.next(theme);
  }
}
