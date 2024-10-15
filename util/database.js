const mysql=require('mysql2');
const pool=mysql.createPool({
    host:"localhost",
    user:"127.0.0.1",
    database:"node-complete",
    password:"Saketh@1234"
});
module.exports=pool.promise();