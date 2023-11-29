import React, {useState} from "react";
import { connect } from "react-redux";
//import { addList } from "../redux/midarea/actions";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { getComponent } from "./getComponents";
import { createStyles, makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FlagIcon from "@material-ui/icons/Flag";
//import { purple } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import { green } from "tailwindcss/colors";
import { Stop} from "@material-ui/icons";
import { red } from "tailwindcss/colors";

// Styling for MaterialUI Components
const useStyles = makeStyles(() =>
  createStyles({
    button: {
      margin: 0,
    },
  })
);

// Customized button for Running Lists
const RunButton = withStyles((theme) => ({
  root: {
    color: 'white',
    backgroundColor: green[500],
    fontSize: "13px",
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}))(Button);

const StopButton = withStyles((theme) => ({

  root: {
    color: 'white',
    backgroundColor: red[500],
    fontSize: "13px",
    "&:hover": {
      backgroundColor: red[700],
    },

  },
}))(Button);

// Mid Area Component
function MidArea({ area_list, event_values }) {
  const classes = useStyles();
  const [stopExecution, setStopExecution] = useState(false);
  let intervalId;

  const eventFire = (el, etype) => {
    if (el && el.fireEvent) {
      el.fireEvent("on" + etype);
    } else if (el) {
      var evObj = document.createEvent("Events");
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  };

  // Handle Running the list
  const handleClick = (arr, id) => {
    if (arr.length === 0 || stopExecution)
    { 
      clearInterval(intervalId);
      setStopExecution(false);
      return;
    };
    let i = 0;

    let repeat = 1;

    let str1 = `comp${arr[i]}-${id}-${i}`;

    // Handle Wait at first index
    if (arr[i] === "WAIT") {
      let str2 = `comp${arr[i]}-${id}-${i}`;
      let last_time = new Date().getTime();
      let curr_time = new Date().getTime();

      while ((curr_time - last_time) / 1000 < event_values.wait[str2] - 2) {
        curr_time = new Date().getTime();
      }
    }

    // Handle Repeat at first index
    else if (arr[i] !== "REPEAT") {
      eventFire(document.getElementById(str1), "click");
    } else {
      repeat = event_values.repeat[str1] + 1;
    }
    i++;

    /* Each function execution takes 2 seconds */
    intervalId = setInterval(() => {
      if (i === arr.length || stopExecution) {
        clearInterval(intervalId);
        setStopExecution(false); 
        return;
      }

      // Handle Wait
      if (arr[i] === "WAIT") {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        let last_time = new Date().getTime();
        let curr_time = new Date().getTime();

        while ((curr_time - last_time) / 1000 < event_values.wait[str2] - 2) {
          curr_time = new Date().getTime();
        }
        i++;
      }
      // Handle Repeat Component at current index
      else if (arr[i] === "REPEAT") {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        repeat = repeat * (event_values.repeat[str2] + 1);
        i++;
      }
      // If Repeat component is at previous index
      else if (arr[i - 1] === "REPEAT" && repeat > 2) {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        eventFire(document.getElementById(str2), "click");
        repeat--;
      } else {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        eventFire(document.getElementById(str2), "click");
        i++;
      }
    }, 2000);
  };

  const handleStopClick = () => {
    // Set stopExecution state to true
    clearInterval(intervalId);
    setStopExecution(true);
  };

  return (
    <div className="flex-1 h-full overflow-auto p-3">
      <div className="flex items-center justify-center">
      <div style={{ backgroundColor: 'orange' }} className="font-bold mb-5 border border-2 rounded text-white bg-orange-400 p-2 w-auto">
          Mid Area
      </div>


      </div>
      <div className="flex items-center justify-center">
        <div className="grid grid-flow-col">
          {area_list.midAreaLists.map((l) => {
            return (
              <div className="w-82 flex items-center justify-center" key={l.id}>
                <Paper elevation={3} className="p-4">
                  <div className="w-72 border-gray-300 p-2 flex flex-col items-center">
                    <Droppable droppableId={l.id} type="COMPONENTS">
                      {(provided) => {
                        return (
                          <ul
                            className={`${l.id} w-60 h-full`}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            <div className="text-center mx-auto my-2 mb-4 space-x-2">
                              <RunButton
                                variant="contained"
                                className={classes.button}
                                startIcon={<FlagIcon />}
                                onClick={() => handleClick(l.comps, l.id)}
                              >
                                Run
                              </RunButton>
                      
                              <StopButton
                                variant="contained"
                                className={classes.button}
                                startIcon={<Stop />}
                                onClick={() => handleStopClick(l.comps, l.id)}
                              >
                                Stop
                              </StopButton>
                            </div>
                            

                            {l.comps &&
                              l.comps.map((x, i) => {
                                let str = `${x}`;
                                let component_id = `comp${str}-${l.id}-${i}`;

                                return (
                                  <Draggable
                                    key={`${str}-${l.id}-${i}`}
                                    draggableId={`${str}-${l.id}-${i}`}
                                    index={i}
                                  >
                                    {(provided) => (
                                      <li
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        {getComponent(str, component_id)}
                                        {provided.placeholder}
                                      </li>
                                    )}
                                  </Draggable>
                                );
                              })}
                            {provided.placeholder}
                          </ul>
                        );
                      }}
                    </Droppable>
                  </div>
                </Paper>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// mapping state to props
const mapStateToProps = (state) => {
  return {
    area_list: state.list,
    event_values: state.event,
  };
};

/*
const mapDispatchToProps = (dispatch) => {
  return {
    add_list: () => dispatch(addList()),
  };
};
*/
export default connect(mapStateToProps)(MidArea);
