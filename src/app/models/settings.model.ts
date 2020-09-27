export class Settings {
  theme: string;
  average: number;
  showTotal: boolean;
  showHelpText: boolean;
  showBest: boolean;
  constructor() {
    this.theme = 'default';
    this.average = 5;
    this.showTotal = true;
    this.showHelpText = true;
    this.showBest = true;
  }
}
