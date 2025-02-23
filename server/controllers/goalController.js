const Goal = require("../models/goalModel.js");
const User = require("../models/userModel.js");

const getGoal = async (req, res) => {
    const goals = await Goal.find({ user: req.user.id });
    res.status(200).json(goals);
}
const allGoal = async (req, res) => {
    const goals = await Goal.find();
    res.status(200).json(goals);
}

const setGoal = async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error("Please add a text");
    };
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    });
    res.status(200).json(goal);
}

const updateGoal = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ msg: "User not found" })

        }

        if (goal.user.toString() !== user.id) {
            return res.status(401).json({ msg: "User not Authorized" })
        }



        const goal = await Goal.findOneAndUpdate({ _id: id }, req.body, { new: true })

        if (!goal) {
            return res.status(400).json({ message: "Goal not found" })
        }
        res.status(200).json(goal)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteGoal = async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
        res.status(400)
        throw new Error("Goal not found")
    };
    Goal.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json("Goal deleted"))
}

module.exports = {
    getGoal, setGoal, updateGoal, deleteGoal, allGoal
}