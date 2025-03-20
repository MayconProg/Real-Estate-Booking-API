import { Role, Status } from "@prisma/client";
import { prisma } from "../lib/prisma";

interface CreateScheduleData {
  startTime: string;
  endTime: string;
}

interface UpdateScheduleData {
  startTime?: string;
  endTime?: string;
  status?: Status;
}

export class ScheduleService {
  static async getAllSchedules() {
    const schedules = await prisma.schedule.findMany();

    return schedules;
  }

  static async getScheduleById(scheduleId: string) {
    const schedule = await prisma.schedule.findUnique({
      where: { id: scheduleId },
    });

    if (!schedule) {
      throw new Error("Schedule Not Found!");
    }

    return schedule;
  }

  static async createSchedule(
    data: CreateScheduleData,
    propertyId: string,
    userId?: string
  ) {
    const { startTime, endTime } = data;

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      throw new Error("Property Not Found!");
    }

    const schedule = await prisma.schedule.create({
      data: {
        startTime,
        endTime,
        userId: userId as string,
        propertyId,
      },
    });

    return schedule;
  }

  static async updateSchedule(
    data: UpdateScheduleData,
    scheduleId: string,
    userId?: string
  ) {
    const schedule = await prisma.schedule.findUnique({
      where: { id: scheduleId },
    });

    if (!schedule) {
      throw new Error("Schedule Not Found!");
    }

    const updatedSchedule = await prisma.schedule.update({
      where: { id: scheduleId, userId },
      data,
    });

    return updatedSchedule;
  }

  static async deleteSchedule(scheduleId: string) {
    const schedule = await prisma.schedule.findUnique({
      where: { id: scheduleId },
    });

    if (!schedule) {
      throw new Error("Schedule Not Found!");
    }

    await prisma.schedule.delete({
      where: { id: scheduleId },
    });
  }
}
