import React, { useState } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Table from 'react-bootstrap/Table';



function TableList() {
  const [data, setData] = useState([])


  const navigate = useNavigate();
  const onList = () => {
    navigate("/");
  }
  async function getdata() {
    await axios.get("http://localhost:8081/user")
      .then((data) => {
        setData(data.data.reverse())
        console.log(data)

      })
  }

  useEffect(() => {
    getdata()
  }, [])
  return (
    <>
      <h1 className="text-center">Players List</h1>
      <div className="container">
        <div className="d-block">
          <Button className='playbtn mr-2 float-right' variant="success" onClick={() => onList()}>Play Now</Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Round</th>
              <th>Player 1</th>
              <th>Player 2</th>
              <th>Player 1 Choice</th>
              <th>Player 2 Choice</th>
              <th>Player 1 Score</th>
              <th>Player 2 Score</th>
            </tr>
          </thead>
          <tbody>
            {data.length ? data.map((roundsArray, index) => (
              <React.Fragment key={index}>

                {JSON.parse(roundsArray.rounds).map((round, innerIndex) => (
                  <tr key={innerIndex}>
                    <td>{round.round + 1}</td>
                    <td>{round.player1}</td>
                    <td>{round.player2}</td>
                    <td>{round.player1choice}</td>
                    <td>{round.player2choice}</td>
                    <td>{round.player1score}</td>
                    <td>{round.player2score}</td>
                  </tr>
                ))}
                <tr>
                  <td className="font-weight-bold">Total Rounds: {JSON.parse(roundsArray.rounds).length} </td>
                  <td colSpan={7} className="text-center font-weight-bold"> <span className="float-left"> Players : {roundsArray.player1}({roundsArray.totalPointsplayer1}) , {roundsArray.player2}({roundsArray.totalPointsplayer2}) </span>Team {index + 1}<span className="float-right">Winner : {roundsArray.winner}({roundsArray.winningPoint})</span></td>

                </tr>
              </React.Fragment>
            )) : null}
          </tbody>
        </Table>
      </div>

    </>
  )
}
export default TableList;