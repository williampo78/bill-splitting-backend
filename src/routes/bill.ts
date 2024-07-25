import express from "express";
import Bills from "../models/billModel";
import BillGroup from "../models/groupModel";

const router = express.Router();

router.get("/", async (req, res) => {
    const { code } = req.query;
    let bills: any;
    try {
        const group = await BillGroup.findOne({ code: code?.toString() });
        const groupId = group?._id;
        if (groupId) {
            let groupIdString = groupId.toString()
            bills = await Bills.find({ groupId: groupIdString });
        } else {
            bills = await Bills.find();
        }
        res.json({ groupName: group?.name, bills: bills });
    } catch (error: any) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.get("/:id", (req, res) => {
    res.json({ message: "Get single bill" });
});

router.post("/", async (req, res) => {
    const { item, groupId } = req.body;
    try {
        const bill = await Bills.create({ item, groupId });
        res.status(200).json(bill)

    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.patch("/:id", (req, res) => {
    res.json({ message: "Update a bill" });
});

export default router;
