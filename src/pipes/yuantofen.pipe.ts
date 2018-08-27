import { Pipe } from '@angular/core';

@Pipe({
  name: 'yuantofen'
})
export class YuantofenPipe {
  // 显示为元.

  transform(value) {
    return value + "元";
  }
}
