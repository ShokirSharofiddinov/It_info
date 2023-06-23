const { Router } = require("express");

const { getTopic, addTopic, getTopicById, updateTopic, deleteTopic } = require("../controllers/topics.controller");

const router = Router();
router.get("/", getTopic);
router.post("/", addTopic);
router.get("/:id", getTopicById);
router.put("/:id", updateTopic);
router.delete("/:id", deleteTopic);

module.exports = router;
