const db = require("../models");
const Tutotrial = db.tutorials;
const Op = db.Sequelize.Op;

//Create and save a new tutorial
exports.create = (req, res) => {
    //Validate request
    if(!req.body.title){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    //Create a Tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published
    };

    //Save Tutorial in DB
    Tutotrial.create(tutorial)
    .then(data =>{
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error ocurred while creating the tutorial"
        });
    });

};

//Retrieve all tutorials from the database
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {title:{[Op.like]: `%${title}%`}}:null;
    
    Tutotrial.findAll({where: condition})
    .then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message:
            err.message || "Some error ocurred while retrieving tutorials"
        });
    });
};

//Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id)
        .then(data=>{
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:
                err.message || "Some error ocurred while retrieving tutorial with id: " + id
            });
        });
};

//Update a tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
        where: {id:id}
    })
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Tutorial was updated Successfully."
                });
            }else{
                res.send({
                    message: `Cannot update tutorial with id=${id}. Maybe tutorial was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Some error ocurred while updating tutorial with id: " + id
            });
        });
};

//Delete a tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
        where: {id: id}
    })
        .then(num => {
            if(num == 1){
                res.send({
                    message: `Tutorial with id=${id} was deleted successfully.`
                });
            }else{
                res.send({
                    message: `Cannot delete tutorial with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Some error ocurred while updating tutorial with id: " + id
            });
        });
};

//Delete all tutorials from the database
exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({
                message: `${nums} of tutorials was deleted from de db`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: 
                err.message || "Some error ocurred while removing tutorials"
            });
        });
};

//Find all published tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.findAll({where : {published : true}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                err.message || "Some error ocurred while retriveing tutorials"
            });
        });
};