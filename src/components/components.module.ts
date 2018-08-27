import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { Timer } from './countdown-timer/timer';
import { TimerProgress } from './timer-progress/timer-progress';


export const components = [
  Timer,
  TimerProgress,
];

@NgModule({
  declarations: [components],
  imports: [IonicModule],
  exports: [components]
})
export class ComponentsModule {}
