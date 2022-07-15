const errorHandlerMiddleware = (err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    reqUrl: req.url,
    next,
  });
};

export default errorHandlerMiddleware;
