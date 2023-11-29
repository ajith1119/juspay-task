import React from "react";
import Move from "./motion/Move";
import TurnAntiClockwise from "./motion/TurnAntiClockwise";
import TurnClockwise from "./motion/TurnClockwise";
import GotoXY from "./motion/Goto";
import RandomPosition from "./motion/RandomPosition";
import RandomPositionY from "./motion/RandomPositionY";
import RandomXY from "./motion/RandomXY";
import SayMessage from "./looks/SayMessage";
import SayMessageWithTimer from "./looks/SayMessageWithTimer";
import Size from "./looks/Size";
import Show from "./looks/Show";
import Hide from "./looks/Hide";
import Wait from "./control/Wait";
import HideMessage from "./looks/HideMessage";
import MoveY from "./motion/MoveY";
import BroadcastMessage from "./events/broadcast";
import Think from "./looks/Think";
import ThinkWithTimer from "./looks/ThinkWithTimer";

// fetch components based on different keys
export const getComponent = (key, id) => {
  switch (key) {
    case "MOVE_Y":
      return <MoveY comp_id={id} />;
    case "MOVE":
      return <Move comp_id={id} />;

    case "TURN_CLOCKWISE":
      return <TurnClockwise comp_id={id} />;

    case "TURN_ANTI_CLOCKWISE":
      return <TurnAntiClockwise comp_id={id} />;

    case "GOTO_XY":
      return <GotoXY comp_id={id} />;

    case "RANDOM_POSITION":
      return <RandomPosition comp_id={id} />;

    case "RANDOM_POSITION_Y":
      return <RandomPositionY comp_id={id} />;

    case "RANDOM_XY":
      return <RandomXY comp_id={id} />;

    case "SAY_MESSAGE":
      return <SayMessage comp_id={id} />;

    case "SAY_MESSAGE_WITH_TIMER":
      return <SayMessageWithTimer comp_id={id} />;

    case "SIZE":
      return <Size comp_id={id} />;

    case "SHOW":
      return <Show comp_id={id} />;

    case "HIDE":
      return <Hide comp_id={id} />; 

    case "BROADCAST":
      return <BroadcastMessage comp_id={id} />;

    case "WAIT":
      return <Wait comp_id={id} />;

    case "HIDE_MESSAGE":
      return <HideMessage comp_id={id} />;

    case "THINK":
      return <Think comp_id={id} />;

    case "THINK_TIMER":
      return <ThinkWithTimer comp_id={id} />;

    default:
      return React.null;
  }
};
