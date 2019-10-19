import React, { Component } from "react";
import "./App.css";
import TrainingEventCard from "./components/TrainingEventCard/TrainingEventCard";
import Backdrop from "./components/Backdrop/Backdrop";
import Modal from "./components/Modal/Modal";
import { departments, trainingEvents } from "./data/data";

class App extends Component {
  state = {
    selectedDepartment: "All",
    searchValue: "",
    searchResults: trainingEvents,
    creating: false,
    selectedEvent: null
  };

  constructor(props) {
    super(props);
    this.nameElRef = React.createRef();
    this.deptElRef = React.createRef();
    this.durationElRef = React.createRef();
    this.roomElRef = React.createRef();
    this.dateElRef = React.createRef();
    this.descriptionElRef = React.createRef();
  }

  modalCancelHandler = () => {
    this.setState({ creating: false, selectedEvent: null });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
    const newTrainingEvent = {
      name: this.nameElRef.current.value,
      department: this.deptElRef.current.value,
      duration: this.durationElRef.current.value,
      meetingroom: this.roomElRef.current.value,
      datetime: this.dateElRef.current.value,
      description: this.descriptionElRef.current.value
    };
    if (
      newTrainingEvent.name.trim().length > 0 &&
      newTrainingEvent.department.trim().length > 0 &&
      newTrainingEvent.duration &&
      newTrainingEvent.meetingroom &&
      newTrainingEvent.datetime.getDate() > 0 &&
      newTrainingEvent.datetime.getTime() > 0 &&
      newTrainingEvent.description.trim().length > 0
    ) {
      trainingEvents.push(newTrainingEvent);
    }
    return;
  };

  handleAddTrainingEvent = () => {
    this.setState({ creating: true });
  };

  filterResults = (dName, tSearchVal) => {
    let results = trainingEvents.filter(function(tEvent) {
      return (
        (tEvent.department === dName || dName === "All") &&
        (tSearchVal === "" ||
          tEvent.name.toLowerCase().indexOf(tSearchVal.toLowerCase()) > -1)
      );
    });
    return results;
  };

  handleSearchByName = event => {
    let results = this.filterResults(
      this.state.selectedDepartment,
      event.target.value
    );
    this.setState({ searchValue: event.target.value, searchResults: results });
  };

  handleDeptSelection = event => {
    let results = this.filterResults(
      event.target.value,
      this.state.searchValue
    );
    this.setState({
      selectedDepartment: event.target.value,
      searchResults: results
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className='main'>
          <header className='main header'>
            <p>Training Portal</p>
            <button onClick={this.handleAddTrainingEvent}>
              Schedule Event
            </button>
          </header>
          <div className='main content'>
            <div className='search'>
              <select
                name='searchByDepartment'
                className='search-option'
                onChange={this.handleDeptSelection}>
                {["All", ...departments].map(function(dname, index) {
                  return <option key={index}>{dname}</option>;
                })}
              </select>
              <input
                name='searchByName'
                placeholder='Search by name'
                className='search-name'
                onChange={this.handleSearchByName}></input>
            </div>
            <div className='search-results'>
              {this.state.searchResults.map(function(data, index) {
                return (
                  <TrainingEventCard
                    key={index}
                    training={data}></TrainingEventCard>
                );
              })}
            </div>
          </div>
          <footer className='main footer'>
            <div className='copyright'>
              <span>© 2019. All rights reserved.</span>
            </div>
          </footer>
        </div>

        {(this.state.creating || this.state.selectedEvent) && <Backdrop />}
        {this.state.creating && (
          <Modal
            title='Add Training Event'
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
            confirmText='Confirm'>
            <form>
              <div className='form-control'>
                <label htmlFor='name'>Training Name</label>
                <input
                  type='text'
                  id='name'
                  maxlength='18'
                  ref={this.nameElRef}
                />
              </div>
              <div className='form-control'>
                <label htmlFor='department'>Department</label>
                <select id='department' ref={this.deptElRef}>
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
                <label htmlFor='duration'>Duration</label>
                <input
                  type='number'
                  min='0.5'
                  step='0.5'
                  id='duration'
                  ref={this.durationElRef}
                />
              </div>
              <div className='form-control'>
                <label htmlFor='room'>Meeting Room#</label>
                <input
                  type='number'
                  min='1'
                  step='1'
                  id='room'
                  ref={this.roomElRef}
                />
              </div>
              <div className='form-control'>
                <label htmlFor='date'>Date</label>
                <input type='datetime-local' id='date' ref={this.dateElRef} />
              </div>
              <div className='form-control'>
                <label htmlFor='description'>Description</label>
                <textarea
                  id='description'
                  rows='4'
                  ref={this.descriptionElRef}
                />
              </div>
            </form>
          </Modal>
        )}
      </React.Fragment>
    );
  }
}

export default App;
