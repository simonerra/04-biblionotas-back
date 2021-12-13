const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs');

const UsuariosSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

UsuariosSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

UsuariosSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = model('Usuario', UsuariosSchema);