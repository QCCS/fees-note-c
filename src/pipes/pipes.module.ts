import { NgModule } from '@angular/core';
import { CapitalizePipe } from './capitalize.pipe';
import { OrderByPipe } from './orderby.pipe';
import { YuantofenPipe } from './yuantofen.pipe';
import { ShortenStringPipe } from './shorten.pipe';
import { TemperaturePipe } from './temperature.pipe';

export const pipes = [
  CapitalizePipe,
  OrderByPipe,
  ShortenStringPipe,
  YuantofenPipe,
  TemperaturePipe,
];

@NgModule({
  declarations:[pipes],
  exports: [pipes]
})

export class PipesModule { }
