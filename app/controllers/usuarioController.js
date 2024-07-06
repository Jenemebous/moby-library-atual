const LivroDAO = require('../daos/livroDAO');
const UsuarioDAO = require('../daos/usuarioDAO');

exports.renderizarHomeLogado = (req, res) => {
    res.render('home-logado', { nom_usuario: req.session.nom_usuario });
};

exports.renderizarPerfil = (req, res) => {
    LivroDAO.buscarTodosPorUsuario(req.session.usuario.id_usuario, (error, livros) => {
        if (error) {
            console.error('Erro ao buscar livros:', error);
            return res.status(500).send('Erro ao buscar livros');
        }

        const cincoPrimeirosLivros = livros.slice(0, 5);
        res.render('perfil', { nom_usuario: req.session.nom_usuario, livros: cincoPrimeirosLivros });
    });
};

exports.listarUsuarios = (req, res) => {
    UsuarioDAO.buscarTodos((error, resultados) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao buscar usuários" });
        }
        res.status(200).json(resultados);
    });
};

exports.registrar = (req, res) => {
    const { nom_usuario, senha } = req.body;

    if (senha.length !== 8) {
        res.render('signup', { error: 'Senha deve ter exatamente 8 caracteres' });
        return;
    }

    UsuarioDAO.buscarPorUsuario(nom_usuario, (error, usuarioEncontrado) => {
        if (error) {
            console.error('Erro ao buscar usuário:', error);
            res.render('signup', { error: 'Erro ao processar o registro' });
            return;
        }
        if (usuarioEncontrado) {
            res.render('signup', { error: 'Usuário já existe' });
            return;
        }
        UsuarioDAO.adicionar(nom_usuario, senha, (error) => {
            if (error) {
                console.error('Erro ao adicionar usuário ao banco de dados:', error);
                res.render('signup', { error: 'Erro ao processar o registro' });
                return;
            }
            res.redirect('/login');
        });
    });
};
