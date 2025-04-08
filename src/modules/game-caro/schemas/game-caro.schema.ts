import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CaroDocument = Caro & Document;

export enum CaroStatus {
  WAITING = 'waiting',
  PLAYING = 'playing',
  FINISHED = 'finished',
}

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Caro {
  @Prop({ required: true, unique: true })
  CODE: string;

  @Prop({ required: true })
  host: string;

  @Prop({ required: false })
  guest?: string;

  @Prop({ default: CaroStatus.WAITING, enum: CaroStatus, type: String })
  status: CaroStatus;
}

export const CaroSchema = SchemaFactory.createForClass(Caro);

CaroSchema.virtual('hostUser', {
  ref: 'User',
  localField: 'host',
  foreignField: 'username',
  justOne: true,
});

CaroSchema.virtual('guestUser', {
  ref: 'User',
  localField: 'guest',
  foreignField: 'username',
  justOne: true,
});
