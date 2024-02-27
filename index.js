import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.error('Error al conectar a la base de datos:', error));

const port = process.env.PORT || 4000;

app.set('view engine', 'pug');

app.use( (req, res, next) => {
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';

    next();
} )

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/', router);

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});