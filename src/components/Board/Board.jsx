import React, { useEffect, useState } from "react";
import './Board.css'

const BOARD_COLUMN = 12;
const BOARD_ROW = 6;

const Border = () => {
  const board = new Array(BOARD_ROW).fill(0).map(column => new Array(BOARD_COLUMN).fill(0))
  const [soil, setSoil] = useState([{}])
  const [firstNum, setFirstNum] = useState(10)
  const [lastNum, setLastNum] = useState(0)
  const [modified, setModified] = useState([])
  const initial = []
  const blues = []
  const [finalBlues, setFinalBlues] = useState([]) 
  
  useEffect(() => {
    for (let i = 0; i <= modified.length; i++){
      if(soil?.some(item => item.row === modified[i]?.rowInitial 
                         && item.column < modified[i]?.columnInitial) 
      && soil?.some(item => item.row === modified[i]?.rowInitial 
                         && item.column > modified[i]?.columnInitial))
                        {
                          blues.push(modified[i])
                        }
    }
    setFinalBlues(blues)
  }, [soil, modified])

  const handleClick = (e, indexRow, indexColumn) => { 
    e.preventDefault();
    const filledBelow = soil.filter(elem => (indexRow + 1 === elem.row && indexColumn === elem.column));
    const filledAbove = soil.filter(el => (indexRow - 1 === el.row && indexColumn === el.column));

    if(indexColumn < firstNum) {
      setFirstNum(indexColumn)
    }
    if(indexColumn > lastNum) {
      setLastNum(indexColumn)
    }

    const eitherOne = filledBelow.length !== 0 || indexRow + 1 === BOARD_ROW;
    if(soil.some((el) => el.row === indexRow && el.column === indexColumn) && filledAbove.length === 0){
      setSoil(soil.filter((el, index) => !(el.row === indexRow & el.column === indexColumn)))
    } else {
      if (eitherOne) {
        setSoil([...soil, {row: indexRow, column: indexColumn}])
      }
      else {
        setSoil([...soil])
      }
    }
   
    setModified([]) 
  }

  const reset = () => {
    setSoil([{}])
    setFinalBlues([])
    setModified([])
  }

  const run = () => {
    setModified(initial.filter(elem => elem.columnInitial >= firstNum && elem.columnInitial <= lastNum))
  }

  return (
    <section className="mainSection">
      <div className="board">
        {board.map((row, indexRow) => (
          <div key={indexRow} className="row">{
            row.map((cell, indexColumn) => {
              {initial.push({rowInitial: indexRow, columnInitial: indexColumn})}
              return <div key={indexColumn} 
                      className={ soil.some(black => black.row === indexRow && black.column === indexColumn) 
                      ? "cellBlack"                  
                      : finalBlues.some(blue => blue.rowInitial === indexRow && blue.columnInitial === indexColumn) 
                      ? "cellBlue" 
                      : "cell"} 
                      onClick={e => handleClick(e, indexRow, indexColumn)}
                      ></div>
           })
          }
          </div>
        ))}
      </div>
      <div className="btnContainer">
        <button onClick={reset} className="btn reset">Reset</button>
        <button onClick={run} className="btn run">Run</button>
      </div>
      

    </section>
  )
};

export default Border;
