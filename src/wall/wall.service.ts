import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaintService } from 'src/paint/paint.service';
import { Wall, WallDocument, PaintCans } from './schemas/wall.schema';

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
  constructor(
    @InjectModel('walls')
    private readonly wallModel: Model<WallDocument>,
    private readonly paintService: PaintService
  ){ }
  private windowArea = WINDOW.height * WINDOW.width;
  private doorArea = DOOR.height * DOOR.width;
  
  isWindowFit(wall: Wall) {
    const windowArea = this.getWindowArea(wall);
    const doorArea = this.getDoorArea(wall);
    const wallArea = this.getWallArea(wall);
    if ((windowArea + doorArea) > (wallArea * 0.5)){
      throw new UnprocessableEntityException(`A área da parede ${wall.number} precisa ser no minimo 50% maior que a área das janelas e portas`)
    }
    if (wall.width < WINDOW.width) {
      throw new UnprocessableEntityException(`A largura da parede ${wall.number} precisa ser maior que a largura da janela`)
    }
    if (wall.height < WINDOW.height) {
      throw new UnprocessableEntityException(`A altura da parede ${wall.number} precisa ser maior que a altura da janela`)
    }
    return true;
  }

  async getWalls(room = {}){
    const walls = await this.wallModel.find(room).sort({room: 1}).select('-_id -createdAt -updatedAt')
    return walls
  }

  async delete(room = {}){
    const isDeleted = await this.wallModel.deleteMany(room);
    return isDeleted.deletedCount == 0 ? 'Sala não encontrada' : 'Sala deletada com sucesso';
  }

  async save(walls: Wall[]){
    if(this.verifyAllConditions(walls)){
      const bulkInsertOperations = walls.map(wall => {
        return { insertOne: { document: wall } };
      });
      const isSaveOk = await this.wallModel.bulkWrite(bulkInsertOperations, { ordered: false })
      return isSaveOk
    }
  }

  isDoorFit({height, width, number}: Wall): boolean{
    if(height < DOOR.height + 0.3 ){
      throw new UnprocessableEntityException(`A parede ${number} precisa ser 30cm maior que a porta`)
    }
    if(width < DOOR.width ){
      throw new UnprocessableEntityException(`A largura da parede ${number} precisa ser maior que a largura da porta`)
    }
    return true
  }

  getWallArea({height, width}: Wall){
    return height * width
  }

  getWindowArea({ windows }: Wall){
    return this.windowArea * windows;
  }

  getDoorArea({ doors }: Wall){
    return this.doorArea * doors;
  }

  verifyWallHeigthAndWidth({height, width, number}: Wall){
    if(height < 1 || height > 15 || width < 1 || width > 15){
      throw new UnprocessableEntityException(`Dados invalidos, por favor verifique as medidas da parede ${number} e tente novamente.`)
    }
    return true
  }

  verifyIfWallFieldsAreFilled(wall: Wall): boolean{
    if(!wall.doors||!wall.height||!wall.width||!wall.windows){
      throw new UnprocessableEntityException(`Alguns campos da parede ${wall.number} precisam ser preenchidos`)
    }
    return true
  }

  verifyAllConditions(wall: Wall[]): boolean {
    const isOKToSave = wall.every(wall => 
      (this.verifyIfWallFieldsAreFilled(wall) 
      && this.verifyWallHeigthAndWidth(wall) 
      && this.isDoorFit(wall) 
      && this.isWindowFit(wall))) 
    return isOKToSave
  }

  getPaintableArea(walls: Wall[]){
    const paintableArea = walls.map(wall => {
      const wallArea = this.getWallArea(wall)
      const doorArea = this.getDoorArea(wall)
      const windowArea = this.getWindowArea(wall)
      return wallArea - (doorArea + windowArea)
    }).reduce((a, b) => a+b)
    return paintableArea
  }
  
  calculate(walls: Wall[]){
    const paintableArea = this.getPaintableArea(walls)
    const liters = this.paintService.getLitersNeededToPaint(walls, paintableArea)
    const paintCans: PaintCans = this.paintService.calculateCan(liters)
    return paintCans
  }
}
