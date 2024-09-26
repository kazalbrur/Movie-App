import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTVShows } from '../redux/features/movies/tvShowsSlice';
import ExtraInformations from "./ExtraInformations";
import Loading from "./Loading";
import ZeroMovie from "./ZeroMovie";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import posterPlaceholder from "../assets/images/poster.webp";

import "../styles/Movies.css"; // You can reuse the same styles for both movies and TV shows

import * as Functions from "../localStorage/localStorage";

function TVShows() {

    const dispatch = useDispatch();

    const which_tvShows = useSelector((state) => state.navigationBarReducer.which_tvShows); // Ensure you are fetching this state correctly
    const language = useSelector((state) => state.navigationBarReducer.language);

    let tvShows = useSelector((state) => state.tvShowsReducer.tvShows); // Update the state to use TV shows reducer

    const [prevWhichTVShows, setPrevWhichTVShows] = useState(Functions.fetchWhichTVShows());
    const [prevLanguage, setPrevLanguage] = useState(Functions.fetchLanguage());

    useEffect(() => {
        if (prevWhichTVShows !== which_tvShows || prevLanguage !== language || (tvShows.length === 0)) {
            dispatch(getTVShows({ endpoint: which_tvShows, language }));
            setPrevWhichTVShows(which_tvShows);
            setPrevLanguage(language);
        }
    }, [dispatch, which_tvShows, language, prevWhichTVShows, prevLanguage]);

    const loading_tvShows = useSelector((state) => state.tvShowsReducer.loading); // Handle loading state for TV shows
    const sorted_by = useSelector((state) => state.navigationBarReducer.sorted_by);
    const input = useSelector((state) => state.navigationBarReducer.input);

    tvShows = tvShows
        .filter(show => show.poster_path)
        .sort((a, b) => {
            if (sorted_by === "descending") {
                return b.vote_average - a.vote_average;
            } else if (sorted_by === "ascending") {
                return a.vote_average - b.vote_average;
            } else {
                return 0;
            }
        });

    return (
        <div className="bg position-relative">
            <div className="container position-relative">
                {(input.length > 0 && tvShows.length === 0) && <ZeroMovie />}
                {loading_tvShows ? <Loading /> :
                    <>
                        {which_tvShows === "top_rated" && tvShows.length !== 0 ?
                            (language === "en-US" ? <h3 className="which-tvShows">Top Rated TV Shows</h3> : <h3 className="which-tvShows">En Fazla Oy Alan Diziler</h3>) :
                            which_tvShows === "popular" && tvShows.length !== 0 ?
                                (language === "en-US" ? <h3 className="which-tvShows">Popular TV Shows</h3> : <h3 className="which-tvShows">Popüler Diziler</h3>) :
                                which_tvShows === "airing_today" && tvShows.length !== 0 ?
                                    (language === "en-US" ? <h3 className="which-tvShows">Airing Today</h3> : <h3 className="which-tvShows">Bugün Yayında</h3>) :
                                    which_tvShows === "on_the_air" && tvShows.length !== 0 &&
                                    (language === "en-US" ? <h3 className="which-tvShows">On the Air</h3> : <h3 className="which-tvShows">Yayında</h3>)
                        }

                        {(input === "" && tvShows.length > 0) && <ExtraInformations />}

                        <div className="movies-container">
                            <div className="row">
                                {tvShows.map((show, index) => (
                                    <div key={index} className="movie col-4 col-md-3 col-xl-2">
                                        <Link to={`tv/${show.id}-${show.name?.replaceAll(" ", "-").toLowerCase()}`} onClick={() => window.scrollTo(0, 0)}>
                                            <div className="img">
                                                <LazyLoadImage
                                                    src={`https://image.tmdb.org/t/p/w220_and_h330_face/${show.poster_path}`}
                                                    alt={show.name + " poster image"}
                                                    placeholderSrc={posterPlaceholder}
                                                    effect="blur"
                                                    width="100%"
                                                    height="auto"
                                                    style={{ color: "white", borderRadius: "0.5rem", aspectRatio: 3 / 5 }}
                                                />
                                            </div>
                                        </Link>

                                        {show.vote_average === 0
                                            ?
                                            <div className="imdb-rating" style={{ color: "#ffffff99" }}>
                                                <i className="bi bi-star-fill bs-star-icon"></i>
                                                <span>NR</span>
                                            </div>
                                            :
                                            <div className="imdb-rating">
                                                <i className="bi bi-star-fill bs-star-icon"></i>
                                                <span>{(show.vote_average?.toFixed(1))}</span>
                                            </div>
                                        }
                                        <div className="title">{show.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export default TVShows;
