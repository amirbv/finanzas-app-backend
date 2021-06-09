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
    origin: "http://localhost:8080"
};

//Parse request of content-type to application/json
app.use(cors(corsOptions));

//Parse request of content-type to application/x-www-form-urlencode
app.use(express.urlencoded({extended: true}));

//Simple route
app.get("/", (req, res)=>{
    res.json({message:"Welcome to the application"});
});

require("./app/routes/tutorials.routes");

//Set port, listen for request
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

