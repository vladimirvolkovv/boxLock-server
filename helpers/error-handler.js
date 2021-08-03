function errorHandler(err, req, res, next) {
  if (err === "UnathorizedError") {
    //jwt authentifation error
    return res.status(401).json({ message: "Пользователь не авторизован" });
  }

  if (err.name === "ValidationError") {
    //validation error
    return res.status(401).json({ message: err });
  }

  if (err.message === "jwt malformed") {
    //validation error
    return res.status(401).json({ message: "Токен недействительный!" });
  }

  //default to 500 server error
  return res.status(500).json({ message: err });
}

module.exports = errorHandler;
