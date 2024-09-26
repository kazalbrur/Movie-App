import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import {
  setInput,
  setLanguage,
  setSortedBy,
  setWhichMovies,
  setWhichTVShows,
} from "../redux/features/navigationBar/navigationBarSlice";
import { getSearchAndQuery } from "../redux/features/searchAndQuery/searchAndQuerySlice";

import { Button, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";

import "../styles/NavigationBar.css";

import * as Functions from "../localStorage/localStorage";

function NavigationBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentLocation = location.pathname;
  const dispatch = useDispatch();

  const [isClicked, setIsClicked] = useState({
    movies: Functions.fetchWhichMovies(),
    sortedBy: Functions.fetchSortedBy(),
    language: Functions.fetchLanguage(),
    tvShows: Functions.fetchWhichTVShows(), // Add TV shows to state tracking
  });

  const input = useSelector((state) => state.navigationBarReducer.input);
  const language = useSelector((state) => state.navigationBarReducer.language);

  const handleOptionClick = (type, value) => {
    setIsClicked({ ...isClicked, [type]: value });
    switch (type) {
      case "movies":
        dispatch(setWhichMovies(value));
        break;
      case "tvShows":
            dispatch(setWhichTVShows(value)); // Dispatch TV shows action
            break;
      case "sortedBy":
        dispatch(setSortedBy(value));
        break;
      case "language":
        dispatch(setLanguage(value));
        break;
      default:
        break;
    }
  };

  const handleInputChange = (e) => {
    dispatch(setInput(e.target.value));
  };

  const navbarBrandClick = () => {
    if (currentLocation === "/") {
      window.scrollTo(0, 0);
    } else {
      navigate("/");
    }
  };

  const activeStyle = {
    color: "#DC3545",
    fontWeight: "bold",
  };

  return (
    <Navbar fixed="top" expand="lg" className="bg-dark" data-bs-theme="dark">
      <div className="container">
        <Navbar.Brand
          onClick={navbarBrandClick}
          style={{ cursor: "pointer" }}
        >
          <img src={logo} alt="logo" style={{ width: "120px" }} />
        </Navbar.Brand>

        {currentLocation === "/" && (
          <>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav className="me-auto my-2 my-lg-0">
                {input === "" && (
                  <>
                    {/* Movie Lists */}
                    <NavDropdown
                      title={language === "en-US" ? "Movie Lists" : "Film Listeleri"}
                    >
                      <NavDropdown.Item
                        className="dropdown-item"
                        onClick={() => handleOptionClick("movies", "top_rated")}
                        style={isClicked.movies === "top_rated" ? activeStyle : {}}
                      >
                        {language === "en-US" ? "Top Rated" : "En Fazla Oy Alan"}
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        className="dropdown-item"
                        onClick={() => handleOptionClick("movies", "popular")}
                        style={isClicked.movies === "popular" ? activeStyle : {}}
                      >
                        {language === "en-US" ? "Popular" : "Popüler"}
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        className="dropdown-item"
                        onClick={() => handleOptionClick("movies", "upcoming")}
                        style={isClicked.movies === "upcoming" ? activeStyle : {}}
                      >
                        {language === "en-US" ? "Upcoming" : "Gelecek"}
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        className="dropdown-item"
                        onClick={() => handleOptionClick("movies", "now_playing")}
                        style={isClicked.movies === "now_playing" ? activeStyle : {}}
                      >
                        {language === "en-US" ? "Now Playing" : "Gösterimdekiler"}
                      </NavDropdown.Item>
                    </NavDropdown>

                    {/* TV Show Lists */}
                    <NavDropdown
                      title={language === "en-US" ? "TV Show Lists" : "Dizi Listeleri"}
                    >
                      <NavDropdown.Item
                        className="dropdown-item"
                        onClick={() => handleOptionClick("tvShows", "top_rated")}
                        style={isClicked.tvShows === "top_rated" ? activeStyle : {}}
                      >
                        {language === "en-US" ? "Top Rated" : "En Fazla Oy Alan"}
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        className="dropdown-item"
                        onClick={() => handleOptionClick("tvShows", "popular")}
                        style={isClicked.tvShows === "popular" ? activeStyle : {}}
                      >
                        {language === "en-US" ? "Popular" : "Popüler"}
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        className="dropdown-item"
                        onClick={() => handleOptionClick("tvShows", "on_the_air")}
                        style={isClicked.tvShows === "on_the_air" ? activeStyle : {}}
                      >
                        {language === "en-US" ? "On the Air" : "Yayında"}
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        className="dropdown-item"
                        onClick={() => handleOptionClick("tvShows", "airing_today")}
                        style={isClicked.tvShows === "airing_today" ? activeStyle : {}}
                      >
                        {language === "en-US" ? "Airing Today" : "Bugün Yayında"}
                      </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown
                      title={language === "en-US" ? "Sorted By IMDb Ratings" : "IMDb Puanına Göre"}
                    >
                      <NavDropdown.Item
                        className="dropdown-item"
                        onClick={() => handleOptionClick("sortedBy", "default")}
                        style={isClicked.sortedBy === "default" ? activeStyle : {}}
                      >
                        {language === "en-US" ? "Default" : "Varsayılan"}
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        className="dropdown-item"
                        onClick={() => handleOptionClick("sortedBy", "descending")}
                        style={isClicked.sortedBy === "descending" ? activeStyle : {}}
                      >
                        {language === "en-US" ? "Descending" : "Azalan"}
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        className="dropdown-item"
                        onClick={() => handleOptionClick("sortedBy", "ascending")}
                        style={isClicked.sortedBy === "ascending" ? activeStyle : {}}
                      >
                        {language === "en-US" ? "Ascending" : "Artan"}
                      </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown
                      title={language === "en-US" ? "Language" : "Dil"}
                    >
                      <NavDropdown.Item
                        className="dropdown-item"
                        onClick={() => handleOptionClick("language", "en-US")}
                        style={isClicked.language === "en-US" ? activeStyle : {}}
                      >
                        {language === "en-US" ? "English (en-US)" : "İngilizce (en-US)"}
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        className="dropdown-item"
                        onClick={() => handleOptionClick("language", "tr-TR")}
                        style={isClicked.language === "tr-TR" ? activeStyle : {}}
                      >
                        {language === "en-US" ? "Turkish (tr-TR)" : "Türkçe (tr-TR)"}
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                )}
              </Nav>
              <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                <Form.Control
                  type="search"
                  placeholder={language === "en-US" ? "Search movie or TV show" : "Film ya da dizi ara"}
                  className="input me-1"
                  aria-label="Search"
                  onChange={handleInputChange}
                  value={input}
                  spellCheck="false"
                />
                <Button
                  className="btn btn-danger text-white"
                  type="submit"
                  onClick={() => dispatch(getSearchAndQuery(input))}
                >
                  Search
                </Button>
              </Form>
            </Navbar.Collapse>
          </>
        )}
      </div>
    </Navbar>
  );
}

export default NavigationBar;
