let raiseErr = async (req) => {
    let errors = await req.getValidationResult();
    if (!errors.isEmpty()) {
        let err = errors.array();
        let firstError = err.map(error => error.msg)[0];
        return firstError;
    }
    return null;
}

let authorValidator = async (req) => {
    req.check('name', 'name is required').not().isEmpty();
    req.check('name', 'name must be more than 4 characters').isLength({min:4});

    //check for errors
    return await raiseErr(req);
}

module.exports = {
    authorValidator
};