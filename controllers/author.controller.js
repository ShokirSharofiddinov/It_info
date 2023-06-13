const { errorHandler } = require("../helpers/error_handler");
const Author = require("../models/Author");
const { default: mongoose } = require("mongoose");
const { authorValidation } = require("../validation/author.validation");

const createAuthor = async (req, res) => {
  try {
    const { error, value } = authorValidation(req.body);
    if (error) {
      return res.status(404).send({ message: error.details[0].message });
    }
    const {
      author_first_name,
      author_last_name,
      author_nick_name,
      author_passowrd,
      author_email,
      author_phone,
      author_info,
      author_position,
      author_photo,
      is_expert,
    } = value;

    console.log(value);

    const author = await Author.findOne({ author_email });
    if (author) {
      return res.status(400).send({ message: "Bunday avtor kiritilgan" });
    }

    const newAuthor = await Author({
      author_first_name,
      author_last_name,
      author_nick_name,
      author_passowrd,
      author_email,
      author_phone,
      author_info,
      author_position,
      author_photo,
      is_expert,
    });

    await newAuthor.save();
    res.status(200).send({ message: "Yangi author qoshildi" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find({});
    if (!authors) {
      return res.status(400).send({ message: "Authorlar topilmadi" });
    }
    res.json(authors);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAuthorsById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ message: "Incorrect ID" });
    }
    const author = await Author.findOne({ _id: req.params.id });
    if (!author) {
      return res.status(400).send({ message: "Author topilmadi" });
    }
    res.json(author);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  createAuthor,
  getAuthors,
  getAuthorsById,
};
