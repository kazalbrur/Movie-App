import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { getMovie } from "../redux/features/movie/movieSlice";
import { getTVShow } from "../redux/features/movie/tvShowsSlice"; // Import the new TV shows slice
import { getVideo } from "./../redux/features/video/videoSlice";

import Loading from "./Loading";

import Style from "style-it";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import posterPlaceholder from "../assets/images/poster.webp";


function MediaDetails({ id, type, showVideo, setShowVideo, videoClick }) {
    const dispatch = useDispatch();
    const language = useSelector((state) => state.navigationBarReducer.language);

    useEffect(() => {
        if (type === "movie") {
            dispatch(getMovie({ id, language }));
        } else if (type === "tv") {
            dispatch(getTVShow({ id, language })); // Fetch TV show details
        }

        if (showVideo) {
            dispatch(getVideo({ id, language }));
        }
    }, [dispatch, id, language, showVideo, type]);

    const media = useSelector((state) => type === "movie" ? state.movieReducer.movie : state.tvShowsReducer.tvShow);
    const loading_media = useSelector((state) => type === "movie" ? state.movieReducer.loading : state.tvShowsReducer.loading);

    useEffect(() => {
        if (!loading_media && media?.title) {
            document.title = `${media.title} | Movnite`;
        }
        return () => {
            document.title = "Movnite | Homepage";
        };
    }, [loading_media, media]);

    const crew = useSelector((state) => type === "movie" ? state.creditsReducer.credits : state.tvShowsReducer.credits);
    const director = crew?.find((member) => member.department === "Directing" && member.job === "Director");
    const novel = crew?.find((member) => member.department === "Writing" && member.job === "Novel");

    function formatRuntime(runtime) {
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return language === "en-US" ? `${hours}h ${minutes}m` : `${hours}s ${minutes}d`;
    }

    function handleVideoClick() {
        setShowVideo(true);
        videoClick();
    }

    return (
        <>
            <Helmet>
                <meta name="description" content={media?.overview ? media.overview : `Learn more about ${media?.title} by visiting our website.`} />
            </Helmet>
            {loading_media || !crew ? <Loading /> :
                <>
                    <Style>
                        {`
                        .media-container::before {
                            content: "";
                            background-image: url("https://image.tmdb.org/t/p/original/${media.backdrop_path}");
                            background-size: cover;
                            background-repeat: no-repeat;
                            position: absolute;
                            top: 0;
                            right: 0;
                            bottom: 0;
                            left: 0;
                            opacity: 0.35;
                            filter: blur(3px);
                        `}
                    </Style>

                    <div className="media-container">
                        <div className="react-bs-container container px-md-3">
                            <div className="flex-item">
                                <div className="img">
                                    <LazyLoadImage
                                        src={`https://image.tmdb.org/t/p/original/${media.poster_path}`}
                                        alt={`${media.title} poster image`}
                                        placeholderSrc={posterPlaceholder}
                                        effect="blur"
                                        width="100%"
                                        height="100%"
                                        style={{ color: "white", borderRadius: "0.5rem" }}
                                    />
                                </div>
                            </div>

                            <div className="flex-item second">
                                <div className="title-and-release-date-container">
                                    <span className="title">{media.title}</span>
                                    <span className="release-date">({type === "movie" ? media.release_date?.slice(0, 4) : media.first_air_date?.slice(0, 4)})</span>
                                </div>

                                <div className="genres-and-runtime">
                                    {media.genres && media.genres.length !== 0 &&
                                        <>
                                            <span>• </span>
                                            {media.genres.map((genre, index) => (
                                                <span key={index}>{genre.name}{index !== media.genres.length - 1 && <span>, </span>}</span>
                                            ))}
                                        </>
                                    }
                                    {media.runtime !== 0 && <span className="runtime">• {formatRuntime(media.runtime)}</span>}
                                </div>

                                <div className="rating-and-video-container">
                                    {media.vote_average === 0 ?
                                        <span className="imdb-rating" style={{ color: "#ffffff99" }}>
                                            <i className="bi bi-star-fill bs-star-icon"></i>
                                            <span>NR</span>
                                        </span>
                                        :
                                        <span className="imdb-rating">
                                            <i className="bi bi-star-fill bs-star-icon"></i>
                                            <span>{media.vote_average?.toFixed(1)}</span>
                                        </span>
                                    }

                                    <span className="watch-video">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886" /></svg>
                                        <a onClick={handleVideoClick}>{language === "en-US" ? "Play Video" : "Video Oynat"}</a>
                                    </span>
                                </div>

                                {media.tagline && 
                                    <div className="tagline">
                                        <p>{media.tagline}</p>
                                    </div>
                                }

                                <div className="summary">
                                    <p>{language === "en-US" ? "Overview" : "Özet"}</p>
                                </div>

                                <div className="overview">
                                    {media.overview !== "" ?
                                        <p>{media.overview}</p>
                                        :
                                        <p>
                                            {language === "en-US" ? "We don't have an overview translated in English." : "Türkçe'ye çevrilmiş bir özet henüz bulunmuyor."}
                                        </p>
                                    }
                                </div>

                                <div className="d-flex gap-2 gap-md-4 flex-wrap">
                                    {director &&
                                        <div>
                                            <div className="top">{language === "en-US" ? "Director" : "Yönetmen"}</div>
                                            <div className="bottom">{director.name}</div>
                                        </div>
                                    }

                                    {novel &&
                                        <div>
                                            <div className="top">{language === "en-US" ? "Novel" : "Roman"}</div>
                                            <div className="bottom">{novel.name}</div>
                                        </div>
                                    }

                                    {media.budget !== 0 &&
                                        <div>
                                            <div className="top">{language === "en-US" ? "Budget" : "Bütçe"}</div>
                                            <div className="bottom">{"$" + (media.budget)?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                                        </div>
                                    }

                                    {media.revenue !== 0 &&
                                        <div>
                                            <div className="top">{language === "en-US" ? "Revenue" : "Kazanç"}</div>
                                            <div className="bottom">{"$" + (media.revenue)?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default MediaDetails;
