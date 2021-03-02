
async function connect(){

    if( global.connection && global.connection.state !== "disconnected"){
        return global.connection
    }
    const mysql = require("mysql2/promise")
    const connection = await mysql.createConnection("mysql://root:123456@localhost:3306/vendas") 
    console.log("conectou mysql")
    global.connection = connection
    return connection
}


async function selectVendas(){
    const con = await connect();
    const [rows] = await con.query("SELECT * FROM cliente;")
    return rows;

}

async function chama() {
    const vendas = await selectVendas()
    //vendas.map(Nome)
    for( i in vendas){
        console.log(vendas[i].Nome)

    }
    
}

chama()
