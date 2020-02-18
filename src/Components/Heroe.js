import React from "react";
import "./../styles.css";

class Heroe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { btnStatus: true };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(props) {
    this.props.onHandleChange(this.props.data.name);
    this.setState({ btnStatus: false });
  }

  render() {
    let btn;
    if (this.state.btnStatus) {
      btn = (
        <button
          className="button is-small is-fullwidth is-success"
          onClick={this.handleChange}
        >
          + Favorite
        </button>
      );
    } else {
      btn = <span class="tag is-warning">Heroe added!</span>;
    }
    return (
      <div className="card">
        <div className="left">
          <img src={this.props.data.image.url} className="img" alt="" />
        </div>
        <div className="right">
          <div className="infor-Card">
            <p>ID: {this.props.data.id}</p>
            <p>Name: {this.props.data.name}</p>
            <p>Gender: {this.props.data.appearance.gender}</p>
          </div>
          <div className="btn-card">{btn}</div>
        </div>
      </div>
    );
  }
}

export default Heroe;
