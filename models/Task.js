var express = require('express');
var db=require('../dbconnection'); //reference of dbconnection.js
var randomstring = require("randomstring");
 
var Task={

    //---> Não passo nada e recupero nome e matricula de todos os alunos
    getAllTasks:function(callback){
        return db.query("SELECT nome, matricula FROM base4.aluno LIMIT 0 , 30",callback);
    },

    //---> Passo cookie recebido no login e recupero dados do aluno
    getTaskById:function(cookie,callback){
        return db.query("SELECT t.ano, t.ve, t.vc, t.vf, t.er_escrita, t.er_oral, t.pontos, d.nome as disciplina, d.codigo as codigo_disciplina, a.nome as aluno FROM base4.aluno a, base4.disciplina d, base4.turma t, base4.cookie c WHERE t.aluno=a.id AND t.disciplina=d.id AND c.id_aluno=a.id AND c.cookie=?",[cookie],callback);
    },

    //---> Passo matricula e senha e recebo um cookie (fazer login)
    loginTask:function(matricula,senha){
        // -------------------------------------------------------------------------------------------------------------
        // -------------------------------------------------------------------------------------------------------------
        // FAZER: procurar em aluno a matricula que bate e ver se a senha bate tbm. Se a senha bater
        // gerar um cookie e inserir id do aluno que tem aquela senha e matricula na tabela de cookies junto com o cookie
        // retornar o cookie.
        // -------------------------------------------------------------------------------------------------------------
        // -------------------------------------------------------------------------------------------------------------
        var cookie = randomstring.generate();
        db.query("INSERT INTO base4.cookie (id_aluno, cookie) VALUES ((SELECT id FROM base4.aluno WHERE matricula=? AND senha=? LIMIT 0 , 30), ?)", [matricula,senha,cookie], function (err, result, fields) {
            // if any error while executing above query, throw error
            if (err) throw err;
            // if there is no error, you have the result
            console.log(result);
          });
        return cookie;
        // return db.query("SELECT cookie FROM base4.cookie WHERE id=LAST_INSERT_ID())",callback);
    },

    //--> Passo nome, matricula e senha e cadastro um novo usuario
    addTask:function(nome, matricula, senha, callback){
        return db.query("INSERT INTO base4.aluno (nome, matricula, senha) values(?,?,?)",[nome,matricula,senha],callback);
    }

    // deleteTask:function(id,callback){
    //     return db.query("delete from task where Id=?",[id],callback);
    // },

    // updateTask:function(id,Task,callback){
    //     return db.query("update task set Title=?,Status=? where Id=?",[Task.Title,Task.Status,id],callback);
    // } 
};

module.exports=Task;
