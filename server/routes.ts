import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.sensorData.list.path, async (req, res) => {
    try {
      const data = await storage.getSensorDataList();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.sensorData.create.path, async (req, res) => {
    try {
      const input = api.sensorData.create.input.parse(req.body);
      const data = await storage.createSensorData(input);
      res.status(201).json(data);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.deviceStatus.get.path, async (req, res) => {
    try {
      const status = await storage.getDeviceStatus();
      res.status(200).json(status);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch(api.deviceStatus.update.path, async (req, res) => {
    try {
      const input = api.deviceStatus.update.input.parse(req.body);
      const status = await storage.updateDeviceStatus(input);
      res.status(200).json(status);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Seed database
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingData = await storage.getSensorDataList();
  if (existingData.length === 0) {
    const now = new Date();
    // Insert some mock data for the charts
    for (let i = 10; i >= 0; i--) {
      await storage.createSensorData({
        temperature: Math.floor(Math.random() * (35 - 20 + 1) + 20), // 20-35 C
        humidity: Math.floor(Math.random() * (90 - 40 + 1) + 40), // 40-90 %
        soilMoisture: Math.floor(Math.random() * (80 - 30 + 1) + 30), // 30-80 %
      });
    }
  }
}
