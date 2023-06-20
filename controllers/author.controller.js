const { errorHandler } = require("../helpers/error_handler");
const Author = require("../models/Author");
const { default: mongoose } = require("mongoose");
const { authorValidation } = require("../validation/author.validation");
const config = require("config");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("../services/MainService");
const myJwt = require("../services/JwtService");

const addAuthor = async (req, res) => {
  try {
    const {
      author_first_name,
      author_last_name,
      author_nick_name,
      author_password,
      author_email,
      author_phone,
      author_info,
      author_position,
      author_photo,
      is_expert,
    } = req.body;



    const author = await Author.findOne({ author_email });
    if (author) {
      return res.status(400).send({ message: "Bunday avtor kiritilgan" });
    }
    const hashedPassword = await bcrypt.hash(author_password, 7);
    const author_activation_link = uuid.v4();

    const newAuthor = await Author({
      author_first_name,
      author_last_name,
      author_nick_name,
      author_password: hashedPassword,
      author_email,
      author_phone,
      author_info,
      author_position,
      author_photo,
      is_expert,
      author_activation_link,
    });

    await newAuthor.save();
    await mailService.sendActivationMail(
      author_email,
      `${config.get("api_url")}/api/author/activate/${author_activation_link}`
    );
    const payload = {
      id: newAuthor._id,
      is_expert: newAuthor.is_expert,
      authorRoles: ["READ", "WRITE"],
      author_is_active: newAuthor.author_is_active,
    };

    const tokens = myJwt.generateTokens(payload);
    newAuthor.author_token = tokens.refreshToken;
    await newAuthor.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });

    res.status(200).send({ ...tokens, author: payload });
  } catch (error) {
    errorHandler(res, error);
  }
};

const authorActivate = async (req,res) => {
  try {
    const author = await Author.findOne({
      author_activation_link: req.params.link
    })
    if(!author){
      return res.status(400).send({message: "Bunday Avtor topilmadi"})
    }
    if(author.author_is_active){
      return res.status(400).send({message: "User already activated"})
    }
    author.author_is_active = true
    await author.save()
    res.status(200).send({
      author_is_active: author.author_is_active,
      message: "user activated"
    })
  }catch(error){
    errorHandler(res,error)
  }
}

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

const updateAuthor = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ message: "Incorrect ID" });
    }
    const author = await Author.updateOne(
      { _id: req.params.id },
      {
        $set: {
          author_first_name: req.body.author_first_name,
          author_last_name: req.body.author_last_name,
          author_nick_name: req.body.author_nick_name,
          author_password: req.body.author_password,
          author_email: req.body.author_email,
          author_phone: req.body.author_phone,
          author_info: req.body.author_info,
          author_position: req.body.author_position,
          author_photo: req.body.author_photo,
          is_expert: req.body.is_expert,
        },
      }
    );
    if (!author) {
      return res.status(400).send({ message: "Author topilmadi" });
    }
    res.json({ message: "Update qilindi" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const loginAuthor = async (req, res) => {
  try {
    const { author_email, author_password } = req.body;
    const author = await Author.findOne({ author_email });
    if (!author)
      return res.status(400).send({ message: "Email yoki parol noto'g'ri" });
    const validPassword = bcrypt.compareSync(
      author_password, //ochiq password
      author.author_password //bazadan olingan password
    );
    if (!validPassword)
      return res.status(400).send({ message: "Email yoki parol noto'g'ri" });

    const payload = {
      id: author._id,
      is_expert: author.is_expert,
      authorRoles: ["READ", "WRITE"],
    };
    const tokens = myJwt.generateTokens(payload);
    console.log(tokens);

    // const token = generateAccessToken(author._id, author.is_expert, [
    //     "READ",
    //     "WRITE",
    // ]);

    author.author_token = tokens.refreshToken;
    await author.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });

    res.status(200).send({ ...tokens });
  } catch (error) {
    errorHandler(res, error);
  }
};

const refreshAuthorToken = async (req, res) => {
  const { refreshToken } = req.cookies;
  console.log(refreshToken);
  if (!refreshToken)
    return res.status(400).send({ message: "Tokin topilmadi" });

  const authorDataFromCookie = await myJwt.verifyRefresh(refreshToken);

  const authorDataFromDB = await Author.findOne({ author_token: refreshToken });

  if (!authorDataFromCookie || !authorDataFromDB)
    return res.status(400).send({ message: "Author ro'yxatdan o'tmagan" });

  const author = await Author.findById(authorDataFromCookie.id);
  if (!author) return res.status(400).send({ message: "ID noto'g'ri" });

  const payload = {
    id: author._id,
    is_expert: author.is_expert,
    authorRoles: ["READ", "WRITE"],
  };
  const tokens = myJwt.generateTokens(payload);
  author.author_token = tokens.refreshToken;
  await author.save();
  res.cookie("refreshToken", tokens.refreshToken, {
    maxAge: config.get("refresh_ms"),
    httpOnly: true,
  });
  res.status(200).send({ ...tokens });
};

const logoutAuthor = async (req, res) => {
  const { refreshToken } = req.cookies;
  let author;
  if (!refreshToken)
    return res.status(400).send({ message: "Token topilmadi" });
  author = await Author.findOneAndUpdate(
    { author_token: refreshToken },
    { author_token: "" },
    { new: true }
  );
  if (!author) return res.status(400).send({ message: "Token topilmadi" });
  res.clearCookie("refreshToken");
  return res.status(200).send({ author });
};

const deleteAuthor = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ message: "Incorrect ID" });
    }
    const author = await Author.deleteOne({ _id: req.params.id });
    if (!author) {
      return res.status(400).send({ message: "Author topilmadi" });
    }
    res.json({ message: "Author o'chirildi" });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addAuthor,
  getAuthors,
  getAuthorsById,
  updateAuthor,
  deleteAuthor,
  loginAuthor,
  logoutAuthor,
  refreshAuthorToken,
  authorActivate
};
