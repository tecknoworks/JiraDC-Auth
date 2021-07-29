const service = require('../services/users');

module.exports = {
    register: async (req, res) => {
        let result = await service.register(req.body);
        res.status(result.status).send(result.response);
    },
    login: async (req, res) => {
        let result = await service.login(req.body);
        res.status(result.status).send(result.response);
    },
    getAll: async (req, res) => {

        User.find({}, (err, users) => {
            if (!err) {
                console.log(req.decoded);
                
                res.send(users);
            } else {
                console.log('Error', err);
            }
        });
    },
    authorise: (req, res) => {
        var token = req.query.token;
        var result = service.validateToken(token);
        res.status(result.status).send({userId:result.response.userId});
    }
}