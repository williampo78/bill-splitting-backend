import express from "express";
import BillGroup from "../models/billModel";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Welcome to the Bill API!" });
});

router.get("/:id", (req, res) => {
    res.json({ message: "Get single bill" });
});

router.post("/", async (req, res) => {
    const { name } = req.body;
    const code = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
    try {
        const group = await BillGroup.create({ code, name });
        res.status(200).json(group)

    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.patch("/:id", (req, res) => {
    res.json({ message: "Update a bill" });
});

export default router;
