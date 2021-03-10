import { Document } from 'mongoose';
import ObjectID from 'bson-objectid'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface PaintCans {
  '0.5L': number,
  '2.5L': number,
  '3.6L': number,
  '18L': number
}

@Schema({ timestamps: true })
export class Wall {
  @Prop({ type: Number, required: true })
  height: number;
  
  @Prop({ type: Number, required: true })
  width: number;

  @Prop({ type: Number, required: true })
  windows: number;

  @Prop({ type: Number, required: true })
  doors: number;

  @Prop({ type: Number, required: true })
  number: number;

  @Prop({type: String, default: new ObjectID()})
  room: string

  @Prop({type: Object })
  paintCans: PaintCans
}
export const WallSchema = SchemaFactory
  .createForClass(Wall);
export type WallDocument = Wall & Document;
