const { query } = require('express');
var express = require('express');
var router = express.Router();
var db = require('../config/db');

//todo list 오늘 글만
router.get('/todo/list', (req, res) => {
    // const sqlQuery = "select * from todolist"
    const sqlQuery = "SELECT id, todoText, DATE_FORMAT(time,'%y-%m-%d') as time, completed FROM todolist where time =  DATE_FORMAT(now(),'%y-%m-%d');"
    db.query(sqlQuery, (err, result) => {
        if (!err) {
            console.log('The solution is : ', result);
            res.send(result);
        }
        else
            console.log('Error while performing Query', err);
    })
});
router.get('/todo/all', (req, res) => {
    const sqlQuery = "select id, todoText, DATE_FORMAT(time,'%y-%m-%d') as time, completed from todolist";
    // const sqlQuery = "SELECT id, todoText, DATE_FORMAT(time,'%y-%m-%d') as time FROM todolist order by DATE_FORMAT(time,'%y-%m-%d');"
    db.query(sqlQuery, (err, result) => {
        if (!err) {
            console.log('The solution is : ', result);
            res.send(result);
        }
        else
            console.log('Error while performing Query', err);
    })
});
//group by
// router.get('/todo/list/day', (req, res) => {
//     const sqlQuery = "SELECT id, todoText, DATE_FORMAT(time,'%y-%m-%d') as time FROM todolist group by time having time != DATE_FORMAT(now(),'%y-%m-%d');";
//     db.query(sqlQuery, (err, result) => {
//         if (!err) {
//             console.log('The solution is : ', result);
//             res.send(result);
//         }
//         else
//             console.log('Error while performing Query', err);
//     })
// });
router.get('/todo/list/day', (req, res) => {
    const sqlQuery = "SELECT id, todoText, DATE_FORMAT(time,'%y-%m-%d') as time FROM todolist group by time;";
    db.query(sqlQuery, (err, result) => {
        if (!err) {
            console.log('The solution is : ', result);
            res.send(result);
        }
        else
            console.log('Error while performing Query', err);
    })
});
router.get('/todo/list/day/select/:time', (req, res) => {
    const sqlQuery = "select id, todoText, DATE_FORMAT(time,'%y-%m-%d') as time, completed from todolist where time = ?;";
    const params = [req.params.time];
    db.query(sqlQuery, params, (err, result) => {
        if (!err) {
            console.log('The solution is : ', result);
            res.send(result);
        }
        else
            console.log('Error while performing Query', err);
    })

})
//todo 작성
router.post('/todo/insert', (req, res) => {
    const sqlQuery = "insert into todolist (todoText, time) values ( ?, DATE_FORMAT(now(),'%y-%m-%d'))";
    const todoText = req.body.todoText;
    db.query(sqlQuery, [todoText], (err, result) => {
        if (err) {
            console.log(`upload error : ${err}`);
            return res.sendStatus(500);
        }
        else {
            res.send('success!');
        }
    })
});
//ckeckbox true
router.post('/todo/checkbox/ckeck/:id', (req, res) => {
    // console.log('res:', res);
    const sqlQuery = "update todolist set completed = ? where id = ?;";
    const completed = req.body.completed;
    const id = req.body.id;
    const params = [completed, id]
    db.query(sqlQuery, params, (err, rows, fields) => {
        if (err) {
            console.log(`upload error : ${err}`);
            return res.sendStatus(500);
        }
        else {
            res.send(rows);
        }
    })
})
//todo 삭제
router.post('/todo/delete/:id', (req, res) => {
    const sqlQuery = 'delete from todolist where id = ?';
    const params = [req.params.id];
    db.query(sqlQuery, params, (err, rows, fields) => {
        res.send(rows);
    })
})
//오늘todo 삭제
router.get('/todo/delete/today', (req, res) => {
    const sqlQuery = "delete from todolist where time = DATE_FORMAT(now(),'%y-%m-%d');"
    db.query(sqlQuery, (err, rows, fields) => {
        if (err) {
            console.log(`upload error : ${err}`);
            return res.sendStatus(500);
        }
        else {
            res.send(rows);
        }
    })
})
module.exports = router;