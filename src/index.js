require('dotenv').config();
const express = require('express');
const sequelize = require('./models/index');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');

// Usar rutas
app.use('/api/users', userRoutes);
app.use('/api/schedules', scheduleRoutes);

// Manejo de errores global
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// Sincronizar modelos y iniciar servidor
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}).catch((err) => {
  console.error('No se pudo conectar a la base de datos:', err);
});

module.exports = app; // Para pruebas
