# moby-library

instale: npm install bcrypt body-parser cookie-parser ejs express express-ejs-layouts express-session method-override  mysql mysql2 prompt-sync nodemon --save OU npm i

//

Para rodar o servidor após o npm i, utilize: npm run dev

//

banco de dados: CREATE SCHEMA IF NOT EXISTS moby; CREATE TABLE IF NOT EXISTS users ( id_usuario INT AUTO_INCREMENT PRIMARY KEY, nom_usuario VARCHAR(20), senha VARCHAR(100) );


CREATE TABLE IF NOT EXISTS livro ( id_livro INT AUTO_INCREMENT PRIMARY KEY, id_usuario INT, titulo VARCHAR(100) NOT NULL, autor VARCHAR(100) NOT NULL, genero VARCHAR(50), ano_de_publicacao INT, sinopse TEXT, FOREIGN KEY (id_usuario) REFERENCES users(id_usuario) );

