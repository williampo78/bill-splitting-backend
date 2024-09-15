import express from "express";
import BillGroup from "../models/groupModel";

const router = express.Router();

router.get("/", async (req, res) => {
    console.log(req.params);
    const { code } = req.query;
    let group
    if (code) {
        group = await BillGroup.findOne({ code }).populate('users','id name');
    } else {
        group = await BillGroup.find().populate('users','id name');

    }
    res.status(200).json(group);
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

router.patch("/:id", async (req, res) => {
    const { id } = req.params
    const group = await BillGroup.findOneAndUpdate({ _id: id }, { ...req.body })
    res.status(201).json(group);
});


export default router;