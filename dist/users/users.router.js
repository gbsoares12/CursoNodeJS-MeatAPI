"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_model_1 = require("./users.model");
class UsersRouter extends router_1.Router {
    applyRoutes(application) {
        application.get('/users', (req, resp, next) => {
            users_model_1.User.find().then(users => {
                resp.json(users);
                return next();
            });
        });
        application.get('/users/:id', (req, resp, next) => {
            users_model_1.User.findById(req.params.id).then(user => {
                if (user) {
                    resp.json(user);
                    return next();
                }
                resp.send(404);
                return next();
            });
        });
        application.post('/users', (req, resp, next) => {
            let user = new users_model_1.User(req.body); //Colocando o body inteiro, o contrutor já recebe o objeto completo, ou caso seja criação especifica Ex: user.name = req.body.name;
            user.save().then(user => {
                user.password = undefined; //Garante que não exiba o password do Usuário ao ser criado.
                resp.json(user);
                return next();
            });
        });
        application.put('/users/:id', (req, resp, next) => {
            const options = { overwrite: true };
            users_model_1.User.update({ _id: req.params.id }, req.body, options) //Arg1: Captura o id do paramêtro, Arg2: Captura o body da requisição (URL);
                .exec() //Aqui ele recebe um query, o .exec executa essa query;
                .then(result => {
                if (result.n) { //Result.n trás a quantidade de linhas que foram afetadas no update;
                    return users_model_1.User.findById(req.params.id).exec();
                }
                else {
                    resp.send(404);
                }
            }).then(user => {
                resp.json(user);
                return next();
            });
        });
        application.patch('/users/:id', (req, resp, next) => {
            const options = { new: true }; //Força retornar o obj novo atualizado
            users_model_1.User.findByIdAndUpdate(req.params.id, req.body, options).then(user => {
                if (user) {
                    resp.json(user);
                    return next();
                }
                resp.send(404);
                return next();
            });
        });
    }
}
exports.usersRouter = new UsersRouter();
