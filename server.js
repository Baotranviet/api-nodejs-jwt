const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;
const db = require("./app/models");
const Role = db.role;

global.__basedir = __dirname;

var corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.json({ message: "Welcome to app"});
});

//routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/avatar.routes')(app);
require('./app/routes/author.routes')(app);
require('./app/routes/book.routes')(app);
require('./app/routes/borrower.routes')(app);
require('./app/routes/borrow.routes')(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// db.sequelize.sync({force: true}).then(() => {
//     console.log('Drop and Resync Db');
//     initial();
// });
db.sequelize.sync(); //for production

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });
    
    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}
