import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";

const GotoXY = ({ character, comp_id }) => {
  const [state, setState] = useState({
    randomLeft: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
    randomTop: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
  });

  // go to position X and Y
  const gotoXY = () => {
    const el = document.getElementById(`${character.active}-div`);
    el.style.position = "relative";
    el.style.left = state.randomLeft + "px";
    el.style.top = state.randomTop + "px";
  };

  return (
    <Paper elevation={3}>
      <div className="text-center bg-blue-500 p-2 my-3">
        <div className="grid grid-cols-2 my-2">
          <div className="text-white">Random X:</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={state.randomLeft}
            onChange={(e) => {
              parseInt(e.target.value) !== 0 &&
                setState({ ...state, randomLeft: parseInt(e.target.value) });
            }}
          />
        </div>
        <div className="grid grid-cols-2 my-2">
          <div className="text-white">Random Y:</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={state.randomTop}
            onChange={(e) => {
              parseInt(e.target.value) !== 0 &&
                setState({ ...state, randomTop: parseInt(e.target.value) });
            }}
          />
        </div>
        <div
          id={comp_id}
          className="text-center bg-blue-700 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={() => gotoXY()}
        >
          Go to X: {state.randomLeft} Y: {state.randomTop}
        </div>
      </div>
    </Paper>
  );
};

// mapping state to component
const mapStateToProps = (state) => {
  return {
    character: state.character,
  };
};

export default connect(mapStateToProps)(GotoXY);
