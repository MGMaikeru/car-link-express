import { Rental } from "../../domain/entities/Rental";
import rentalModel, { RentalDocument } from "../models/rental.model";

export interface RentalRepository {
  findById(id: string): Promise<Rental | null>;
  findAll(): Promise<Rental[]>;
  create(rental: Rental): Promise<Rental>;
  update(id: string, rental: Partial<Rental>): Promise<Rental | null>;
  delete(id: string): Promise<boolean>;
}

export class MongoRentalRepository implements RentalRepository {
  async findById(id: string): Promise<Rental | null> {
    const rental = await rentalModel.findById(id);
    return rental ? this.documentToEntity(rental) : null;
  }

  async findAll(): Promise<Rental[]> {
    const rentals = await rentalModel.find();
    return rentals.map(this.documentToEntity);
  }

  async create(rental: Rental): Promise<Rental> {
    const newRental = await rentalModel.create(rental);
    return this.documentToEntity(newRental);
  }

  async update(id: string, rental: Partial<Rental>): Promise<Rental | null> {
    const updatedRental = await rentalModel.findByIdAndUpdate(id, rental, {
      new: true,
    });
    return updatedRental ? this.documentToEntity(updatedRental) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await rentalModel.findByIdAndDelete(id);
    return !!result;
  }

  private documentToEntity(document: RentalDocument): Rental {
    return {
      id: document._id?.toString() || "",
      vehicleId: document.vehicleId,
      clientId: document.clientId,
      ownerId: document.ownerId,
      totalCost: document.totalCost,
      startDate: document.startDate,
      endDate: document.endDate,
      status: document.status,
    };
  }
}
