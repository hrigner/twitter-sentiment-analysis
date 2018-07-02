import React from "react";
import PropTypes from "prop-types";

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.props.callback(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Search Twitter for:
          <input
            type="text"
            value={this.state.value}
            onChange={event => {
              this.handleChange(event);
            }}
          />
        </label>
        <input type="submit" value="Search" />
      </form>
    );
  }
}

TextInput.propTypes = {
  callback: PropTypes.func.isRequired
};

export default TextInput;
