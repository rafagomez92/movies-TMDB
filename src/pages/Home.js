import React from 'react';
import useFetch from "../hooks/useFetch";
import { URL_API, API } from '../utils/Constants';
import { Row, Col } from "antd";


import SliderMovies from "../components/sliderMovies/SliderMovies";
import MovieList from '../components/movieList/MovieList';
import Footer from '../components/footer/Footer';

function Home() {
    const newMovies = useFetch(`${URL_API}movie/now_playing?api_key=${API}&language=es-ES&page=1`);
    const popularMovies = useFetch(`${URL_API}movie/popular?api_key=${API}&language=eS-ES&page=1`);
    const moreRanked = useFetch(`${URL_API}movie/top_rated?api_key=${API}&language=es-ES&page=1`);
    
    console.log(popularMovies)
    return(
        <>
            <SliderMovies movies={newMovies} />            
            <Row>
                <Col span={12}>
                    <MovieList title="Películas populares" movies={popularMovies}/>
                </Col>
                <Col span={12}>
                    <MovieList title="Películas mas votadas" movies={moreRanked}/>
                </Col>
            </Row>
            <Footer />
        </>
    );
}

export default Home;