/**Higher order wrapper function eliminating the use of try catch block */
module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(err => next(err));
  };
};
