import React, { Component } from 'react';

export class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input id="venueType" onChange={this.handleChange} value={this.state.value} placeholder="search for venues" />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}