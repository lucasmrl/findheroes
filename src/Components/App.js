/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import Heroe from "./Heroe";
import FavoriteItem from "./FavoriteItem";
import "./../styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      results: [],
      status: "",
      favorites: [],
      isLoading: false
    };
    this.handleApiRequest = this.handleApiRequest.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

  handleApiRequest(event) {
    event.preventDefault();
    this.setState({ status: "", isLoading: true });

    const key = process.env.REACT_APP_CLIENT_ID;

    const searchName = this.state.search;
    fetch(`https://www.superheroapi.com/api.php/${key}/search/` + searchName)
      .then(data => data.json())
      .then(data =>
        this.setState({
          results: data,
          status: data.response,
          isLoading: false
        })
      );
  }

  handleFavoriteClick(x) {
    this.setState({
      favorites: [...this.state.favorites, x]
    });
  }

  handleChange(e) {
    this.setState({ search: e.target.value });
  }

  render() {
    let loading;
    if (this.state.isLoading) {
      loading = (
        <div class="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      );
    } else {
      loading = "";
    }

    const response = this.state.status;
    let titleResults = "";
    let heroesResults;
    if (response === "success") {
      heroesResults = this.state.results.results.map(item => (
        <Heroe
          key={item.id}
          data={item}
          onHandleChange={this.handleFavoriteClick}
        />
      ));
      titleResults = (
        <h4 className="title is-5 resultLine">
          Showing Results for {this.state.search}
        </h4>
      );
    } else if (response === "error") {
      heroesResults = (
        <div className="no-results">
          <p className="subtitle noRes">😕 Sorry...</p>
          <p className="title noRes">No results.</p>
        </div>
      );
      titleResults = "";
    } else {
      heroesResults = "";
      titleResults = "";
    }

    const namesFavorites = this.state.favorites.map(item => (
      <FavoriteItem name={item} />
    ));

    return (
      <div className="App">
        <div className="favoritesLeft">
          <h4 className="title is-5 favTitle">My Favorites</h4>
          <h4 className="title is-5">
            Superheroes{" "}
            <span className="tag is-warning">
              {this.state.favorites.length}
            </span>{" "}
          </h4>
          {namesFavorites}
        </div>
        <div className="center">
          <div className="serachTop">
            <div>
              <h1 className="title">FindHeroes App</h1>
              <form onSubmit={this.handleApiRequest}>
                <label className="subtitle">
                  Type a heroe's name or any letter:
                  <br />
                  <input
                    className="input is-small"
                    type="text"
                    value={this.state.search}
                    onChange={this.handleChange}
                  />
                </label>
                <br />
                <button className="button is-primary">Search</button>
              </form>
              <div>{titleResults}</div>
            </div>
          </div>
          <div className="resultsCenter">
            {heroesResults}
            {loading}
          </div>
          <footer>
            <p>
              This project was built for learning purposes. Data provided by
              SuperHero API - https://www.superheroapi.com/.
            </p>
            <p>
              Spin animation from Tobias Ahlin -
              https://tobiasahlin.com/spinkit/.
            </p>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
