import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import Card from "../components/Card";
// import { cleanup } from "@testing-library/react";

const LikePage = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    // Si il y a qqchose dans le localStorage tu me le renvoie sinon un tableau vide car en bas on va faire un map et si pas de tableau il y aurait un message d'erreur
    // Au départ on a un string, on va split cad à chaque fois que tu vois une virgule tu vas me faire un élément de tableau avec le split
    let moviesId = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];

    for (let i = 0; i < moviesId.length; i++) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR`
        )
        .then((res) => setListData((listData) => [...listData, res.data]));
    }
    // pour avoir tous les films, on va d'abord: déclarer listData qu'on va ensuite destructuré pour y ajouter les res.data. En revanche pour ne pas que le useEffect se joue deux fois on doit désactiver le stric mode dans le main.jsx
  }, []);

  return (
    <div className="user-list-page">
      <Header />
      <h2>
        Coups de coeur <span>💖</span>
      </h2>
      <div className="result">
        {listData.length > 0 ? (
          listData.map((movie) => <Card movie={movie} key={movie.id} />)
        ) : (
          <h2>Aucun coup de coeur pour le moment</h2>
        )}
      </div>
    </div>
  );
};

export default LikePage;
