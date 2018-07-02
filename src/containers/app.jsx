import React from "react";
import enigma from "enigma.js";
import Header from "../components/header";
import qixSchema from "enigma.js/schemas/12.20.0.json";
import TextInput from "../components/textinput";
import Barchart from "../components/barchart";
import Filterbox from "../components/filterbox";
import { barchartProperties, tweets } from "../definitions";
import "./app.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { app: null, error: null };
  }

  addToEngine = async script => {
    try {
      let app = {};
      if (!this.state.app) {
        const session = await enigma.create({
          schema: qixSchema,
          url: "ws://localhost:9076"
        });
        const global = await session.open();
        app = await global.createSessionApp();
      } else {
        app = this.state.app;
      }
      await app.setScript(script);
      await app.doReload();

      const barchartModel = await app.createSessionObject(barchartProperties);
      const barchartLayout = await barchartModel.getLayout();
      const listboxModel = await app.createSessionObject(tweets);
      const listboxLayout = await listboxModel.getLayout();
      this.setState({
        app,
        barchartModel,
        barchartLayout,
        listboxModel,
        listboxLayout
      });
    } catch (error) {
      console.log(error);
      this.setState({ error });
    }
  };

  search = async value => {
    const that = this;
    fetch(`http://localhost:3000/api/search/${value}`)
      .then(response => response.json())
      .then(data => {
        that.addToEngine(data.script);
      });
  };

  render() {
    if (this.state.error) {
      const msg =
        this.state.error instanceof Event
          ? "Failed to establish a connection to an Engine"
          : this.state.error.message;
      return (
        <div className="errorWrapper">
          <span className="errorText">Oops, something went wrong.</span>
          <span>{msg}</span>
        </div>
      );
    }

    return (
      <div className="page">
        <Header />
        <div className="content">
          <TextInput
            callback={value => {
              this.search(value);
            }}
          />

          {this.state.app && (
            <div className="dataContainer">
              <Filterbox
                model={this.state.listboxModel}
                layout={this.state.listboxLayout}
              />
              <Barchart
                model={this.state.barchartModel}
                layout={this.state.barchartLayout}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
