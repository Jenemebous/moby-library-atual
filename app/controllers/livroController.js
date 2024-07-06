const LivroDAO = require('../daos/livroDAO');

exports.renderizarAdicionar = (req, res) => {
    res.render('adicionar');
};

exports.renderizarEditar = (req, res) => {
    res.render('editar');
};

exports.renderizarRemover = (req, res) => {
    res.render('remover');
};

exports.visualizarLivros = (req, res) => {
    LivroDAO.buscarTodosPorUsuario(req.session.usuario.id_usuario, (error, livros) => {
        if (error) {
            console.error('Erro ao buscar livros:', error);
            return res.status(500).send('Erro ao buscar livros');
        }
        res.render('visualizar', { livros });
    });
};

exports.buscarLivros = (req, res) => {
    const searchTerm = req.query.search;
    const id_usuario = req.session.usuario.id_usuario;
    const callback = (error, livros) => {
        if (error) {
            console.error('Erro ao buscar livros:', error);
            return res.status(500).send('Erro ao buscar livros');
        }
        res.render('visualizar', { livros });
    };

    if (searchTerm) {
        LivroDAO.buscarPorTermoDePesquisa(searchTerm, id_usuario, callback);
    } else {
        LivroDAO.buscarTodosPorUsuario(id_usuario, callback);
    }
};

exports.livrosDoUsuario = (req, res) => {
    LivroDAO.buscarTodosPorUsuario(req.session.usuario.id_usuario, (error, livros) => {
        if (error) {
            console.error('Erro ao buscar livros:', error);
            return res.status(500).send('Erro ao buscar livros');
        }
        res.json(livros);
    });
};

exports.adicionarLivro = (req, res) => {
    const { titulo, autor, genero, ano_de_publicacao, sinopse } = req.body;
    const id_usuario = req.session.usuario.id_usuario;

    if (!titulo || !autor || !genero || !ano_de_publicacao || !sinopse) {
        return res.render('adicionar', { mensagem: 'Todos os campos são obrigatórios', tipo: 'erro' });
    }

    LivroDAO.adicionar(titulo, autor, genero, ano_de_publicacao, sinopse, id_usuario, (error) => {
        if (error) {
            console.error('Erro ao adicionar livro:', error);
            return res.render('adicionar', { mensagem: 'Erro ao adicionar livro', tipo: 'erro' });
        }
        res.render('adicionar', { mensagem: 'Livro adicionado com sucesso', tipo: 'sucesso' });
    });
};

exports.removerLivros = (req, res) => {
    const { id_livro } = req.body;
    const id_usuario = req.session.usuario.id_usuario;

    LivroDAO.buscarTodosPorUsuario(id_usuario, (error, livros) => {
        if (error) {
            console.error('Erro ao buscar livros:', error);
            return res.render('remover', { mensagem: 'Erro ao buscar livros', tipo: 'erro' });
        }

        const livro = livros.find(livro => livro.id_livro == id_livro);
        if (!livro) {
            return res.render('remover', { mensagem: 'Você não tem permissão para remover este livro', tipo: 'erro' });
        }

        LivroDAO.remover(id_livro, (error) => {
            if (error) {
                console.error('Erro ao remover livro:', error);
                return res.render('remover', { mensagem: 'Erro ao remover livro', tipo: 'erro' });
            }
            res.render('remover', { mensagem: 'Livro removido com sucesso', tipo: 'sucesso' });
        });
    });
};

exports.editarLivro = (req, res) => {
    const { id, titulo, autor, sinopse } = req.body;

    if (!id || !titulo || !autor || !sinopse) {
        return res.render('editar', { mensagem: 'Todos os campos são obrigatórios', tipo: 'erro' });
    }

    LivroDAO.editar(id, titulo, autor, sinopse, (error) => {
        if (error) {
            console.error('Erro ao editar livro:', error);
            return res.render('editar', { mensagem: 'Erro ao editar livro', tipo: 'erro' });
        }
        res.render('editar', { mensagem: 'Livro editado com sucesso', tipo: 'sucesso' });
    });
};
