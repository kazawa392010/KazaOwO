import { db } from "./db";
import {
  sensorData,
  deviceStatus,
  type InsertSensorData,
  type SensorData,
  type InsertDeviceStatus,
  type UpdateDeviceStatus,
  type DeviceStatus
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getSensorDataList(): Promise<SensorData[]>;
  createSensorData(data: InsertSensorData): Promise<SensorData>;
  getDeviceStatus(): Promise<DeviceStatus>;
  updateDeviceStatus(status: UpdateDeviceStatus): Promise<DeviceStatus>;
}

export class DatabaseStorage implements IStorage {
  async getSensorDataList(): Promise<SensorData[]> {
    return await db.select().from(sensorData).orderBy(desc(sensorData.timestamp)).limit(50);
  }

  async createSensorData(data: InsertSensorData): Promise<SensorData> {
    const [newData] = await db.insert(sensorData).values(data).returning();
    return newData;
  }

  async getDeviceStatus(): Promise<DeviceStatus> {
    const records = await db.select().from(deviceStatus).limit(1);
    if (records.length === 0) {
      // Create initial device status if it doesn't exist
      const [initialStatus] = await db.insert(deviceStatus).values({
        isOnline: true,
        ipAddress: "192.168.1.100",
        motorRunning: false,
        message: ""
      }).returning();
      return initialStatus;
    }
    return records[0];
  }

  async updateDeviceStatus(status: UpdateDeviceStatus): Promise<DeviceStatus> {
    const current = await this.getDeviceStatus();
    const [updated] = await db.update(deviceStatus)
      .set({ ...status, lastUpdated: new Date() })
      .where(eq(deviceStatus.id, current.id))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
