import { Router } from '../common/router';
import * as restify from 'restify';
import { User } from './users.model';

class UsersRouter extends Router {
    applyRoutes(application: restify.Server) {
        application.get('/users', (req, resp, next) => {
            User.find().then(users => {
                resp.json(users)
                return next();
            })
        })

        application.get('/users/:id', (req, resp, next) => {
            User.findById(req.params.id).then(user => {//Captura o id do paramêtro
                if (user) {
                    resp.json(user)
                    return next();
                }
                resp.send(404);
                return next();
            });
        })

        application.post('/users', (req, resp, next) => {
            let user = new User(req.body);//Colocando o body inteiro, o contrutor já recebe o objeto completo, ou caso seja criação especifica Ex: user.name = req.body.name;
            user.save().then(user => {
                user.password = undefined; //Garante que não exiba o password do Usuário ao ser criado.
                resp.json(user);
                return next();
            })
        });

        application.put('/users/:id', (req, resp, next) => {
            const options = { overwrite: true }
            User.update({_id:req.params.id}, req.body, options)//Arg1: Captura o id do paramêtro, Arg2: Captura o body da requisição (URL);
                .exec()//Aqui ele recebe um query, o .exec executa essa query;
                .then(result => {
                    if (result.n) {//Result.n trás a quantidade de linhas que foram afetadas no update;
                        return User.findById(req.params.id).exec();
                    } else {
                        resp.send(404);
                    }
                }).then(user=>{
                    resp.json(user);
                    return next();
                })
        })

        application.patch('/users/:id', (req, resp, next) =>{
            const options = {new: true}//Força retornar o obj novo atualizado
            User.findByIdAndUpdate(req.params.id, req.body, options).then(user=>{
                if(user){
                    resp.json(user);
                    return next();
                }
                resp.send(404);
                return next();
            })
        })

    }
}

export const usersRouter = new UsersRouter();