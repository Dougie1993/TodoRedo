const model = require("../models")
const List = model.list

exports.create = (req, res) => {
    //Create a new lists in db and return new list document
    let title = req.body.title

    let newList = new List({
        title,
        _userId: req.user_id
    })
    newList.save().then((listDoc) => {
        res.send(listDoc)
    })
}

exports.findAll = (req, res) => {
     //Get Array of all the lists in db that belong to the authenticated user
    List.find({
        _userId: req.user_id
    }).then((lists) => {
       res.send(lists)
    }).catch((e) => {
       res.sendStatus(405).send(e)
    })
}

exports.findOne = (req, res) => {
    List.findOne({
        _id: req.params.listId
    }).then((list) => {
        res.send(list)
    }).catch(err => {
        res.status(500).send({
            message: `List with id ${req.params.listId} does not exist`
        })
    })
}

exports.findAndUpdate = (req, res) => {
    //Update a list in db and return updated list document
    List.findOneAndUpdate({ _id: req.params.listId, _userId: req.user_id}, { 
        // the 2nd parametre is to make sure user updates their own list 
        $set: req.body
    }).then(() => {
        res.send({
            message: 'Updated successfully'
        })  
    })
}

exports.removeOne = (req, res) => {
    //Remove a list item in db
    List.findOneAndRemove({_id: req.params.listId, _userId: req.user_id}
        ).then((removedListDoc) => {
            res.send(removedListDoc);

            // remove the tasks associated with that list
            // deleteTasksFromList(removedListDoc._id);
        })
}

exports.removeAll = (req, res) => {
    List.deleteMany({
        _userId: req.user_id
    }).then((removedLists) => {
        res.send({
            message: ' Lists successfully deleted'
        })
    })
}