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



        if (!group) {
            throw new Error('Wrong group code')
        }
        // const userPaying = await BillGroup.findOne({ group: groupId });

        // const user = group.users.find(user => user._id.equals(bill.paidBy));
        if (groupId) {
            let groupIdString = groupId.toString()
            bills = await Bills.find({ groupId: groupIdString })

            console.log(bills);


            bills = await Promise.all(bills.map(async (bill: Bill) => {

                // Step 4: Find the user in the group by the paidBy _id
                const user = group.users.find(user => user._id.equals(bill.paidBy));
                if (!user) {
                    throw new Error(`User not found in group for userId ${bill.paidBy}`);
                }
                console.log('user', user);


                // Step 5: Return the bill with the nested paidBy object { id, userName }
                return {
                    ...bill.toObject(),
                    paidBy: {
                        id: user._id,
                        userName: user.name
                    }
                };
            }));



            res.json({
                groupName: group?.name, bills
            });
        }
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
