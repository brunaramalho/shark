var db=require('../dbconnection'); //reference of dbconnection.js
 
var Task={
    getAllTasks:function(callback){
        return db.query("SELECT * FROM base4.aluno LIMIT 0 , 30",callback);
    },

    getTaskById:function(matricula,callback){
        return db.query("SELECT t.ano, t.ve, t.vc, t.vf, t.er_escrita, t.er_oral, t.pontos, d.nome as disciplina, d.codigo as codigo_disciplina, a.nome as aluno FROM base4.aluno a, base4.disciplina d, base4.turma t WHERE t.aluno=a.id AND t.disciplina=d.id AND a.matricula=?",[matricula],callback);
    },

    addTask:function(nome, matricula,callback){
        return db.query("INSERT INTO base4.aluno (nome, matricula) values(?,?)",[nome,matricula],callback);
    },

    // deleteTask:function(id,callback){
    //     return db.query("delete from task where Id=?",[id],callback);
    // },

    // updateTask:function(id,Task,callback){
    //     return db.query("update task set Title=?,Status=? where Id=?",[Task.Title,Task.Status,id],callback);
    // } 
};

module.exports=Task;
