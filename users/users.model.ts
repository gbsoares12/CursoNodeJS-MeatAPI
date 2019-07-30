import * as mongoose from 'mongoose';

export interface User extends mongoose.Document{
    name: string,
    email: string,
    password: string
}

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        select: false // indica ao mongoose que não vai trazer esse campo nas querys
    }
});

export const User = mongoose.model<User>('User', userSchema);// Faz a assinatura do objeto como um User, que se extend a interface do mongoose, assim sendo reconhecido fora daqui