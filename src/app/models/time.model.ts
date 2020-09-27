export class Time {
  minutes: number;
  seconds: number;
  milliseconds: number;
  milliTotal: number;
  constructor(minutes?: number, seconds?: number, milliseconds?: number, milliTotal?: number) {
    this.minutes = minutes || 0;
    this.seconds = seconds || 0;
    this.milliseconds = milliseconds || 0;
    this.milliTotal = milliTotal || 0;
  };
}
