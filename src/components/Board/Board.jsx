import React, { useEffect } from "react";
import store from "../../store/index";
import { observer } from "mobx-react";
import './Board.css'

const Border = observer(() => { 
  const { board, soil, modified, handleClick, reset, run, setBlues } = store;

  useEffect(() => {
    for (let i = 0; i <= modified?.length; i++) {
      if (
        soil?.some(
          (item) =>
            item.row === modified[i]?.rowInitial &&
            item.column < modified[i]?.columnInitial
        ) &&
        soil?.some(
          (item) =>
            item.row === modified[i]?.rowInitial &&
            item.column > modified[i]?.columnInitial
        )
      ) {
        setBlues(modified[i]);
      }
    }
  }, [soil, modified, setBlues])

  return (
    <section className="mainSection">
      <div className="board">
        {board.map((row, indexRow) => (
          <div key={indexRow} className="row">{
            row.map((cell, indexColumn) => {
              {store.setInitial({rowInitial: indexRow, columnInitial: indexColumn})}
              return <div key={indexColumn} 
                      className={soil?.some(black => black.row === indexRow && black.column === indexColumn) 
                      ? "cellBlack"                  
                      : store.blues?.some(blue => blue.rowInitial === indexRow && blue.columnInitial === indexColumn) 
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
        <button onClick={() => reset()} className="btn reset">Reset</button>
        <button onClick={() => run()} className="btn run">Run</button>
      </div>
    </section>
  )
});

export default Border;
