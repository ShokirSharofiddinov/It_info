const errorHandler = require("../helpers/error_handler");
const Topic = require("../models/Topic");
const { default: mongoose } = require("mongoose");

const addTopic = async (req, res) => {
  try {
    const { author_id, topic_title, topic_text, created_date, updated_date, is_checked, is_approved, expert_id } = req.body;
    const newtopic = new Topic({
      author_id,
      topic_title,
      topic_text,
      created_date,
      updated_date,
      is_checked,
      is_approved,
      expert_id,
    });
    newtopic.save();

    res.status(201).json({ message: "Topic added successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getTopic = async (req, res) => {
  try {
    const topic = await Topic.find();
    if (!topic) {
      return res.status(404).json({ message: "No topicription found" });
    }
    res.json({data:topic})
  } catch (error) {
    errorHandler(res, error);
  }
};
const getTopicById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Invalid  id",
      });
    }
    const { id } = req.params;
    const topic = await Topic.findById(id).populate("category_id");
    if (!topic) {
      return res.status(404).json({ message: "No topicription found" });
    }
    res.status(200).json(topic);
  } catch (error) {
    errorHandler(res, error);
  }
};
const updateTopic = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Invalid  id",
      });
    }
    const { id } = req.params;
    const {
      author_id,
      topic_title,
      topic_text,
      created_date,
      updated_date,
      is_checked,
      is_approved,
      expert_id,
    } = req.body;
    const topic = await Topic.findByIdAndUpdate(
      id,
      {
        author_id,
        topic_title,
        topic_text,
        created_date,
        updated_date,
        is_checked,
        is_approved,
        expert_id,
      },
      { new: true }
    );
    if (!topic) {
      return res.status(404).json({ message: "No topicription found" });
    }
    res.status(200).json(topic);
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteTopic = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Invalid  id",
      });
    }
    const { id } = req.params;
    const topic = await Topic.findByIdAndDelete(id);
    if (!topic) {
      return res.status(404).json({ message: "No topicription found" });
    }
    res.status(200).json(topic);
  } catch (error) {
    errorHandler(res, error);
  }
};
module.exports = {
  addTopic,
  getTopic,
  getTopicById,
  updateTopic,
  deleteTopic,
};