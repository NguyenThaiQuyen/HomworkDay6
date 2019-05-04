const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3001;
const userController = require('./controllers/users');
const userMiddleware = require('./middlewares/users');

app.use(bodyParser.json({ type: 'application/json' }));

app.get('/api/v1/users', userMiddleware.getListUser, userController.getListUser); // get list user
app.get('/api/v1/users/:id', userMiddleware.getUser, userController.getUser); // get one user by id
app.post('/api/v1/users', userMiddleware.createUser, userController.createUser); // create new user
app.delete('/api/v1/users/:id', userMiddleware.deleteUser, userController.deleteUser); // delete one user by id
app.put('/api/v1/users/:id', userMiddleware.updateUser, userController.updateUser); // update one user by id

app.use((err, req, res, next) => {
    console.error(err);
    return res.status(400).json({
        message: err.message
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});