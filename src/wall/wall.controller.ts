import { Controller, Get } from '@nestjs/common';
import { Wall } from './schemas/wall.schema';
import { WallService } from './wall.service';

@Controller('walls')
export class WallController {
  constructor(private readonly wallService: WallService){}

  @Get('')
  async index(@Res() res): Promise<Response>{
    try {
      const walls: Wall[] = await this.wallService.getWalls()
      return res.status(201).json({ walls: walls });
    } catch (error) {
      this.handleError(error, res)
    }
  }

  handleError(e: Error, res): Response{
    return res.status(400).json({error: e.message})
  }
}
