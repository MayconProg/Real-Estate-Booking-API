import { Request, Response } from "express";
import { PropertyService } from "../services/property.service";

export class PropertyController {
  static async getProperties(req: Request, res: Response) {
    try {
      const properties = await PropertyService.getAllProperties();

      res
        .status(200)
        .json({ message: "Properties Found Successfully!", data: properties });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getProperty(req: Request, res: Response) {
    try {
      const propertyId = req.params.id;
      const property = await PropertyService.getPropertyById(propertyId);

      res
        .status(200)
        .json({ message: "Property Found Successfully!", data: property });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const propertyData = req.body;
      const property = await PropertyService.createProperty(
        propertyData,
        req.auth?.userId
      );

      res
        .status(201)
        .json({ message: "Property Created Successfully!", data: property });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const data = req.body;
      const propertyId = req.params.id;
      const updatedProperty = await PropertyService.updateProperty(
        data,
        propertyId,
        req.auth?.userId
      );

      res.status(200).json({
        message: "Property Updated Successfully!",
        data: updatedProperty,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const propertyId = req.params.id;
      await PropertyService.deleteProperty(propertyId, req.auth?.userId);

      res.status(200).json({ message: "Property Deleted Successfully!" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
