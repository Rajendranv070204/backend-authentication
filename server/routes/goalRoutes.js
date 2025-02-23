const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware.js")

const { getGoal, setGoal, updateGoal, deleteGoal, allGoal } = require("../controllers/goalController.js")

router.route("/").get(auth, getGoal).post(auth, setGoal);
router.route("/all").get(allGoal);
router.route("/:id").delete(auth, deleteGoal).put(auth, updateGoal);

module.exports = router;