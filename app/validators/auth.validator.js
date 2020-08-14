let raiseErr = async (req) => {
    let errors = await req.getValidationResult();
    if (!errors.isEmpty()) {
        let err = errors.array();
        let firstError = err.map(error => error.msg)[0];
        return firstError;
    }
    return null;
}

let signUpValidator = async (req) => {
    req.check('email', 'email is required.').not().isEmpty();
    req.check('email', 'Invalid email.').isEmail();
    req.check('username', 'username is required.').not().isEmpty();
    req.check('username', 'Username must be more than 4 characters').isLength({min:4});
    req.check('password', 'password is required.').not().isEmpty();
    req.check('password', 'Password must be more than 6 characters').isLength({min:6});
    
    //check for errors
    return await raiseErr(req);
}

let signInValidator = async (req) => {
    req.check('username', 'username is required.').not().isEmpty();
    req.check('username', 'Username must be more than 4 characters').isLength({min:4});
    req.check('password', 'password is required.').not().isEmpty();
    req.check('password', 'Password must be more than 6 characters').isLength({min:6});

    //check for errors
    return await raiseErr(req);
}

module.exports = {
    signUpValidator,
    signInValidator
};
