const UserController = require('../controllers/user.controller')
const ListController = require('../controllers/list.controller')
const AuthPolicy = require('../policy/auth.policy')

module.exports = (app) => {
    
    // Create List
    app.post('/lists', 
    AuthPolicy.authenticate,
    ListController.create),

    // Get Lists
    app.get('/lists',
    AuthPolicy.authenticate,
    ListController.findAll),

    // Get List by Id
    app.get('/lists/:listId',
    AuthPolicy.authenticate,
    ListController.findOne),

    // Update List by Id
    app.patch('/lists/:listId',
    AuthPolicy.authenticate,
    ListController.findAndUpdate), 

    // Delete List by Id
    app.delete('/lists/:listId',
    AuthPolicy.authenticate,
    ListController.removeOne)

    // Delete All Lists belonging to that User
    app.delete('/lists',
    AuthPolicy.authenticate,
    ListController.removeAll)
}