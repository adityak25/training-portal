import React from "react";

import "./TrainingEventCard.css";

const TrainingEventCard = props => (
  <li className='event-card'>
    <div>
      <h1 className='event-line-item'>{props.training.name}</h1>
      <p className='event-line-item'>{props.training.duration} hr</p>
      <p className='event-line-item'>
        {new Date(props.training.datetime).toDateString()}
      </p>
      <p className='event-line-item'>
        {new Date(props.training.datetime).toLocaleTimeString()}
      </p>
      <p className='event-line-item'>#{props.training.meetingroom}</p>
      {/* <button onClick={}>Details</button> */}
    </div>
  </li>
);

export default TrainingEventCard;
