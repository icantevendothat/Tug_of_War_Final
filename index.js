const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
// const pressCounts = {
//     left: 0,
//     right: 0
// };
let left = 0;
let right = 0;

app.use('/', express.static ('public', { 'extensions': ['css'] }));

io.on('connection', (socket) => {
    console.log('a user connected');

    // socket.emit('updateImagePosition', imagePosition);

    // WORKING CODE
    socket.on('updateImagePosition', (imagePosition) => {
        console.log(imagePosition);
        io.emit('imagePositionUpdate', imagePosition); 
    });

    socket.on('left', ()=>{
        // pressCounts.left;
        console.log(left);
        left++
        io.emit('left', left);
    });
        // socket.on('left-press-count', (leftPressCount) => {
    //     console.log(leftPressCount);
    //     io.emit('left-press-count', leftPressCount);
    // });

    // socket.on('right-press-count', (rightPressCount) => {
    //     console.log(leftPressCount);
    //     io.emit('right-press-count', rightPressCount);
    // });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('listening on *:3000');
});


/////////////////////////////////////
//mongodb//
////////////////////////////


const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://aps659:SNLsucks2002@cluster1.qqv8xic.mongodb.net/?retryWrites=true&w=majority");

db.on("ready", () => {
    console.log("Connected to the database");
});
db.connect();

app.use(express.json());

let leaderboard = [];

app.post('/winner', (req, res)=> {
    console.log(req.body);
    let currentDate = Date();
    let obj = {
        date: currentDate,
        winner: req.body.number
    }

    db.push("leaderboardData", obj);
    // leaderboard.push(obj);
    // console.log(leaderboard);
    res.json({task:"success"});
})

app.get('/getLeaderboard', (req,res) =>{
    db.get("leaderboardData").then(winnerData => {
        let obj = {data: winnerData};
        res.json(obj);
    })
   
})