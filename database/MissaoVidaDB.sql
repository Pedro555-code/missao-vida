create database db_missao_vida;
use db_missao_vida;

create table internos (
	id_interno int primary key auto_increment,
    nome varchar(150) not null,
    cpf varchar(11) not null,
    idade int not null,
    createdAt date not null,
    updatedAt date not null
);

select * from internos;