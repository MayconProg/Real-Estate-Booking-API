import { PropertyType } from "@prisma/client";
import { prisma } from "../lib/prisma";

type CreatePropertyAddressType = {
  country: string;
  state: string;
  city: string;
  street: string;
  number: string;
  zipcode: string;
};

export interface CreatePropertyData {
  title: string;
  description: string;
  price: string;
  type: PropertyType;
  address: CreatePropertyAddressType;
}

type UpdatePropertyAddressType = Partial<CreatePropertyAddressType>;

interface UpdatePropertyData {
  title?: string;
  description?: string;
  price?: string;
  address?: UpdatePropertyAddressType;
}

export class PropertyService {
  static async getAllProperties() {
    const properties = await prisma.property.findMany({
      include: {
        address: true,
      },
    });

    return properties;
  }

  static async getPropertyById(propertyId: string) {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      include: {
        address: true,
      },
    });

    if (!property) {
      throw new Error("Property Not Found!");
    }

    return property;
  }

  static async createProperty(data: CreatePropertyData, userId?: string) {
    const { title, description, price, type } = data;
    const { country, state, city, street, number, zipcode } = data.address;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User Not Found");
    }

    const property = await prisma.property.create({
      data: {
        title,
        description,
        price,
        type,
        ownerId: userId as string,
        address: {
          create: {
            country,
            state,
            city,
            street,
            number,
            zipcode,
          },
        },
      },

      include: {
        address: true,
      },
    });

    return property;
  }

  static async updateProperty(
    data: UpdatePropertyData,
    propertyId: string,
    userId?: string
  ) {
    const { title, description, price } = data;
    const { country, state, city, street, number, zipcode } =
      data.address as UpdatePropertyAddressType;

    const property = await prisma.property.findUnique({
      where: { id: propertyId, ownerId: userId },
    });

    if (!property) {
      throw new Error("Property Not Found!");
    }

    const updatedProperty = await prisma.property.update({
      where: { id: propertyId, ownerId: userId },
      data: {
        title,
        description,
        price,

        address: { update: { country, state, city, street, number, zipcode } },
      },
      include: {
        address: true,
      },
    });

    return updatedProperty;
  }

  static async deleteProperty(propertyId: string, userId?: string) {
    const property = await prisma.property.findUnique({
      where: { id: propertyId, ownerId: userId },
    });

    if (!property) {
      throw new Error("Property Not Found!");
    }

    await prisma.property.delete({
      where: { id: propertyId, ownerId: userId },
    });
  }
}
