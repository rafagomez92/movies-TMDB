import React, {useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { URL_API, API } from '../utils/Constants';
import Footer from '../components/footer/Footer';
import Loading from '../components/loading/Loading';
import MovieCatalog from '../components/movieCatalog/MovieCatalog';
import PaginationMovie from '../components/pagination/Pagination';

function Popular() {
    const [ movieList, setMovieList ] = useState([]);
    const [ page, setPage ] = useState(1);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${URL_API}movie/popular?api_key=${API}&language=es-ES&page=${page}`);
            const movies = await response.json();
            setMovieList(movies)
        }) ()
    }, [page]);

    const onChangePage = page => {
        setPage(page);
    }


    return(
        <>
        <Row>
            <Col span="24" style={{ textAlign: "center", marginTop: 25 }}>
                <h1 style={{ fontSize: 35, fontWeight: "bold"}}>
                    Películas Populares
                </h1>
            </Col>
        </Row>
            {movieList.results 
            ? ( 
                <Row>
                    <Col span="24" > 
                    <Row justify="space-around">                        
                        <MovieCatalog movies={movieList} />                                                
                    </Row>                   
                    </Col>
                    <Col span="24">
                        <PaginationMovie 
                            currentPage={movieList.page}
                            totalItems={movieList.total_results}
                            onChangePage={onChangePage}

                        />
                    </Col>
                </Row>
            )
            :   <row>
                    (<Col span="24"><Loading /></Col>)
                </row>
            }
            <row>

                <Col span="24">
                    <Footer />
                </Col>
            </row>
        </>        
    );
}

export default Popular;