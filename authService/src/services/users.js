const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function createToken(userId){
    const payload = { userId: userId };
    const options = { expiresIn: '2d' };
    const token = jwt.sign(payload, "secret", options);  
    return token 
}

module.exports = {
    register: async function (userData) {
        let result = {};
        var user = new User(userData);
        try {
            user = await user.save()
            user = user.toObject();
            user.token = createToken(user.id);

            result.status = 200;
            result.response = user;
        } catch (err) {
            console.log(err.message);
            
            result.status = 500;
            result.response = err;
        } finally {
            return result;
        }

    },
    login: async function (loginData) {
        const { username, password } = loginData;
        console.log(loginData);

        let result = {};
        try {
            let user = await User.findOne({ username });
            let match = await bcrypt.compare(password, user.password)
            console.log(match);

            if (match) {
                user = user.toObject();
                user.token = createToken(user.id);

                result.status = 200;
                result.response = user;
            } else {
                result.status = 401;
                result.response = "Username or password is incorrect";
            }
            return result
        } catch (err) {
            console.log(err.message);

            result.status = 404;
            result.response = "Username or password is incorrect";
            return result
        }

    },
    validateToken: function (token) {
        const options = {
            expiresIn: '2d'
        };
        var result={};
        try {
            userId = jwt.verify(token, "secret", options);

            result.response = userId;
            result.status = 200;
        } catch (err) {
            result.response = 'Atuthorisation error. Token required.';
            result.status = 401;
        } finally {
            return result;
        }
    }
}