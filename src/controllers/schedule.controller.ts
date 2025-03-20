import { Request, Response } from "express";
import { ScheduleService } from "../services/schedule.service";

export class ScheduleController {
  static async getSchedules(req: Request, res: Response) {
    const schedules = await ScheduleService.getAllSchedules();

    res
      .status(200)
      .json({ message: "Schedules Found Successfully!", data: schedules });
  }

  static async getSchedule(req: Request, res: Response) {
    try {
      const scheduleId = req.params.id;
      const schedule = await ScheduleService.getScheduleById(scheduleId);

      res
        .status(200)
        .json({ message: "Schedule Found Successfully!", data: schedule });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const propertyId = req.params.id;
      const userId = req.auth?.userId;

      const schedule = await ScheduleService.createSchedule(
        data,
        propertyId,
        userId
      );

      res
        .status(201)
        .json({ message: "Schedule Created Successfully!", data: schedule });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const data = req.body;
      const scheduleId = req.params.id;
      const userId = req.auth?.userId;

      const updatedSchedule = await ScheduleService.updateSchedule(
        data,
        scheduleId,
        userId
      );

      res.status(200).json({
        message: "Schedule Updated Successfully!",
        data: updatedSchedule,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const scheduleId = req.params.id;

      await ScheduleService.deleteSchedule(scheduleId);

      res.status(200).json({
        message: "Schedule Deleted Successfully!",
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
