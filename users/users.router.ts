import {Router} from '../common/router';
import * as restify from 'restify';
import {User} from './users.model';

class UsersRouter extends Router {
    applyRoutes(application: restify.Server){
        application.get('/users', (req, resp, next)=>{
            User.find().then(users=>{
                resp.json(users)
                return next();
            })
        })

    application.get('/users/:id', (req, resp, next)=>{
        User.findById(req.params.id).then(user=>{
            if(user){
                resp.json(user)
                return next();
            }
            resp.send(404);
            return next();
        });
    })

    application.post('/users', (req, resp, next)=>{
        let user = new User(req.body);//Colocando o body inteiro, o contrutor já recebe o objeto completo, ou caso seja criação especifica Ex: user.name = req.body.name;
        user.save().then(user=>{
            user.password = undefined; //Garante que não exiba o password do Usuário ao ser criado.
            resp.json(user);
            return next();
        })
    });

    }
}

export const usersRouter = new UsersRouter();