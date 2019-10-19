import React, { Component } from "react";
import { departments } from "./../../data/data";
import Modal from "./../Modal/Modal";
import { toDatetimeLocal } from "./../../utilities/helper";

class TrainingEventForm extends Component {
  state = !this.props.eventData
    ? {
        name: "",
        department: departments[0],
        duration: 0.5,
        meetingroom: "0",
        datetime: toDatetimeLocal(),
        description: ""
      }
    : {
        name: this.props.eventData.name,
        department: this.props.eventData.department,
        duration: this.props.eventData.duration,
        meetingroom: this.props.eventData.meetingroom,
        datetime: toDatetimeLocal(this.props.eventData.datetime),
        description: this.props.eventData.description
      };

  onFormValueChange = (key, value) => {
    this.setState({ [key]: value });
  };

  canFormBeSubmitted = () => {
    return (
      this.state.name.trim().length > 0 &&
      this.state.department.trim().length > 0 &&
      this.state.duration > 0 &&
      parseInt(this.state.meetingroom) > 0 &&
      this.state.datetime.toString().length > 0
    );
  };

  render() {
    const isFormSubmitDisabled = !this.canFormBeSubmitted();
    const isPastDateEvent = this.props.eventData
      ? new Date() > new Date(this.state.datetime)
      : false;

    return (
      <Modal
        title={isPastDateEvent ? "Past Training Event" : this.props.title}
        canCancel
        canConfirm={!isPastDateEvent}
        onCancel={this.props.onCancel}
        onConfirm={() => this.props.onConfirm(this.state, this.props.index)}
        confirmText='Confirm'
        disabled={isFormSubmitDisabled || isPastDateEvent}>
        <form>
          <div className='form-control'>
            <label htmlFor='name'>Training Name</label>
            <input
              type='text'
              id='name'
              maxLength='18'
              value={this.state.name}
              onChange={event =>
                this.onFormValueChange("name", event.target.value)
              }
              disabled={isPastDateEvent}
              required
            />
          </div>
          <div className='form-control'>
            <label htmlFor='department'>Department</label>
            <select
              id='department'
              value={this.state.department}
              onChange={event =>
                this.onFormValueChange("department", event.target.value)
              }
              disabled={isPastDateEvent}
              required>
              {departments.map(function(dname, index) {
                return (
                  <option key={index} value={dname}>
                    {dname}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='form-control'>
            <label htmlFor='duration'>Duration (in hours)</label>
            <input
              type='number'
              min='0.5'
              step='0.5'
              id='duration'
              value={this.state.duration}
              onChange={event =>
                this.onFormValueChange("duration", event.target.value)
              }
              disabled={isPastDateEvent}
              required
            />
          </div>
          <div className='form-control'>
            <label htmlFor='room'>Meeting Room#</label>
            <input
              type='number'
              min='1'
              step='1'
              id='room'
              value={this.state.meetingroom}
              onChange={event =>
                this.onFormValueChange("meetingroom", event.target.value)
              }
              disabled={isPastDateEvent}
              required
            />
          </div>
          <div className='form-control'>
            <label htmlFor='date'>Date</label>
            <input
              type='datetime-local'
              id='date'
              value={this.state.datetime}
              min={toDatetimeLocal()}
              onChange={event =>
                this.onFormValueChange("datetime", event.target.value)
              }
              disabled={isPastDateEvent}
              required
            />
          </div>
          <div className='form-control'>
            <label htmlFor='description'>Description</label>
            <textarea
              id='description'
              rows='4'
              value={this.state.description}
              onChange={event =>
                this.onFormValueChange("description", event.target.value)
              }
              disabled={isPastDateEvent}
            />
          </div>
        </form>
      </Modal>
    );
  }
}

export default TrainingEventForm;
