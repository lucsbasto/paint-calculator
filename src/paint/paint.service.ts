import { Injectable } from '@nestjs/common';
import { Wall } from 'src/wall/schemas/wall.schema';

const PAINT_CANS = {
  '0.5L': 0,
  '2.5L': 0,
  '3.6L': 0,
  '18L': 0
}

@Injectable()
export class PaintService {
  getLitersNeededToPaint(walls: Wall[], paintableArea: number){
    const AREA_PAINTED_PER_LITER = 5;
    const liters = paintableArea / AREA_PAINTED_PER_LITER
    return liters
  }

  calculateCan(liters: number){
    while (liters != 0){
      if(liters >= 18){ 
        liters -= 18
        PAINT_CANS['18L'] += 1 
      }
      else if(liters >= 3.6){
        liters -= 3.6
        PAINT_CANS['3.6L'] += 1 
      }
      else if(liters >= 2.5){ 
        liters -= 2.5
        PAINT_CANS['2.5L'] += 1
      }
      else if(liters >= 0.5){ 
        liters -= 0.5
        PAINT_CANS['0.5L'] += 1 
      }
      else {
        PAINT_CANS['0.5L'] += 1
        break
      }
    }
    return PAINT_CANS
  }
}
