import express from "express";
import Bills, { Bill } from "../models/billModel";
import BillGroup from "../models/groupModel";

const router = express.Router();

router.get("/", async (req, res) => {
    const { code } = req.query;
    let bills: any;
    // let bills: Bill[];
    try {

        const group = await BillGroup.findOne({ code: code?.toString() });
        const groupId = group?._id;
        const userPaying = await BillGroup.findOne({ group: groupId });
        if (groupId) {
            let groupIdString = groupId.toString()
            bills = await Bills.find({ groupId: groupIdString }).populate('paidBy').populate('sharedBy.userId', '_id name').lean()




        } else {
            bills = await Bills.find();
        }

        const transformedBills = bills.map((bill: any) => ({
            ...bill, // Spread the bill object
            sharedBy: bill.sharedBy.map((share: any) => ({
                user: share.userId,  // Rename 'userId' to 'user'
                amount: share.amount
            }))
        }));


        res.json({ groupName: group?.name, bills: transformedBills });
    } catch (error: any) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.get("/:id", (req, res) => {
    res.json({ message: "Get single bill" });
});

router.post("/", async (req, res) => {
    const { item, groupId, price, paidBy, sharedBy, payingTime } = req.body;
    try {
        const bill = await Bills.create({ item, groupId, price, paidBy, sharedBy, payingTime });
        res.status(200).json(bill)

    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.patch("/:id", (req, res) => {
    res.json({ message: "Update a bill" });
});

export default router;
