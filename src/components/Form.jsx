import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const Form = () => {
const [MoviesData, setMoviesData] = useState([]);
const [search, setSearch] = useState("code");
const [sortGoodBad, setSortGoodBad] = useState(null);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&query=${search}&language=fr-FR`).then((res) => setMoviesData(res.data.results))
    },[search])
    // qd on met le search dans la dependancie le useeffect rejoue sa requête
    return (
        <div className='form-component'>
            <div className="form-container">
                <form action="">
                    <input type="text" placeholder="Entrez le titre d'un film" id='search-input' onChange={(e) => setSearch(e.target.value)} value={search}/>
                    <input type="submit" value="Rechercher"/>
                </form>
                <div className="btn-sort-container">
                    <div className="btn-sort" id="goodToBad" onClick={() => setSortGoodBad("goodToBad")}>Top <span>-></span></div>
                    <div className="btn-sort" id="badToGood" onClick={() => setSortGoodBad("badToGood")}>Flop <span>-></span></div>
                </div>
            </div>
            <div className="result">
                {/* qd on fait un map avec une fonction fléché il faut mettre des parenthèse sinon avec des acolades ne pas oublier de mettre return */}
                {/* pour le sort le a représente le + petit */}
                <ul >{MoviesData
                .slice(0,12)
                .sort((a,b) => {
                    if(sortGoodBad === "goodToBad"){
                        return b.vote_average - a.vote_average;
                        // du + grand au + petit
                    } else if(sortGoodBad === "badToGood"){
                        // du + petit au + grand
                        return a.vote_average - b.vote_average;
                    }
                    })
                .map((movie) => (
                    <Card key={movie.id} movie={movie}/>
                    // le 1er movie est ce que l'on va passer au composant et le 2eme c'est ce que l'on récupère du map
                ))} </ul>
            </div>
        </div>
    );
};

export default Form;