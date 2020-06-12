import React, { useState } from 'react';
import { Row, Col, Button } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import useFetch from '../../hooks/useFetch';
import { URL_API, API } from '../../utils/Constants';
import Loading from '../../components/loading/Loading';
import ModalVideo from '../../components/modalVideo/ModalVideo';

import './Movie.scss';

function Movie(props) {
    const { id } = useParams(); 

    const movieInfo = useFetch(`${URL_API}movie/${id}?api_key=${API}&language=es-Es`);
    
    console.log(movieInfo);

    if(movieInfo.loading || !movieInfo.result) {
        return <Loading />
    }

    return(
        <RenderMovie movieInfo={movieInfo.result} />
    );
}

export default Movie;

function RenderMovie(props) {
    const { movieInfo: { backdrop_path, poster_path } } = props;  
    
    const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;
    
    return (
        <div className="movie" style={{ backgroundImage: `url('${backdropPath}')`}}>
            <div className="movie__dark" />
            <Row>
                <Col span={8} offset={3} className="movie__poster">                    
                    <PosterMovie image={poster_path} />
                </Col>
                <Col span={10} className="movie__info">                    
                <MovieInfo movieInfo={props.movieInfo}/>
                </Col>
            </Row>
        </div>
    )
}

function PosterMovie(props) {
    const { image } = props;
    const posterPath = `https://image.tmdb.org/t/p/original${image}`;
    return (
        <div style={{ backgroundImage: `url('${posterPath}')` }} />
    );
}

function MovieInfo(props) {
    const { movieInfo: { id, title, release_date, overview, genres } } = props;
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const videoMovie = useFetch(`${URL_API}movie/${id}/videos?api_key=${API}&language=es-ES`);

    const openModal = () => setIsVisibleModal(true);

    const closeModal = () => setIsVisibleModal(false);

    const renderVideo = () => {
        if(videoMovie.result) {
            if(videoMovie.result.results.length > 0)
                return (
                    <>
                        <Button icon={<PlayCircleOutlined />} onClick={openModal}>
                            Ver trailer
                        </Button>                                                
                        <ModalVideo 
                            videoKey={videoMovie.result.results[0].key}
                            videoPlatform={videoMovie.result.results[0].site}
                            isOpen={isVisibleModal}
                            close={closeModal}
                        />
                    </>
                )
        }
    }



    return (
        <>
            <div className="movie__info-header">
                <h1>
                    {title}
                    <span>{moment(release_date, "YYYY-MM--DD").format("YYYY")}</span>
                </h1>
                {renderVideo()}
                
            </div>

            <div className="movie__info-content">
                <h3>General</h3>
                <p>{overview}</p>
                
                <h3>Genres</h3>
                <ul>
                    {genres.map(gender => (
                        <li key={gender.id}>{gender.name}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}