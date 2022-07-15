const notFoundMiddleware = (req, res) => {
  res.status(404).send(`Route ${req.url} not found`);
};

export default notFoundMiddleware;
