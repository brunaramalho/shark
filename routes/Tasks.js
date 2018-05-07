var express = require('express');
var router = express.Router();
var Task=require('../models/Task');

router.get('/:nome/:matricula/:senha',function(req,res,next){

    Task.addTask(req.params.nome, req.params.matricula, req.params.senha, function(err,rows){

        if(err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.get('/:matricula/:senha',function(req,res,next){

    var cookie = Task.loginTask(req.params.matricula, req.params.senha);
    res.json({ "cookie": cookie });
});

router.get('/:cookie',function(req,res,next){

         Task.getTaskById(req.params.cookie,function(err,rows){

            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
});

router.get('',function(req, res, nect){

    Task.getAllTasks(function(err,rows){
            
            if(err)
            {
                res.json(err);
            }
            else
            {
                res.json(rows);
            }
        });
});

// router.post('/',function(req,res,next){
 
// Task.addTask(req.body,function(err,count){
//   if(err)
//   {
//   res.json(err);
//   }
//   else{
//   res.json(req.body);//or return count for 1 &amp;amp;amp; 0
//   }
//   });
//  });

// router.delete('/:id',function(req,res,next){
 
// Task.deleteTask(req.params.id,function(err,count){
 
// if(err)
//   {
//   res.json(err);
//   }
//   else
//   {
//   res.json(count);
//   }
 
// });
//  });


// router.put('/:id',function(req,res,next){
 
// Task.updateTask(req.params.id,req.body,function(err,rows){
 
// if(err)
//   {
//   res.json(err);
//   }
//   else
//   {
//   res.json(rows);
//   }
//   });
//  });

module.exports=router;
