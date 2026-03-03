import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const sensorData = pgTable("sensor_data", {
  id: serial("id").primaryKey(),
  temperature: integer("temperature").notNull(),
  humidity: integer("humidity").notNull(),
  soilMoisture: integer("soil_moisture").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const deviceStatus = pgTable("device_status", {
  id: serial("id").primaryKey(),
  isOnline: boolean("is_online").notNull().default(false),
  ipAddress: text("ip_address").notNull().default("0.0.0.0"),
  motorRunning: boolean("motor_running").notNull().default(false),
  message: text("message").notNull().default(""),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

export const insertSensorDataSchema = createInsertSchema(sensorData).omit({ id: true, timestamp: true });
export const insertDeviceStatusSchema = createInsertSchema(deviceStatus).omit({ id: true, lastUpdated: true });

export type SensorData = typeof sensorData.$inferSelect;
export type InsertSensorData = z.infer<typeof insertSensorDataSchema>;

export type DeviceStatus = typeof deviceStatus.$inferSelect;
export type InsertDeviceStatus = z.infer<typeof insertDeviceStatusSchema>;
export type UpdateDeviceStatus = Partial<InsertDeviceStatus>;
