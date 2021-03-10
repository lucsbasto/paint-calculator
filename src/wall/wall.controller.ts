import { Controller, Get, Post, Res, Body, Param, Delete, BadGatewayException } from '@nestjs/common';
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
  
  @Post('')
  async store(@Body() body, @Res() res): Promise<Response>{
    try {
      const isOk = await this.wallService.save(body);
      return res.status(201).json({ message: isOk})
    } catch (error) {
      this.handleError(error, res)
    }
  }

  @Post('/calc')
  async calculate(@Body() body, @Res() res): Promise<Response>{
    try {
      const paintCans = await this.wallService.calculate(body);
      return res.status(201).json({ message: paintCans})
    } catch (error) {
      this.handleError(error, res)
    }
  }

  @Get('room/:id')
  async show(@Param('id') id: string, @Res() res): Promise<Response>{
    try {
      const wallsInRoom = await this.wallService.getWalls({room: id});
      return res.status(201).json({walls: wallsInRoom})
    } catch (error) {
      
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res): Promise<Response>{
    try {
      const isDeleted = await this.wallService.delete({room: id});
      return res.status(201).json({message: isDeleted})
    } catch (error) {
      this.handleError(error, res)
    }
  }


  handleError(e: Error, res): Response{
    return res.status(400).json({error: e.message})
  }
}
