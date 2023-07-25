const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        console.log('Conectado exitosamente a la base de datos');
    } catch (error) {
        throw new Error('Error al conectar a la base de datos');
    }
}

module.exports = {
    dbConnection
}