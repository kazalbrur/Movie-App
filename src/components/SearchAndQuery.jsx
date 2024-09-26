import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Loading from "./Loading";
import ZeroMovie from "./ZeroMovie";
import ZeroTVShow from "./ZeroTVShow"; // New component for zero TV shows

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import posterPlaceholder from "../assets/images/poster.webp";

import "../styles/Movies.css";

function SearchAndQuery({ type }) {
    const searched_items = useSelector((state) =>
        type === "movie" ? state.searchAndQueryReducer.movies : state.searchAndQueryReducer.tvShows
    );
    
    const filtered_items = useMemo(() => searched_items.filter(item => item.poster_path), [searched_items]);
    const loading_searched_items = useSelector((state) => state.searchAndQueryReducer.loading);

    return (
        <div className="container" style={{ marginTop: filtered_items.length > 0 && "100px" }}>
            {filtered_items.length === 0 && (type === "movie" ? <ZeroMovie /> : <ZeroTVShow />)}
            {loading_searched_items ? <Loading /> :
                (
                    <div className="movies-container">
                        <div className="row">
                            {filtered_items.map((item, index) => (
                                <div key={index} className="movie col-4 col-md-3 col-xl-2">
                                    <Link to={`/${type}/${item.id}-${item.title?.replaceAll(" ", "-").toLowerCase()}`} onClick={() => window.scrollTo(0, 0)}>
                                        <div className="img">
                                            <LazyLoadImage
                                                src={`https://image.tmdb.org/t/p/w220_and_h330_face/${item.poster_path}`}
                                                alt={`${item.title} poster image`}
                                                placeholderSrc={posterPlaceholder}
                                                effect="blur"
                                                width="100%"
                                                height="auto"
                                                style={{ color: "white", borderRadius: "0.5rem", aspectRatio: 3 / 5 }}
                                            />
                                        </div>
                                    </Link>

                                    {item.vote_average === 0
                                        ?
                                        <div className="imdb-rating" style={{ color: "#ffffff99" }}>
                                            <i className="bi bi-star-fill bs-star-icon"></i>
                                            <span>NR</span>
                                        </div>
                                        :
                                        <div className="imdb-rating">
                                            <i className="bi bi-star-fill bs-star-icon"></i>
                                            <span>{item.vote_average?.toFixed(1)}</span>
                                        </div>
                                    }
                                    <div className="title">{item.title}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default SearchAndQuery;
