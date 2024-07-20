import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Welcome to the Bill API!" });
});

router.get("/:id", (req, res) => {
    res.json({ message: "Get single bill" });
});

router.post("/", (req, res) => {
    res.json({ message: "Post a bill" });
});

router.patch("/:id", (req, res) => {
    res.json({ message: "Update a bill" });
});

export default router;
