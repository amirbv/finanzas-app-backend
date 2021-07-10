require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const db = require("./app/models");

/*On development use
db.sequelize.sync({force: true}).then(()=>{
    console.log("Drop and re-sync db.");
});
*/

db.sequelize.sync();

var corsOptions = {
    origin: "*"
  };

app.use(cors(corsOptions));

//Parse request of content-type to application/json
app.use(express.json());

//Parse request of content-type to application/x-www-form-urlencode
app.use(express.urlencoded({extended: true}));

//Simple route
app.get("/", (req, res)=>{
    res.json({message:"Welcome to the application"});
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/users/users.routes')(app);
require('./app/routes/admin/admin.routes')(app);
require('./app/routes/states/states.routes')(app);
require('./app/routes/roles/roles.routes')(app);
require('./app/routes/currencyType/currencyType.routes')(app);
require('./app/routes/countries/countries.routes')(app);
require('./app/routes/banks/banks.routes')(app);

//Set port, listen for request
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

