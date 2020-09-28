import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../services/settings.service';
import {Settings} from '../models/settings.model';
import {TimeHistoryService} from '../services/time-history.service';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public settings: Settings;

  constructor(
    private settingsService: SettingsService,
    private timeHistory: TimeHistoryService,
    private alertController: AlertController,
    private router: Router
  ) {
    this.settingsService.getSettings().subscribe((settings: Settings) => {
      this.settings = settings;
      document.querySelector('body').className = '';
      document.querySelector('body').classList.add(settings.theme)
    });
  }

  ngOnInit() {
  }
	
  changeSetting(): void {
    this.settingsService.changeSettings(this.settings);
    document.querySelector('body').className = '';
    document.querySelector('body').classList.add(this.settings.theme)
  }

  resetTimes(): void {
    this.timeHistory.clearAllTimes();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Delete Times?',
      message: '<strong>Are you sure you want to delete all saved times?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        },
        {
          text: 'confirm',
          cssClass: 'danger',
          handler: () => {
            this.resetTimes();
          }
        }
      ]
    });

    await alert.present();
  }

  goHome(): void {
    this.router.navigate(['home'])
  }
}
