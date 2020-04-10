const express = require("express");
const app = express();
const Mysql = require("node-mysql-promise");
//https://www.npmjs.com/package/node-mysql-promise

// 创建连接
const mysql = Mysql.createConnection({
    host: 'localhost', // The ip address of cloud database instance, 云数据库实例ip地址
    port: '3306',
    user: 'root', // The name of cloud database, for example, root, 云数据库用户名，如root
    password: 'root', // Password of cloud database, 云数据库密码
    database: 'list', // Name of the cloud database, 数据库名称
    logSql:true,
})

app.use('/public', express.static('public'));

//解决跨域
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});



// add
app.get("/testadd", async (req, res) => {
    try {
        res.json({
            code: 'ok',
            result:await mysql.table('posts').add(req.query)
        })
    } catch (err) {
        res.json({
            code: '-1',
            msg: '请求失败'
        })
    }
})

// add
app.get("/add", async (req, res) => {
    try {
        const {name,age,birthday} = req.query;
        const data = {name,age,birthday};
        res.json({
            code: 'ok',
            result:await mysql.table('posts').add(data)
        })
    } catch (err) {
        res.json({
            code: '-1',
            msg: '请求失败'
        })
    }
})

// delete
app.get("/delete", async (req, res) => {
    try {
        const {id} = req.query;
        const data = {id};
        res.json({
            code: 'ok',
            result:await mysql.table('posts').where(data).delete()
        })
    } catch (err) {
        res.json({
            code: '-1',
            msg: '请求失败'
        })
    }
})



// update
app.get("/update", async (req, res) => {
    try {
        const {name,age,birthday} = req.query;
        const data = {name,age,birthday};
        res.json({
            code: 'ok',
            result:await mysql.table('posts').where({id:req.query.id}).update(data)
        })
    } catch (err) {
        res.json({
            code: '-1',
            msg: '请求失败'
        })
    }
})



// list
app.get("/getList", async (req, res) => {
    try {
        if(req.query.name){
            res.json({
                code: 'ok',
                result: await mysql.query(`SELECT * FROM posts WHERE name REGEXP '${req.query.name}'`)
            })
        }else{
            res.json({
                code: 'ok',
                result: await mysql.table('posts').select()
            })
        }
       
    } catch (err) {
        res.json({
            code: '-1',
            msg: '请求失败'
        })
    }
})

app.listen(3000, () => {
    console.log("http://localhost:3000");
})