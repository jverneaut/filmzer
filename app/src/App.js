import React, { Component } from "react";
import axios from "axios";

import movieList from './films.json';

const electron = window.require("electron");

class App extends Component {
  state = {
    selected: {},
    movies: []
  }

  componentWillMount = () => {
    this.setState({
      movies: movieList
    })
  }

  renderMovies = () => (
    <ul>
      {this.state.movies.map((movie, index) => {
        return <li key={index}>{movie}</li>;
      })}
    </ul>
  );

  goToStream = () => {
    const url = encodeURI(
      `http://www.voirfilms.ws/recherche?story=${this.state.selected.title}`
    );
    electron.shell.openExternal(url);
  }

  getMovie = () => {
    const movieTitle = encodeURI(
      this.state.movies[Math.floor(Math.random() * this.state.movies.length)]
    );

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-Fr&query=${movieTitle}&page=1&include_adult=false&region=fr`;

    axios
      .get(url)
      .then(res => res.data)
      .then(res => res.results[0])
      .then(res => {
        if (res) {
          this.setState({ selected: res });
        }
      });
  }

  componentDidMount() {
    this.getMovie();
  }

  render() {
    return (
      <div className="app">
        <div className="bar">
          Filmzer{" "}
          {this.state.selected.title && " - " + this.state.selected.title}
        </div>
        {this.state.selected.poster_path && (
          <img
            className="background"
            src={`https://image.tmdb.org/t/p/w500${
              this.state.selected.backdrop_path
              }`}
            alt=""
          />
        )}
        {Object.keys(this.state.selected).length !== 0 && (
          <div className="card">
            <div className="card__wraper">
              <img
                className="card__image"
                src={`https://image.tmdb.org/t/p/w500${
                  this.state.selected.poster_path
                  }`}
                alt=""
              />
            </div>
            <div className="card__info">
              <h1 className="card__title">{this.state.selected.title}</h1>
              <div className="card__year">
                ({this.state.selected.release_date.substr(0, 4)})
              </div>
              <div className="card__metrics">
                <div className="card__vote">
                  &#9733; {this.state.selected.vote_average}/10
                </div>
                <div className="card__popularity">
                  Popularité: {Math.round(this.state.selected.popularity)}
                </div>
              </div>
              <p className="card__description">
                {this.state.selected.overview}
              </p>
              <div onClick={this.goToStream} className="card__streaming-link">
                Voir ce film en streaming &#8594;
              </div>
            </div>
          </div>
        )}
        <div className="choice">
          <div className="choice__text">Ce film ne te convient pas ?</div>
          <div onClick={this.getMovie} className="choice__button">
            En choisir un autre
          </div>
        </div>
      </div>
    );
  }
}

export default App;
