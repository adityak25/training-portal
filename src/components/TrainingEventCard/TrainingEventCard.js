import React from "react";

import "./TrainingEventCard.css";
import { getHighlightedText } from "./../../utilities/helper";

const TrainingEventCard = props => (
  <li className='event-card' onClick={() => props.onEditTrainingEvent()}>
    <div>
      <h1 className='event-line-item'>
        {getHighlightedText(props.trainingEvent.name, props.highlightText)}
      </h1>

      <p className='event-line-item'>{props.trainingEvent.duration} hr</p>
      <p className='event-line-item'>
        {new Date(props.trainingEvent.datetime).toDateString()}
      </p>
      <p className='event-line-item'>
        {new Date(props.trainingEvent.datetime).toLocaleTimeString()}
      </p>
      <p className='event-line-item'>#{props.trainingEvent.meetingroom}</p>
    </div>
  </li>
);

export default TrainingEventCard;
