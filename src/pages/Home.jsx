import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

import Footer from "../components/Footer";
import Movies from "../components/Movies";
import SearchAndQuery from "../components/SearchAndQuery";
import TVShows from "../components/tvShows"; // Correct casing

function Home() {
    const input = useSelector((state) => state.navigationBarReducer.input);
    const which_movies = useSelector((state) => state.navigationBarReducer.which_movies);
    const which_tvShows = useSelector((state) => state.navigationBarReducer.which_tvShows);

    return (
        <>
            <Helmet>
                <meta name="description" content="Discover your favorite movies and TV shows." />
            </Helmet>
            
            {input === "" ? (
                which_movies ? <Movies /> : <TVShows /> // Ensure correct casing
            ) : (
                <SearchAndQuery />
            )}

            <Footer />
        </>
    );
}

export default Home;
