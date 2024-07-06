const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const port = 3000;

// Configurações do Express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: '1234',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
}));

app.use(express.static('public'));
app.set('views', './app/views');
app.set('view engine', 'ejs');

// Rotas principais
const routes = require('./routes');
app.use('/', routes);

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
    console.log(`http://localhost:${port}`);
});
