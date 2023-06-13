const errorHandler = (res, error) => {
  res.status(500).send({ message: `Catolik: ${error}` });
};

module.exports = {
  errorHandler,
};
