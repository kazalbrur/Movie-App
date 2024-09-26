import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecommendations } from "./../redux/features/recommendations/recommendationsSlice";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import posterPlaceholder from "../assets/images/poster.webp";

import "../styles/Recommendations.css";

function Recommendations({ id, type, setShowVideo }) {
    const dispatch = useDispatch();
    const language = useSelector((state) => state.navigationBarReducer.language);
    const recommendations = useSelector((state) => state.recommendationsReducer.recommendations);
    const loading_recommendations = useSelector((state) => state.recommendationsReducer.loading);
    const loading_images = useSelector((state) => state.imagesReducer.loading);
    const loading_credits = useSelector((state) => state.creditsReducer.loading);
    const loading_movie = useSelector((state) => state.movieReducer.loading);
    const error = useSelector((state) => state.recommendationsReducer.error);

    useEffect(() => {
        dispatch(getRecommendations(id)); // Dispatch based on the ID
    }, [dispatch, id]);

    function handleClick() {
        window.scrollTo(0, 0);
        setShowVideo(false);
    }

    return (
        <>
            {(!loading_recommendations && !loading_images && !loading_credits && !loading_movie) && (
                <>
                    {error && <div className="error-message">{error}</div>}
                    {recommendations.length > 0 ? (
                        <div className="recommendations-container">
                            <h3>{language === "en-US" ? (type === "tv" ? "TV Show Recommendations" : "Movie Recommendations") : (type === "tv" ? "Dizi Tavsiyeleri" : "Film Tavsiyeleri")}</h3>
                            <div className="row">
                                {recommendations.map((recommendation, index) => {
                                    const imageSrc = recommendation.backdrop_path
                                        ? `https://image.tmdb.org/t/p/w250_and_h141_face/${recommendation.backdrop_path}`
                                        : posterPlaceholder;

                                    return (
                                        <div key={index} className="col-6 mb-3 position-relative">
                                            <Link to={`/${type}/${recommendation.id}-${recommendation.title?.replaceAll(" ", "-").toLowerCase()}`} onClick={handleClick}>
                                                <LazyLoadImage
                                                    className="img"
                                                    src={imageSrc}
                                                    alt={`${recommendation.title} background image`}
                                                    placeholderSrc={posterPlaceholder}
                                                    effect="blur"
                                                    width="100%"
                                                    height="auto"
                                                    style={{ color: "white", aspectRatio: 3 / 2 }}
                                                />
                                            </Link>
                                            <div className="position-absolute recommendation-title fw-bold">{recommendation.title}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="recommendations-container">
                            <h3>{language === "en-US" ? (type === "tv" ? "TV Show Recommendations" : "Movie Recommendations") : (type === "tv" ? "Dizi Tavsiyeleri" : "Film Tavsiyeleri")}</h3>
                            <div className="text-secondary">
                                <p>{language === "en-US" ? (type === "tv" ? "There are no recommendations for this TV show." : "There are no recommendations for this movie.") : (type === "tv" ? "Bu dizi için tavsiye yok." : "Bu film için tavsiye yok.")}</p>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default Recommendations;
