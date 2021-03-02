
const mysql = require("mysql")
const express = require('express')
var app = express()
const bodyparser = require("body-parser")

app.use(bodyparser.json(), (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  })

const mysqlConnection = mysql.createConnection({
    host: 'localhost', // O host do banco. Ex: localhost
    user: 'teste', // Um usuário do banco. Ex: user 
    password: '123456', // A senha do usuário. Ex: user123
    database: 'locadorabd' // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
   
});

mysqlConnection.connect((err)=>{
    if(!err){
        console.log('DB connection succeded.')
    }
    else{
        console.log('DB connection failed \n Erro: ' + JSON.stringify(err, undefined, 2))
    }

})

app.listen(3000, ()=> console.log("Express server is running at port: 3000"))

app.get('/retornaClientes', (req, res)=>{
    mysqlConnection.query("SELECT * FROM clientes", (err, rows, fields)=>{

        if(!err){
            res.send(rows)
        }
        else{
            console.log(err)
        }
    })
})


app.get('/retornaFilmes', (req, res)=>{
    mysqlConnection.query("SELECT * FROM filmes", (err, rows, fields)=>{

        if(!err){
            res.send(rows)
        }
        else{
            console.log(err)
        }
    })
})

app.get('/filmesAlugados', (req, res)=>{
    mysqlConnection.query("SELECT clientes.Cliente, filmes.nome, filmesalugados.DataAluguel, filmesalugados.DataDevolucao FROM locadorabd.filmes, locadorabd.clientes, locadorabd.filmesalugados where filmesalugados.idClientes = clientes.idClientes and filmesalugados.Filmes_idFilmes = filmes.idFilmes;", (err, rows, fields)=>{

        if(!err){
            res.send(rows)
        }
        else{
            console.log(err)
        }
    })
})


app.get('/quantidadeValor', (req, res)=>{
    mysqlConnection.query("SELECT res1.Cliente, res2.quantidade, res1.soma from (SELECT clientes.Cliente,sum(Valor) as soma FROM locadora.clientes, locadora.filmesalugados, locadora.filmes where filmesalugados.idClientes = clientes.idClientes and filmesalugados.Filmes_idFilmes = filmes.idFilmes group by clientes.idClientes) as res1, (SELECT clientes.Cliente, count(filmesalugados.idClientes) as quantidade FROM locadora.filmesalugados, locadora.clientes where filmesalugados.idClientes = clientes.idClientes group by clientes.idClientes) as res2 where res1.Cliente = res2.Cliente;", (err, rows, fields)=>{

        if(!err){
            res.send(rows)
        }
        else{
            console.log(err)
        }
    })
})


app.get('/retornaClientes/:id', (req, res)=>{
    mysqlConnection.query("SELECT * FROM clientes WHERE idClientes = ?", [req.params.id], (err, rows, fields)=>{

        if(!err){
            
            res.send(rows)
        }
        else{
            console.log(err)
        }
    })
})