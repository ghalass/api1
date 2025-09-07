import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// --- CRUD Routes ---

// Get all users
app.get("/users", async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

// Get user by id
app.get("/users/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
});

// Create user
app.post("/users", async (req, res) => {
    const { name, email, active } = req.body;
    try {
        const user = await prisma.user.create({
            data: { name, email, active },
        });
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update user
app.put("/users/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, active } = req.body;
    try {
        const user = await prisma.user.update({
            where: { id },
            data: { name, email, active },
        });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete user
app.delete("/users/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.user.delete({ where: { id } });
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// --- Start server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
