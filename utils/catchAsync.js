const catchAsync = (fn) => {
  const catchErrorHandler = (req, res, next) => {
    fn(req, res, next).catch(next);
  };
  return catchErrorHandler;
};

module.exports = catchAsync;
