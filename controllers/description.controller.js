const errorHandler = require("../helpers/error_handler");
const Description = require("../models/Description");
const { default: mongoose } = require("mongoose");

const addDesc = async (req, res) => {
  try {
    const { description, category_id } = req.body;
    const newDesc = new Description({ description, category_id });
    newDesc.save();

    res.status(201).json({ message: "Description added successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getDesc = async (req, res) => {
  try {
    const desc = await Description.find().populate("category_id");
    if (!desc) {
      return res.status(404).json({ message: "No description found" });
    }
    res.status(200).json(desc);
  } catch (error) {
    errorHandler(res, error);
  }
};
const getDescById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Invalid  id",
      });
    }
    const { id } = req.params;
    const desc = await Description.findById(id).populate("category_id");
    if (!desc) {
      return res.status(404).json({ message: "No description found" });
    }
    res.status(200).json(desc);
  } catch (error) {
    errorHandler(res, error);
  }
};
const updateDesc = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Invalid  id",
      });
    }
    const { id } = req.params;
    const { description, category_id } = req.body;
    const desc = await Description.findByIdAndUpdate(
      id,
      { description, category_id },
      { new: true }
    );
    if (!desc) {
      return res.status(404).json({ message: "No description found" });
    }
    res.status(200).json(desc);
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteDesc = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Invalid  id",
      });
    }
    const { id } = req.params;
    const desc = await Description.findByIdAndDelete(id);
    if (!desc) {
      return res.status(404).json({ message: "No description found" });
    }
    res.status(200).json(desc);
  } catch (error) {
    errorHandler(res, error);
  }
};
module.exports = {
  addDesc,
  getDesc,
  getDescById,
  updateDesc,
  deleteDesc,
};