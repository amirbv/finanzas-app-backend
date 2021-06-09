module.exports = app => {
    const tutorials = require('../controllers/tutorial.controller');

    var router = require('express');

    //Create a new tutorial
    router.post("/", tutorials.create);

    //Retrieve all tutorials
    router.get("/", tutorials.findAll);

    //Retrieve all published tutorials
    router.get("/published", tutorials.findAllPublished);

    //Retrive a single tutorial with id
    router.get("/:id", tutorials.findOne);

    //Update a tutorial with id
    router.put("/:id", tutorials.update);

    //Delete a tutorial with id
    router.delete("/:id", tutorials.delete);

    //Delete all tutorials
    router.delete("/", tutorials.deleteAll);

    app.use("/api/tutorials", router);
};