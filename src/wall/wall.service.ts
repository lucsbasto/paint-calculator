import { Injectable } from '@nestjs/common';

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
}
