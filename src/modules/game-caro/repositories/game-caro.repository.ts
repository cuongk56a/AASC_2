import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model, UpdateQuery } from 'mongoose'
import { Caro, CaroDocument } from '../schemas/game-caro.schema'

@Injectable()
export class CaroRepository {
  constructor(@InjectModel(Caro.name) private CaroModel: Model<CaroDocument>) {}

  async create(CaroData: Partial<Caro>): Promise<CaroDocument> {
    const newCaro = new this.CaroModel(CaroData)
    return newCaro.save()
  }

  async findOne(CaroFilterQuery: FilterQuery<Caro>): Promise<CaroDocument | null> {
    return this.CaroModel.findOne(CaroFilterQuery).exec()
  }

  async findById(id: string): Promise<CaroDocument | null> {
    return this.CaroModel.findById(id).exec()
  }

  async findAll(): Promise<CaroDocument[]> {
    return this.CaroModel.find().exec()
  }

  async findByIdAndUpdate(
    id: string,
    updateData: UpdateQuery<Caro>,
    options = { new: true },
  ): Promise<CaroDocument | null> {
    return this.CaroModel.findByIdAndUpdate(id, updateData, options).exec()
  }

  async updateOne(CaroFilterQuery: FilterQuery<Caro>, updateData: UpdateQuery<Caro>) {
    return this.CaroModel.updateOne(CaroFilterQuery, updateData).exec()
  }

  async deleteOne(CaroFilterQuery: FilterQuery<Caro>) {
    return this.CaroModel.deleteOne(CaroFilterQuery).exec()
  }

  async count(CaroFilterQuery: FilterQuery<Caro>): Promise<number> {
    return this.CaroModel.countDocuments(CaroFilterQuery).exec()
  }
}