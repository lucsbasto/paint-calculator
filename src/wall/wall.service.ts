import { Injectable } from '@nestjs/common';
import { Wall } from 'src/utils/interfaces/wall.interface';

const DOOR =  {
  height: 1.9,
  width: 0.8
}

const WINDOW = {
  height: 1.2,
  width: 2
}

@Injectable()
export class WallService {
  private windowArea = WINDOW.height * WINDOW.width;
  private doorArea = DOOR.height * DOOR.width;
  
  isWindowFit(wall: Wall) {
    const windowArea = this.getWindowArea(wall);
    const doorArea = this.getDoorArea(wall);
    const wallArea = this.getWallArea(wall);
    const isFit = (windowArea + doorArea) < (wallArea * 0.5) ? true : false;
    return isFit;
  }

  isDoorFit({height}: Wall){
    return height > DOOR.height * 0.3 
  }

  getWallArea({height, width}: Wall){
    return height * width
  }

  getWindowArea({ window }: Wall){
    return this.windowArea * window;
  }

  getDoorArea({ door }: Wall){
    return this.doorArea * door;
  }

  verifyWallHeigthAndWidth({height, width}: Wall){
    if(height < 1 || height > 15 || width < 1 || width > 15){
      return false
    }
    return true
  }

  getPaintableArea(wall: Wall){
    const windowArea = this.getWindowArea(wall);
    const doorArea = this.getDoorArea(wall);
    const wallArea = this.getWallArea(wall);

    const paintableArea = wallArea - doorArea - windowArea;
    return paintableArea;
  }

  paint(wall: Wall){
    const AREA_PAINTED_PER_LITER = 5;
    const paintableArea = this.getPaintableArea(wall);
    return paintableArea / AREA_PAINTED_PER_LITER;
  }
}
