const apiErrorHandler = (error, req, res) => {
  // TODO log error
  res.status(500).send({ error: error.message || error.toString() });
};

module.exports = apiErrorHandler;
