import express from "express";
import User from "../models/userModel";
import BillGroup from "../models/groupModel";

const router = express.Router();

//取得group user
router.get("/", async (req, res) => {
    const { groupId } = req.query;

    if (groupId) {
        const users = await User.find({ groupId }).populate('name');
        res.status(200).json(users);
    }
    res.status(400).json({ error: 'GroupId is required' });

});


//新增user
router.post("/", async (req, res) => {
    const { name, groupId } = req.body;
    try {
        const user = await User.create({ groupId, name });

        await BillGroup.findByIdAndUpdate(
            groupId,
            { $push: { users: user._id } },  // Push the user ID into the group's users array
            { new: true }  // Return the updated group
        );
        res.status(200).json(user)

    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

// 編輯user
router.patch("/:id", async (req, res) => {
    const { id } = req.params
    const { name } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { name }, { new: true });

        res.status(201).json(user);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});


//刪除user
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Find the user by ID
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Remove the user from the group before deleting the user
        await BillGroup.findByIdAndUpdate(
            user.groupId,
            { $pull: { users: user._id } }, // Remove the user's ID from the users array in the group
            { new: true } // Return the updated group
        );

        // Delete the user
        await User.findByIdAndDelete(id);

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});




export default router;
