const express = require('express');
const router = express.Router();

const livroController = require('../app/controllers/livroController');
const usuarioController = require('../app/controllers/usuarioController');
const authController = require('../app/controllers/authController');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/adicionar', authController.verificarLogin, livroController.renderizarAdicionar);

router.get('/editar', authController.verificarLogin, livroController.renderizarEditar);

router.get('/remover', authController.verificarLogin, livroController.renderizarRemover);

router.get('/visualizar', authController.verificarLogin, livroController.visualizarLivros);

router.get('/home-logado', authController.verificarLogin, usuarioController.renderizarHomeLogado);

router.get('/usuario', usuarioController.listarUsuarios);

router.get('/livros', authController.verificarLogin, livroController.buscarLivros);

router.get('/livrosDoUsuario', authController.verificarLogin, livroController.livrosDoUsuario);

router.post('/adicionarLivro', authController.verificarLogin, livroController.adicionarLivro);

router.post('/removerLivros', authController.verificarLogin, livroController.removerLivros);

router.post('/editarLivro', livroController.editarLivro);

router.get('/perfil', authController.verificarLogin, usuarioController.renderizarPerfil);

router.post('/login', authController.login);

router.post('/register', usuarioController.registrar);

router.get('/logout', authController.logout);

module.exports = router;
