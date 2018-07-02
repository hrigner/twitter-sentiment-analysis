import React from "react";
import PropTypes from "prop-types";
import "./filterbox.css";

class Filterbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      layout: props.layout,
      selected: []
    };

    props.model.on("changed", () => this.updateLayout());
  }

  async updateLayout() {
    const layout = await this.props.model.getLayout();
    this.setState({ layout });
  }

  clearSelections = () => {
    this.props.model.clearSelections("/qListObjectDef");
    this.setState({ selected: [] });
    if (this.props.selectedValueCallback) {
      this.props.selectedValueCallback("");
    }
  };

  render() {
    const sStyle = {
      color: "#ffffff"
    };

    const xStyle = {
      color: "#C8C8C8"
    };

    function getStyle(item) {
      let style = {};
      let selected = false;
      if (item.qState === "S") {
        style = sStyle;
        selected = true;
      } else if (item.qState === "X") {
        style = xStyle;
      }

      return { style, selected };
    }

    const items = this.state.layout.qListObject.qDataPages[0].qMatrix.map(
      (item, i) => {
        const listItemStyles = getStyle(item[0]);
        return (
          <div
            key={item[0].qElemNumber}
            title={item[0].qElemNumber}
            style={listItemStyles.style}
            role="presentation"
          >
            <span className="listText">{unescape(item[0].qText)}</span>
            <span className="listIcon">
              {listItemStyles.selected ? "✔" : null}
            </span>
          </div>
        );
      }
    );

    return (
      <div className="filterbox">
        <div className="title">Tweets</div>
        <div className="list">{items}</div>
      </div>
    );
  }
}

Filterbox.propTypes = {
  model: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,
  selectedValueCallback: PropTypes.func
};

Filterbox.defaultProps = {
  selectedValueCallback: null
};

export default Filterbox;
