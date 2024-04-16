import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHandRock, FaHandPaper, FaHandScissors, FaHandSpock } from "react-icons/fa";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";



const actions = {
    stone: ["scissors"],
    paper: ["stone"],
    scissors: ["paper"],
};

function randomAction() {
    const keys = Object.keys(actions);
    const index = Math.floor(Math.random() * keys.length);

    return keys[index];
}

function calculateWinner(action1, action2) {
    if (action1 === action2) {
        return 0;
    } else if (actions[action1].includes(action2)) {
        return -1;
    } else if (actions[action2].includes(action1)) {
        return 1;
    }

    return null;
}

function ActionIcon({ action, ...props }) {
    const icons = {
        stone: FaHandRock,
        paper: FaHandPaper,
        scissors: FaHandScissors,
    };
    const Icon = icons[action];
    return <Icon {...props} />;
}

function Player({ name = "Player", score = 0, action = "stone" }) {
    return (
        <div className="player">

            <div className="score">{`${name}: ${score}`}</div>
            <div className="action">
                {action && <ActionIcon action={action} size={60} />}
            </div>
        </div>
    );
}

function ActionButton({ action = "stone", onActionSelected }) {
    return (
        <button className="round-btn" onClick={() => onActionSelected(action)}>
            <ActionIcon action={action} size={20} />
        </button>
    );
}



function App() {
    const [playerAction, setPlayerAction] = useState("");
    const [customAction, setcustomAction] = useState("");
    const [player1, setplayer1] = useState("");
    const [player2, setplayer2] = useState("");
    const [form, setForm] = useState(true);
    const [round, setround] = useState(0);
    const [objects, setObjects] = useState([]);
    const [allow, setAllow] = useState(false);


    const navigate = useNavigate();
    const [playerScore, setPlayerScore] = useState(0);
    const [PlayerTwoScore, setPlayerTwoScore] = useState(0);
    const [winner, setWinner] = useState(3);



    function ShowWinner({ winner }) {
        const text = {
            "-1": `${player1} win`,
            0: "It's a Tie",
            1: `${player2} win`,
        };

        return (
            <h2>{text[winner]}</h2>
        )
    }

    async function postdata(postdata) {
        localStorage.setItem("userdata", true);
        await axios.post('http://localhost:8081/user', postdata)
            .then((data) => {
                setAllow(false)
                console.log(data)
                navigate("/TableList");

            })
    }


    const onActionSelected = (selectedAction) => {
        const customAction = randomAction();

        setPlayerAction(selectedAction);
        setcustomAction(customAction);

        const newWinner = calculateWinner(selectedAction, customAction);
        setWinner(newWinner);
        var playerOneScore = 0
        var playerTwoScore = 0
        if (newWinner === -1) {
            playerOneScore = 1
            setPlayerScore(playerScore + 1);
        } else if (newWinner === 1) {
            playerTwoScore = 1
            setPlayerTwoScore(PlayerTwoScore + 1);
        }
        setround(round + 1)

        const newObject = {
            round: round,
            player1: player1,
            player2: player2,
            player1choice: selectedAction,
            player2choice: customAction,
            player1score: playerOneScore,
            player2score: playerTwoScore


        };
        setObjects(prevObjects => [...prevObjects, newObject]);
        console.log(objects)

        if (round == 6 || allow === true) {
            var result = ""
            var totalPoint = 0
            const winningPlayer1 = objects.filter((item) => { return item.player1score == 1 })
            const winningPlayer2 = objects.filter((item) => { return item.player2score == 1 })

            if (winningPlayer1.length > winningPlayer2.length) {
                result = player1
                totalPoint = winningPlayer1.length
            } else if (winningPlayer1.length < winningPlayer2.length) {
                result = player2
                totalPoint = winningPlayer2.length
            } else if (winningPlayer1.length == winningPlayer2.length) {
                setAllow(true)
                return false
            }
            const newObjectTwo = {
                player1: player1,
                totalPointsplayer1: winningPlayer1.length,
                player2: player2,
                totalPointsplayer2: winningPlayer2.length,
                winner: result,
                winningPoint: totalPoint,
                rounds: JSON.stringify(objects)

            }
            console.log(JSON.stringify(newObjectTwo))
            postdata(newObjectTwo)


        }
    };
    const onsubmit = () => {
        if (player1 != "" && player2 != "") {
            setForm(false)
        } else {
            alert('enter player name')

        }

    }
    const onList = () => {
        navigate("/TableList");

    }
    return (

        <div className="center">
            <ToastContainer />
            <h1>Stone Paper Scissors</h1>
            {form ?

                <Container className='card p-3'>

                    <Row>
                        <Col xs={6} md={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                {/* <Form.Label>Player1 Name</Form.Label> */}
                                <Form.Control type="input" placeholder="Enter Player1 Name" value={player1} onChange={(e) => setplayer1(e.target.value)} />

                            </Form.Group>
                        </Col>


                        <Col xs={6} md={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                {/* <Form.Label>Player2 Name</Form.Label> */}
                                <Form.Control type="input" placeholder="Enter Player2 Name" value={player2} onChange={(e) => setplayer2(e.target.value)} />

                            </Form.Group>
                        </Col>

                    </Row>




                    <div className='py-3'>
                        <Button className='mr-2' variant="success" onClick={() => onsubmit()}>Submit</Button>
                        <Button className='mr-2 ml-10' variant="success" onClick={() => onList()}>Players List</Button>

                    </div>
                </Container>

                :
                <div>
                    <div className="container">
                        <Player name={player1} score={playerScore} action={playerAction} />
                        <Player
                            name={player2}
                            score={PlayerTwoScore}
                            action={customAction}
                        />
                    </div>
                    <div>
                        <ActionButton action="stone" onActionSelected={onActionSelected} />
                        <ActionButton action="paper" onActionSelected={onActionSelected} />
                        <ActionButton action="scissors" onActionSelected={onActionSelected} />
                    </div>
                    <ShowWinner winner={winner} />
                </div>
            }
        </div>
    );
}

export default App;