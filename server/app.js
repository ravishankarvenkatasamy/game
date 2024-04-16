const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());


app.use(cors({
    origin: '*'
}));

// const db = mysql.createConnection({
//     host: "127.0.0.1",
//     user: "root",
//     password: "",
//     database: "users"
// })
const db = mysql.createConnection({
    host: "rds-test.cpqsuoaisbcj.ap-south-1.rds.amazonaws.com",
    user: "admin",
    password: "rootpassword",
    database: "rds-test"
})






app.get('/', (req, res) => {
    return res.json("from backend side")

});

app.get('/user', (req, res) => {
    console.log("api triggered get")
    const sql = "SELECT * FROM user"
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data)
    })

});
app.post('/user', (req, res) => {
    console.log("api triggered post")

    const sql = "INSERT INTO user (`player1`, `totalPointsplayer1`, `player2`, `totalPointsplayer2`, `winner`, `winningPoint`, `rounds`) VALUES (?)"
    const values = [
        req.body.player1,
        req.body.totalPointsplayer1,
        req.body.player2,
        req.body.totalPointsplayer2,
        req.body.winner,
        req.body.winningPoint,
        req.body.rounds

    ]
    console.log(sql)
    db.query(sql, [values], (err, data) => {
        if (err) { return res.json(err) }
        return res.json(data);
    })
});



const PORT = 8081;
app.listen(PORT, () => console.log(`Server running on port k ${PORT}`));

