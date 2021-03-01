import { Wall } from "./wall.interface";

export interface Room {
  leftWall: Wall;
  frontWall: Wall;
  rigthWall: Wall;
  backWall: Wall;
}