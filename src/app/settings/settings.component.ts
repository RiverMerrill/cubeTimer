import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../services/settings.service';
import {Settings} from '../models/settings.model';
import {TimeHistoryService} from '../services/time-history.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public settings: Settings;

  constructor(private settingsService: SettingsService, private timeHistory: TimeHistoryService) {
    this.settingsService.getSettings().subscribe((settings: Settings) => {
      this.settings = settings;
    });
  }

  ngOnInit() {
  }
	
  changeSetting(): void {
    this.settingsService.changeSettings(this.settings);
  }

  resetTimes(): void {
    this.timeHistory.clearAllTimes();
  }
}
