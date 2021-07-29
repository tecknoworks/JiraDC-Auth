const controller = require('../controllers/users');
const validateToken = require('../utils/validate_token');

module.exports = (router) => {
    router.route('/users')
        .get(validateToken, controller.getAll);

    router.route('/signup')
        .post(controller.register);

    router.route('/login')
        .post(controller.login);

    router.route('/authorise')
        .get(controller.authorise);
        
    return router
};