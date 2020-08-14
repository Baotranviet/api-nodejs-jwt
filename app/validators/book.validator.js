let raiseErr = async (req) => {
    let errors = await req.getValidationResult();
    if (!errors.isEmpty()) {
        let err = errors.array();
        let firstError = err.map(error => error.msg)[0];
        return firstError;
    }
    return null;
}

let bookValidator = async (req) => {
    req.check('bookCode', 'bookCode is required.').not().isEmpty();
    req.check('bookName', 'bookName is required.').not().isEmpty();
    req.check('pageNumber', 'pageNumber is required.').not().isEmpty();
    req.check('pageNumber', 'Invalid pageNumber.').isInt({ gt: 1 });
    req.check('quantity', 'quantity is required.').not().isEmpty();
    req.check('quantity', 'Invalid quantity.').isInt({ gt: 1 });
    req.check('authorId', 'authorId is required.').not().isEmpty();
    
    //check for errors
    return await raiseErr(req);
}

module.exports = {
    bookValidator
};