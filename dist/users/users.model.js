"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
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
exports.User = mongoose.model('User', userSchema); // Faz a assinatura do objeto como um User, que se extend a interface do mongoose, assim sendo reconhecido fora daqui
