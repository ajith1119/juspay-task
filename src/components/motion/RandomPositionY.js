import React from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";

// Move Component for Sidebar
const Move = ({ character, comp_id }) => {
  //const [steps, setSteps] = useState(0);

  // Function used for moving Sprite to a random position
  const handleClick = () => {
    const el = document.getElementById(`${character.active}-div`);

    // Generate random left position
    //const randomLeft = Math.floor(Math.random() * window.innerWidth);
    const randomLeft = Math.floor(Math.random() * (100 - 20 + 1)) + 20;


    el.style.position = "relative";
    el.style.top = randomLeft + "px";
  };

  return (
    <Paper elevation={3}>
      <div
        id={comp_id}
        className={`text-center bg-blue-500 text-white p-2 my-2 text-sm cursor-pointer mx-auto`}
        onClick={() => handleClick()}
      >
        Move Random Towords Y:
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

export default connect(mapStateToProps)(Move);
