const fs = require('fs');

// get info one user
getUser = (req, res, next) => {
    try {
        const getIdUser = parseInt(req.params.id);

        let listUserExist = fs.readFileSync('users.json', 'utf8');
        listUserExist = JSON.parse(listUserExist);

        const getUser = listUserExist.find((item) => {
            return item.id === getIdUser;
        });

        if (typeof getUser === 'undefined') {
            return next(new Error('Not found user!' + getIdUser));  
        }

        return res.json({
            message: 'List users',
            data: getUser
        });
    } catch (e) {
        return next(new Error('Something went wrong!'));
    }
};

// get info list user
getListUser = (req, res, next) => {
    try {
        let listUserExist = fs.readFileSync('users.json', 'utf8');
        listUserExist = JSON.parse(listUserExist);

        return res.json({
            message: 'List users',
            data: listUserExist
        });
    } catch (e) {
        return next(new Error('Something went wrong!'));
    }
};

// create new user
createUser = (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const newUser = {
            username: username,
            password: password
        };

        let listUserExit = fs.readFileSync('users.json', 'utf8');

        if (!listUserExit) {
            listUserExit = [];
        } else {
            listUserExit = JSON.parse(listUserExit);
            if (!Array.isArray(listUserExit)) {
                return res.status(400).json({
                    message: 'Database error'
                });
            }
        };

        newUser.id = listUserExit.length + 1;
        listUserExit.push(newUser);

        fs.writeFileSync('users.json', JSON.stringify(listUserExit));
        return res.json({
            message: 'Create new user successfully',
            data: newUser
        });
    } catch (e) {
        return next(new Error('Something went wrong'));
    }
};

// delete user
deleteUser = (req, res, next) => {
    try {
        const deleteUserId = parseInt(req.params.id);

        let listUserExist = fs.readFileSync('users.json', 'utf8');
        listUserExist = JSON.parse(listUserExist);
        const userIndex = listUserExist.findIndex((item, index) => {
            if (item.id === deleteUserId) {
                return true;
            }
        });

        if (userIndex !== -1) {
            listUserExist.splice(userIndex, 1);
            fs.writeFileSync('users.json', JSON.stringify(listUserExist));
        } else {
            return next(new Error('Not found user!'));
        };

        return res.json({
            message: 'Delete user ' + deleteUserId + ' successfully!'
        });
    } catch (e) {
        return next(new Error('Something went wrong!'));
    }
};

// update user
updateUser = (req, res, next) => {
    try {
        const updateUserId = parseInt(req.params.id);
        const username = req.body.username;
        const password = req.body.password;

        let listUserExist = fs.readFileSync('users.json', 'utf8');
        listUserExist = JSON.parse(listUserExist);
        const userIndex = listUserExist.findIndex((item) => {
            if (item.id === updateUserId) {
                return true;
            }
        });

        if (userIndex !== -1) {
            listUserExist[userIndex].username = username || listUserExist[userIndex].username;
            listUserExist[userIndex].password = password || listUserExist[userIndex].password;
            fs.writeFileSync('users.json', JSON.stringify(listUserExist));
        } else {
            return next(new Error('Not found user!'));
        };

        return res.json({
            message: 'Update user ' + updateUserId + ' successfully!'
        });
    } catch (e) {
        return next(new Error('Something went wrong!'));
    }
};

module.exports = {
    getUser : getUser,
    getListUser : getListUser,
    createUser : createUser,
    deleteUser : deleteUser,
    updateUser : updateUser
};