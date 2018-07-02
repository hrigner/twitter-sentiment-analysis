import React from "react";
import PropTypes from "prop-types";
import picasso from "picasso.js";
import picassoQ from "picasso-plugin-q";

picasso.use(picassoQ);
export default class Barchart extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { pic: null };
  }

  renderPicasso() {
    const element = this.container;
    const length = this.props.layout.qHyperCube.qDataPages[0].qMatrix.length;

    var nbrOfElements = 0;
    for (var i = 0; i < length; i++) {
      nbrOfElements += this.props.layout.qHyperCube.qDataPages[0].qMatrix[i][1]
        .qNum;
    }
    const data = [
      {
        type: "q",
        key: "qHyperCube",
        data: this.props.layout.qHyperCube
      }
    ];
    if (!this.state.pic) {
      const settings = {
        scales: {
          x: {
            data: {
              extract: {
                field: "qDimensionInfo/0"
              }
            }
          },
          y: {
            data: { field: "qMeasureInfo/0" },
            invert: true,
            min: 0,
            max: nbrOfElements,
            domain: [0, 10]
          }
        },
        components: [
          {
            type: "box",
            data: {
              extract: {
                field: "qDimensionInfo/0",
                props: {
                  start: 0,
                  end: { field: "qMeasureInfo/0" }
                }
              }
            },
            settings: {
              major: {
                scale: "x"
              },
              minor: {
                scale: "y"
              }
            },
            brush: {
              trigger: [
                {
                  on: "tap",
                  contexts: ["highlight"]
                }
              ],
              consume: [
                {
                  context: "highlight",
                  style: {
                    inactive: {
                      opacity: 0.3
                    }
                  }
                }
              ]
            }
          },
          {
            type: "axis",
            scale: "y",
            dock: "left"
          },
          {
            type: "axis",
            scale: "x",
            dock: "bottom"
          },
          {
            type: "text",
            text: this.props.title,
            dock: "top",
            anchor: "left"
          }
        ]
      };

      const pic = picasso.chart({
        element,
        data,
        settings
      });
      pic.brush("highlight").on("update", () => {
        const selections = picassoQ.qBrushHelper(pic.brush("highlight"));

        if (selections[0].method !== "resetMadeSelections") {
          this.props.model[selections[0].method](...selections[0].params);
        }
      });
      this.setState({ pic });
    } else {
      this.state.pic.update({ data });
    }
  }
  render() {
    // we need to have the `this.container` reference available when rendering:
    setTimeout(() => this.renderPicasso());
    return (
      <div
        className="picasso-chart"
        ref={elem => {
          this.container = elem;
        }}
      />
    );
  }
}

Barchart.propTypes = {
  model: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired
};
