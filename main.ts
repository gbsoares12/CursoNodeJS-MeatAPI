import { Server } from './server';
import { usersRouter } from './users/users.router';

const server = new Server();
//Array de rotas, será mandado para o bootstrap da classe server
server.bootstrap([usersRouter]).then(server => {

    console.log('Server is listening on: ', server.application.address());
}).catch(error => {
    console.log('Server failed to start')
    console.error(error);
    process.exit(1);
})



