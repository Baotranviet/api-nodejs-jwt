let raiseErr = async (req) => {
    let errors = await req.getValidationResult();
    if (!errors.isEmpty()) {
      let err = errors.array();
      let firstError = err.map(error => error.msg)[0];
      return firstError
    }
    return null;
  }

let borrowValidator = async (req) => {
    req.check('cardNumber', 'cardNumber is required.').not().isEmpty();
    req.check('bookCode', 'bookCode is required.').not().isEmpty();
    req.check('borrowDate', 'borrowDate is required.').not().isEmpty();
    req.check('borrowDate', 'Invalid borrowDate').toDate("dd-mm-YYYY");
    req.check('payDate', 'payDate is required.').not().isEmpty();
    req.check('payDate', 'Invalid payDate').toDate("dd-mm-YYYY");
    req.check('payDate', 'The payDate must be after the date the book is borrowed').isAfter(req.borrowDate);

    //check for errors
    return await raiseErr(req);
}

module.exports = {
    borrowValidator,
};