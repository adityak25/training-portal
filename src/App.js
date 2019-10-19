import React, { Component } from "react";
import "./App.css";
import TrainingEventCard from "./components/TrainingEventCard/TrainingEventCard";
import TrainingEventForm from "./components/TrainingEventForm/TrainingEventForm";
import Backdrop from "./components/Backdrop/Backdrop";
import { departments, trainingEvents } from "./data/data";

class App extends Component {
  state = {
    selectedDepartment: "All",
    searchValue: "",
    searchResults: trainingEvents,
    creating: false,
    selectedEvent: null,
    selectedEventIndex: -1
  };

  modalCancelHandler = () => {
    this.setState({
      creating: false,
      selectedEvent: null,
      selectedEventIndex: -1
    });
  };

  modalConfirmHandler = newTrainingEvent => {
    if (this.state.selectedEvent) {
      trainingEvents[this.state.selectedEventIndex] = newTrainingEvent;
    } else {
      trainingEvents.push(newTrainingEvent);
    }
    this.modalCancelHandler();
  };

  handleAddTrainingEvent = () => {
    this.setState({ creating: true });
  };

  handleEditTrainingEvent = (eventData, index) => {
    this.setState({ selectedEvent: eventData, selectedEventIndex: index });
  };

  filterResults = (dName, tSearchVal) => {
    let filteredResults = trainingEvents.filter(function(tEvent) {
      return (
        (tEvent.department === dName || dName === "All") &&
        (tSearchVal === "" ||
          tEvent.name.toLowerCase().indexOf(tSearchVal.toLowerCase()) > -1)
      );
    });
    return filteredResults;
  };

  handleSearchBySelection = (event, type) => {
    const nameFilter =
      type === "name" ? event.target.value : this.state.searchValue;
    const deptFilter =
      type === "dept" ? event.target.value : this.state.selectedDepartment;
    let results = this.filterResults(deptFilter, nameFilter);
    this.setState({
      selectedDepartment: deptFilter,
      searchValue: nameFilter,
      searchResults: results
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className='main'>
          <header className='main header'>
            <p>Training Portal</p>
            <button
              className='btn btn-primary'
              onClick={this.handleAddTrainingEvent}>
              Schedule Event
            </button>
          </header>
          <div className='main content'>
            <div className='search'>
              <select
                name='searchByDepartment'
                className='search-option'
                onChange={event => this.handleSearchBySelection(event, "dept")}>
                {["All", ...departments].map(function(dname, index) {
                  return <option key={index}>{dname}</option>;
                })}
              </select>
              <input
                name='searchByName'
                placeholder='Search by name'
                className='search-name'
                onChange={event =>
                  this.handleSearchBySelection(event, "name")
                }></input>
            </div>
            <div className='search-results'>
              {this.state.searchResults.map((data, index) => {
                return (
                  <TrainingEventCard
                    key={index}
                    trainingEvent={data}
                    highlightText={this.state.searchValue}
                    onEditTrainingEvent={() =>
                      this.handleEditTrainingEvent(data, index)
                    }></TrainingEventCard>
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

        {(this.state.creating || this.state.selectedEvent) && (
          <React.Fragment>
            <Backdrop />
            <TrainingEventForm
              title={
                this.state.creating
                  ? "Add Training Event"
                  : "Edit Training Event"
              }
              eventData={this.state.selectedEvent}
              onCancel={this.modalCancelHandler}
              onConfirm={this.modalConfirmHandler}></TrainingEventForm>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default App;
