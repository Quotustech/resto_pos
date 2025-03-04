import { Request, Response } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { Store } from "../models/store.model";
import { generateApiCredentials } from "../utils/generator";
import apiKeyModel from "../models/apiKey.model";

export const registerRestaurant = async (req: Request, res: Response) => {
    try {
        const { name, email, password, phone, address } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        const existingRestaurant = await Store.findOne({ email });
        if (existingRestaurant) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashedPassword = await argon2.hash(password);

        const newStore = await Store.create({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
        });

        // Generate API credentials for the store
        const { apiKey, apiSecret } = generateApiCredentials();

        // store the API credentials in the database with store ID
        const storeId = newStore._id;
        await apiKeyModel.create({ storeId, apiKey, apiSecret, applicationName: name });

        return res.status(201).json({ message: "Restaurant registered successfully" });

    } catch (error: any) {
        console.error("Error registering restaurant:", error.message);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


// login restaurant
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Use an env variable

export const loginRestaurant = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const store = await Store.findOne({ email });
        if (!store) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        const isPasswordValid = await argon2.verify(store.password, password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ storeId: store._id }, JWT_SECRET, { expiresIn: "7d" });

        return res.status(200).json({ message: "Login successful", token });

    } catch (error: any) {
        console.error("Error during login:", error.message);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

