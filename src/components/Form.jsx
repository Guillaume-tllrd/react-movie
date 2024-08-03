import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
const Form = () => {
const [MoviesData, setMoviesData] = useState([]);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&query=code&language=fr-FR`).then((res) => setMoviesData(res.data.results))
    },[])
    return (
        <div className='form-component'>
            <div className="form-container">
                <form action="">
                    <input type="text" placeholder="Entrez le titre d'un film" id='search-input'  />
                    <input type="submit" value="Rechercher"/>
                </form>
                <div className="btn-sort-container">
                    <div className="btn-sort" id="goodToBad">Top <span>-></span></div>
                    <div className="btn-sort" id="badToGood">Flop <span>-></span></div>
                </div>
            </div>
            <div className="result">
                {/* qd on fait un map avec une fonction fléché il faut mettre des parenthèse sinon avec des acolades ne pas oublier de mettre return */}
                <ul >{MoviesData.slice(0,12).map((movie) => (
                    <Card key={movie.id} movie={movie}/>
                    // le 1er movie est ce que l'on va passer au composant et le 2eme c'est ce que l'on récupère du map
                ))} </ul>
            </div>
        </div>
    );
};

export default Form;