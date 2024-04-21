const express = require('express');
const { PrismaClient } = require('@prisma/client');
const mysql = require('mysql');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());


app.use(cors({
    origin: '*'
}));

app.get('/', (req, res) => {
    return res.json("from backend side")
});

async function getDataFromTwoTables() {
    try {
        // Fetch data from TableA along with related data from TableB
        const data = await prisma.match.findMany({
            include: {
                rounds: true, // Include related data from TableB
            },
        });

        // Optionally, map or process the retrieved data as needed
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}


app.get('/user', async (req, res) => {
    try {



        const data = await getDataFromTwoTables();

        res.json(data);

    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



async function uploadGameResults(gameData) {
    try {
        // Destructure game data
        const { player1, totalPointsplayer1, player2, totalPointsplayer2, winner, winningpoint, rounds } = gameData;

        // Create game record
        const match = await prisma.match.create({
            data: {
                player1,
                totalPointsplayer1,
                player2,
                totalPointsplayer2,
                winner,
                winningpoint,
                rounds: {
                    create: rounds.map(roundData => ({
                        //   round: roundData.round,
                        player1choice: roundData.player1choice,
                        player2choice: roundData.player2choice,
                        player1score: roundData.player1score,
                        player2score: roundData.player2score
                    }))
                }
            },
            include: {
                rounds: true
            }
        });

        return match
        console.log(match)
    } catch (error) {
        console.error('Error uploading game data:', error);
        throw error;
    }
}






app.post('/match', async (req, res) => {
    console.log("api triggered post")
    console.log("ravi")
    console.log(req.body)
    const newData = await uploadGameResults(req.body);
    res.send(newData);

});



const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port k ${PORT}`));

