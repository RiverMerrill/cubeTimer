import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../services/settings.service';
import {Settings} from '../models/settings.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public settings: Settings;

  constructor(private settingsService: SettingsService) {
    this.settingsService.getSettings().subscribe((settings: Settings) => {
      console.log(settings);
      this.settings = settings;
    });
  }

  ngOnInit() {
  }
	
  changeSetting() {
    this.settingsService.changeSettings(this.settings);
  }
}
