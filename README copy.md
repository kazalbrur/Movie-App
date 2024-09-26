
Skip to content
Tekolio

    React JS

DSA

How to build a Movie App in React using TMDB API?

    Ateev DuggalAteev DuggalMarch 26, 2023How toReact JS

Share your love

React Movie App or Movie App in React is a fun project that every React developer should make once, in order to improve/ enhance/ polish their React coding skills. It is a must considering AIs like ChatGPT which can do pretty much anything even coding are now among us. So it’s better to understand these concepts well in order to use them in our future projects

In this blog, we will be making a movie app in React using TMDB API by using some very easy but tricky concepts to make our app more entertaining. These concepts are –

    Fetching data from API
    Displaying data in the form of a card
    Pagination
    Filtering data of both Movies and TV Shows based on their genre
    A custom hook to help us in this filtering process
    A Custom Search Bar using which we can search movies as well as tv series.

    We will be using Bootstrap for default styling and the rest will be done by custom CSS which will not be discussed in this blog as the main focus of this blog is explaining the construction and use of the different components that we have made in this app like the Filter Component, Custom Hook, etc. But for people who want to practice the styling part as well, here is the GitHub repo of this project and the live link.

Let’s Start…
Index

    Creating the React App
    Getting the API Key from TMDB’s official website
    Working on the UI Part of the App
    Making routes for these buttons using React-Router-DOM
    Building Different Page Components of our App
        The Trending Page
            Getting the data from the API using React Hooks
            Working on the UI Part of the Trending Component
            Building the Pagination Component
            Building the UI of the Pagination Component
            Working on the functionality of the Pagination Component
        The Movies Page
            Working on the UI part of the Movies Page
            Creating the Genre Component
                Working on the UI part of the Genre Component
            Adding Add and Remove Functionalities to the Button
            Creating the Custom Hook – useGenre
        TV Series Page
            Working on the UI part of the TV Series Page
        The Custom Search Page
            Working on the UI of the Search Section of the Page
            Working on fetching the results from the API using Hooks
    Summary

Creating the React App

First and foremost we have to create our React app. It’s straightforward to create a React app – just go to your working directory in your preferred IDE and enter the following command in the terminal:

npx create-react-app the-movie-central

If you are unsure how to set up a create-react-app project properly, you can refer to the official guide here at create-react-app-dev.‌‌

After the setup, run npm start in the same terminal to start localhost:3000 where our React app will be hosted. We can also see all our changes there.

Our movie app wouldn’t be any good if we didn’t have any movies to display. So to solve this issue we will be using the TMDB API as our source for movies and other stuff related to it. This API is free to use, and all we have to do is sign up and get an API key. Let’s see how.
Getting the API Key from TMDB’s official website

TMDB stands for The Movie DataBase which is basically an online database that contains information related to films, television programs, and video games. It is a community-built resource, open to anyone who would like to contribute.

The TMDB API provides access to detailed information about movies, television shows, actors, crew members, and more. The API includes over 3 million pieces of data, including movie posters, release dates, cast and crew information, plot summaries, and more.

And we are going to take advantage of all these features that this API is providing while making our Movie App, though we will be limiting ourselves to the Movie Section and the TV Series Section.

To get the API key follow the steps given below methodically –

Visit the official website of TMDB.
TMDB Official WebsiteTMDB Official Website

Sign up for a free account by clicking the Join TMDB button in the Navbar and fill all the required details as shown.

We need to verify our email address by clicking on the blue button which says – Activate my Account.

After you have successfully created an account, go to Account Settings and select the API option from the left sidebar.

This will open a new tab where you will find a field with the label Request An API Key, click the link below and fill in the details that follow.

Once you have filled and submitted the form, your API key will be generated and displayed on the page (it may take some time depending on how busy the server is).
Working on the UI Part of the App

Our app is divided into 3 sections –

    The Header Section,
    The Navigation Section,
    The Body Section.

The Header Section of the app contains only the name – The Movie Central with a special symbol which we have taken from an icon library – font awesome.
Header section for the Movie CentralHeader section

As for the Navigation Section of the app, there are four buttons representing the four different pages of the app that will display their respective content using different APIs that we will make in the later section of our app.

These four Pages are –

    Trending Page– here we will be displaying those movies and TV Series that are trending right now
    Movie Page – here we will display all the movies in chronological order that can be filtered based on their genre (we will discuss this in detail in the later section of the blog).
    TV Series Page – same as the Movies Page, here we will display all the TV Series in chronological order which can be filtered based on their genre.
    Custom Search Page – here we can search for any movie or tv series just by typing its name in the search bar and clicking on the search button.

To build this Navigation bar we have used dynamic coding. We have created an array that contains the data related to those four buttons that we will be making for our navigation, and then using the map() function of the array we will display it in our app.
import React from "react";
 
 
const Footer = () => {
  const data = [
    {
      icon: "fas fa-fire-alt",
      name: "Trending",
    },
    {
      icon: "fas fa-film",
      name: "Movies",
    },
    {
      icon: "fas fa-tv",
      name: "TV Series",
    },
    {
      icon: "fas fa-search",
      name: "Search",
    },
  ];
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 text-center bg-dark footer">
            {data.map((Val) => {
              return (
                <>
                  <button className="col-sm-2 col-md-2 btn btn-dark">
                    <i className={`${Val.icon}`} id="fire"></i>
                    <br />
                    <h5 className="pt-1 fs-6">{Val.name}</h5>
                  </button>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
 
 
export default Footer;

Check the image below to get a better idea of how it will look.

    We have used Font Awesome for the icons, but you can use any icon library like Material UI Icons, Bootstrap icons, etc in which you feel comfortable.

Making routes for these buttons using React-Router-DOM

Let’s make those links and pages which these buttons will point to using the React Router DOM In our App.js file import and use the BrowserRouter, Routes, and Route from React Router DOM.
import { BrowserRouter, Routes, Route } from "react-router-dom";

Now as per the documentation of React Router DOM, we have to wrap the rest of the code containing the name and links of those pages inside BrowserRouter and Routes so that we can switch between them without re-rendering the whole app and to do that we have to wrap the individual page code with Route as shown.
import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Trending from "./Pages/Trending";
import Movies from "./Pages/Movies";
import TV from "./Pages/TV";
import Search from "./Pages/Search";
import SingleMovie from "./Pages/SingleMovie";
import Error from "./Pages/Error";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Trending />} exact />
     // Home page is denoted with ‘/’ symbol
          <Route path="/movies" element={<Movies /> // movies page
          <Route path="/tv" element={<TV />} /> // TV Series Page
          <Route path="/search" element={<Search />} /> 
     // Custom Search Page
          <Route path="*" element={<Error />} /> // Error Page
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};
 
 
export default App;

Now let’s add these links to the four buttons using another component provided to us by the React Router DOM – NavLink.
import React from "react";
import { NavLink } from "react-router-dom";
 
 
const Footer = () => {
  const data = [
    {
      icon: "fas fa-fire-alt",
      name: "Trending",
      link: "/",
    },
    {
      icon: "fas fa-film",
      name: "Movies",
      link: "/movies",
    },
    {
      icon: "fas fa-tv",
      name: "TV Series",
      link: "/tv",
    },
    {
      icon: "fas fa-search",
      name: "Search",
      link: "/search",
    },
  ];
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 text-center bg-dark footer">
            {data.map((Val) => {
              return (
                <>
                  <NavLink to={`${Val.link}`}>
                    <button className="col-sm-2 col-md-2 btn btn-dark">
                      <i className={`${Val.icon}`} id="fire"></i>
                      <br />
                      <h5 className="pt-1 fs-6">{Val.name}</h5>
                    </button>
                  </NavLink>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
 
 
export default Footer;

    According to the React Router DOM’s official documentation –
    A stores the current location in the browser’s address bar using clean URLs and navigates using the browser’s built-in history stack.
    Rendered anywhere in the app, will match a set of child routes from the current location.
    A is a special kind of that knows whether or not it is “active” or “pending”. This is useful when building a navigation menu, such as a breadcrumb or a set of tabs where you’d like to show which of them is currently selected. It also provides useful context for assistive technology like screen readers.

Building Different Page Components of our App

As discussed above, our app will consist of four pages – the Trending Page, the Movies Page, the TV Series Page, and the Custom Search page. All these pages will have the same UI but will be made using different APIs, and as far as styling is concerned we will be using Bootstrap classes for some default styling and the rest of the styling will be done by Custom CSS.

Let’s start with the Trending Page.
https://api.themoviedb.org/3/trending/all/day?api_key=${Access_key}&page=${page}`
The Trending Page

This page contains both movies and tv shows that are trending right now.

This page is divided into three parts- the header which again contains the name of the page, the card section which will display the data fetched in the form of cards and the Pagination section.

Given below is the API that we will be using to make this page.

    In the above-mentioned API, we have used two String Literals – ${Access_key} and ${page}. The Access_key string literal will be replaced with the API key that we have generated at the beginning of the blog. We have done this to secure our API key so that no one can misuse it as we are only allowed to make a limited number of API calls.

    For this reason, everyone gets a different API Key. It’s always best to hide these keys from others so that it doesn’t get misused.

    As the data that we can fetch from the API comes in batches and every batch has a total of 20 results. So, this Page String Literal helps us in switching between pages and also in fetching the next batch of data.l

Getting the data from the API using React Hooks

There are various methods using which we can fetch data from the API, but we will be using the Async-Await method in combination with the fetch() to fetch data in JSON format.
const [state, setState] = useState([]); //initializing the state variable as an empty array
const fetchTrending = async () => {
  const data = await fetch(`
https://api.themoviedb.org/3/trending/all/day?api_key=${Access_key}`);
  const dataJ = await data.json(); // fetching data from API in JSON Format
  setState(dataJ.results); //storing that data in the state
};
 
useEffect(() => {
  fetchTrending(); //calling the fetchTrending function only during the initial rendering of the app.
}, []);

In the above code, we have used the useState and useEffect Hook responsible for state change and other side effects like fetching the data from an API.

We have initialized a state variable as an empty array because it will store the data fetched from the API and then show it in the Body Section of the app.

As for the function we have created to fetch data from the API, we have used the Async-Await method in combination with the fetch() method. As soon as the data is fetched from the API, it is then converted into the JSON format and stored in the only state variable we have created and initialized as an empty array.

It’s better to use this function inside the useEffect hook as it will prevent any re-rendering of the data if we made any changes in the UI of our App. To understand useEffect in-depth, click here.
Working on the UI Part of the Trending Component
<div className="container">
<div className="row py-5 my-5">
<div className="col-12 mt-2 mb-4 fs-1 fw-bold text-decoration-underline head d-flex justify-content-center align-items-center">
  <i className="fas fa-fire mx-4 text-danger"></i>
  <h4 className="fs-2">Trending Today</h4>
  <i className="fas fa-fire mx-4 text-danger"></i>
</div>
</div>
</div>

In the above code, we have done nothing out of the ordinary. We have just used the Font Awesome Library to get the trendy icon which will be used in conjunction with the text – Trending Today.

Now it’s time to work on the data that we have just fetched from the API using hooks. We will be using these values in our app with the help of the map() function which will create a new array of these data from where we can call them one by one.
{
  state.map((Val) => {
    const {
      name,
      title,
      poster_path,
      first_air_date,
      release_date,
      media_type,
      id,
    } = Val;
    return (
      <>
        <div
          key={id}
          className="col-md-3 col-sm-4 py-3 d-flex justify-content-center g-4"
          id="card"
        >
          <div className="card bg-dark" key={id}>
            <img
              src={poster_path ? `${img_300}/${poster_path}` : unavailable}
              className="card-img-top pt-3 pb-0 px-3"
            />
            <div className="card-body">
              <h5 className="card-title text-center fs-5">{title || name}</h5>
              <div className="d-flex fs-6 align-items-center justify-content-evenly movie">
                <div>{media_type === "tv" ? "TV" : "Movie"}</div>
                <div>{first_air_date || release_date}</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  });
}

In the above code, we have destructured the values that we want to use in our app using the destructuring technique of ES6 and saved them in the Val variable. This will make the calling process of each value far easier than it would have been if we had done it in the same conventional way. We will be displaying these values in the form of a card, and with the help of a flexbox, we will make it responsive for all devices.

Here for the image part, we have used a ternary operator according to which there exists a Poster_Path for that particular movie or tv series. For this, we have already saved all the images in a separate file outside of our app structure and will be using them in the form of a general link which will be imported from the config.js file.

export const img_300 = “https://image.tmdb.org/t/p/w300”;

Then the actual link of the image will become https://image.tmdb.org/t/p/w300${Poster_path

And if by chance there is no image available for that particular movie or tv series, then we have to show an image with the text Poster not Available which again we have already made and stored it in the config.js by converting it into a link.

export const unavailable =
“https://www.movienewz.com/img/films/poster-holder.jpg”;
Poster Not Available

Next in line is the title of either movie or tv series followed by the media type and the airing date of that particular media type. In the case of the media type, a ternary operator is used again as our API is a combination of both Movies and TV Series, and both of them fall under the category of the media type. Thus our statement will be like this – “if the media type is tv then print TV, else print MOVIE”

In the case of the airing date, our data contains two types of dates which means the same thing – first_airing_date and release_date. So for this, we have used the logical OR operator which says if any one of the two values is present, display that. And there is no chance of not having a release date of either movie or tv series so no ternary operator.

So now our app looks like this
The Trending PageThe Trending Page

Now that we have made one of the four pages/components, it will be easier to make the rest of them as the UI part will remain the same, the only difference we will see is in their APIs through which we will be fetching the required data that will be displayed in the form of the card as shown above. But before that, let’s complete this page by making a pagination component as well.

You can get a better understanding of how to make a Pagination Component using hooks from scratch by reading this blog or you can even use an npm package to make it even simpler.
Building the Pagination Component

We have to be careful when dealing with large sums of data as it can harm our app in more ways than one. And in this case, also we are dealing with an API that has a large amount of data stored in it. So, we somehow have to limit the amount of data that we want to display in our app in one go.

There are multiple ways of doing that but for this app, we will be making a Pagination Component. This is because it divides the content into pages decreasing the pressure on the DOM tree while keeping the efficiency of our app intact.

The API that we are using has a limit by default. It only shows up to 20 items in one go, and for the next batch of data we have to change pages but for that, we have to convert these page numbers into a state so that we can change it using a button and get the next batch of data.

We have to initialize a state variable for these page numbers so that we can fetch the next batch of data from the API. For this, we have to use the useState hook as then only we have the power to change the state using the setState function.
const [page, setPage] = useState(1); // initialized the page state with the initial value of 1
Building the UI of the Pagination Component
<div className="my-3 d-flex justify-content-between align-items-center">
  <button className="px-3 py-1 m-1 text-center btn-primary" onClick={Previous}>
    Previous
  </button>
  <button className="px-3 py-1 m-1 text-center btn-primary" onClick={Next}>
    Next
  </button>
</div>;

In the above code, we have created a button with an onClick() event handler which when clicked triggers a function using which we can change pages and can fetch either the next batch of data or the previous batch of data depending upon which button we are clicking – Next or Previous.
Working on the functionality of the Pagination Component

In the UI part of our Pagination Component, we have created two buttons – Previous and Next
const Previous = () => {
  if (page !== 1) {
    setPage(page - 1);
  } else {
    setPage(page);
  }
};
 
const Next = () => {
  if (page < 10) {
    setPage(page + 1);
  }
};

The above code describes the function which will be triggered when we click its respective button. Nothing out of the ordinary was done by us other than using an if-else statement with the state which we have defined using the useState hook.

In the case of the Previous Button, we will first check whether the value of the state is 1 or not. If it’s 1, the previous button will not work as that’s our Home Page, but if it’s anything greater than 1 then we will decrease its count by 1.

Similarly, in the case of the Next Button, we will first check whether the count of the state is less than the maximum number of pages that we want our app to display. In our case, it is 10. We will increase the page count by 1 if that’s the case, else the button will not work or the function will not trigger.

Now that we have successfully created our Trending Page, it’s time to create the rest of the pages. As previously told, the UI of each page will remain the same that is the data will be displayed in the form of a card, and with the help of flexbox we will make it responsive, the only difference is that each page has a different API for fetching the data.
The Movies Page

This page is also divided into sections – the header section which will contain the name of the page, the Genre Section which will contain buttons that trigger a specific function which we will talk about later in the blog, the Card Section, and the Pagination Section.

On this page, we will only be displaying movies of different genres which are sorted and displayed on the basis of their popularity in ascending order. Given below is the API that we will be using to fetch the different movies.
https://api.themoviedb.org/3/discover/movie?api_key=${Access_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}

    In the above-mentioned API, we have used three String Literals – ${Access_key}, ${page} and ${genreURL}. The Access_key string literal is used to secure our API Key so that no one can misuse it as we are only allowed to make a limited number of API calls.

    For this reason, everyone gets a different set of Access Keys and Security Keys. It’s always best to hide these keys from others so that it doesn’t get misused and we pay the price for that.

    We all know what purpose page string literal is serving here, but what about the genreURL string literal? This string literal will help us in filtering movies based on their genres.

Working on the UI part of the Movies Page

In the introduction part of this page, we have been told that the UI part of this page comprises three sections – the header, the genre, the card, and the pagination section. The header section only contains the name of the page – Movies, while we have to create the rest of the section with some heavy coding.
<div className="container">
  <div className="row py-5 my-5">
    <div className="col-12 text-center mt-2 mb-4 fs-1 fw-bold text-decoration-underline">
      Movies
    </div>
  </div>
</div>

The best part is we have already created the card and pagination component for our entire app, so there is no need to rewrite the same codes again and again. We will just import the Card Component and the Pagination Component.
Creating the Genre Component

As told, the Movies page consists of an array of genres through which we can filter movies based on their genres. And we know that no movie is based on one genre, so we have to enable multiple selections of genres and filtering of movies as well.

In this component, we will make two arrays – one will contain and show the list of genres the normal way while the other array will contain and show the selected genres according to which filtering of movies will take place. Rest assured we can deselect them as well.

Let’s start making it, but before that have a look at the Genre Component.
The Genre ComponentThe Genre Component

For starters let’s make some state variables and their respective functions using the useState hook to store these values and also to store the page numbers and the data that we will fetch from the API.
const [state, setState] = useState([]); //store the fetched data
const [page, setPage] = useState(1); //keep a track of the page numbers
const [genre, setGenre] = useState([]);//used to store the non-selected genre values
const [value, setValue] = useState([]);//used to store the selected genre values

We will pass these values from the Movies Component to the Genre Component as props. One thing to remember is that the same Genre Component will be used for filtering the TV Series as well, so we have to pass a type variable for the same. For the Movies Page, its value will be “movie”.
<Genre
  genre={genre}
  setGenre={setGenre}
  setPage={setPage}
  type="movie"
  value={value}
  setValue={setValue}
/>

    We are sending the setPage function as well to the Genre Component as props because whenever we filter the movie data depending upon the genre, the number of pages will also be updated with respect to the new data that is being currently displayed.

Now in the Genre Component, we will get and use all these values using the destructuring property of ES6. In this component also, we have to fetch data from a different API that is made for genres by using our Access_key string literal and the type prop we have passed from the Movie component.

Its value (as mentioned above) is movie as we just have to fetch the movie genres only from the API. And the same component and the API will be used in the TV Series page the only difference will be that the value of the type variable will be equal to ‘tv’.

So, here is the API that we will be used to fetch all the genres using the useEffect hook in the same way we did in the Trending Component.
import React, { useEffect } from "react";
 
const Genre = ({ genre, setGenre, setPage, type, value, setValue }) => {
const fetchGenre = async () => {
const data = await fetch( https://api.themoviedb.org/3/genre/${type}/list?api_key=${Access_key}&language=en-US
);
const { genres } = await data.json();
setGenre(genres);
};
 
useEffect(() => {
fetchGenre();
}, []);
Working on the UI part of the Genre Component

The UI of the Genre component will only contain clickable buttons that will dynamically display depending on the number of genres that we have fetched from the API. According to the intro part of the Genre component, two arrays will be formed – one that will contain non-selected genres and the other that will contain the selected genres.

The array that contains the selected genres will be displayed before the non-selected genre array. As you can see in the image given below.
return (
    <>
      <div className="container-fluid">
        <div className="row mb-3">
          <div className="col-12 d-flex flex-wrap">
            {value &&
              value.map((Val) => {
                const { id, name } = Val;
                return (
                  <>
                    <div className="m-2" key={id}>
                      <button
                        className="bg-dark text-white px-4 py-2 text-center buttons"
                        onClick={() => CategoryRemove(Val)}
                      >
                        {name}
                      </button>
                    </div>
                  </>
                );
              })}
 
 
            {genre && //if genre exist
              genre.map((Gen) => {
                const { id, name } = Gen;
                return (
                  <>
                    <div className="m-2" key={id}>
                      <button
                        className="bg-dark text-white px-4 py-2 text-center button"
                        onClick={() => CategoryAdd(Gen)}
                      >
                        {name}
                      </button>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};
Adding Add and Remove Functionalities to the Button

We know that the UI part of our component only contains clickable components. Let’s add some functionalities to that button using the onClick() event handler.

Let’s start with the Add functionality. This functionality lets us add the genres to the selected array from the non-selected array and bring those genre names in front.
//Adding a particular genre to the selected array
const CategoryAdd = (genres) => {
  //first - select everything that's inside of values using the spread operator
  //second - add those genres that are being sent from the non-selected arrays
  setValue([...value, genres]);
  //removing those genres from the non-selected array that have been added to the selected array.
  setGenre(genre.filter((g) => g.id !== genres.id));
  setPage(1);
};

In the above code, we have used the spread operator to add the genres from the non-selected array to the selected one. We have first selected all the data of the selected array with the help of the spread operator and then added the genre coming from the non-selected array to the selected array.

Next comes removing those genres from the non-selected array that we have just added to the selected array and for that we have used the filter() function of the javascript.

Now let’s work on the remove functionality. The code will remain the same, except that this time genres will be removed from the selected array while it gets added to the non-selected arrays. See the below code to understand.
//removing a particular genre from the selected array
const CategoryRemove = (genres) => {
  setValue(value.filter((g) => g.id !== genres.id));
  setGenre([…genre, genres]);
  setPage(1);
  };

Remember in the above section when we introduced the respective API for the Movies Component, there was a string literal – ${genreURL}, we have to replace this string literal with a string of the codes that we are receiving from the API of Genre Component.

For this to happen we have to create a custom hook as we have to do the same thing with the TV Series Component, so it’s better to create a custom hook and store the function in it so that we can use it again and again.
Creating the Custom Hook – useGenre

Creating and using a custom hook in our React App is a very good practice as it increases readability, reusability, and many other things which go hand in hand with cleaner code like enhanced rendering speed.

In this case, we are creating this custom hook to convert the particular genre code fetched from the genre API of our Genre Component into a string so that our API of the Movies Component can read it and we can filter movies accordingly.

To do this we will be using the reduce method of the javascript. According to the w3schools, the reduce() method returns a single value: the function’s accumulated result and it does not change the original array as well. And it can even transform the data from the array into a number, string, or object.

For example, we have received values like 20, 99, and 88. This will be converted into an array as there are two arrays that we are dealing with right now – the non-selected array and the selected array. And we have to convert this into a string.
[20, 99, 88] => 20, 99, 88
const useGenre = (value) => {
  if (value.length < 1) return "";
 
  const GenreIds = value.map((g) => g.id);
  return GenreIds.reduce((acc, curr) => acc + "," + curr);
};
 
export default useGenre;

In the above code, we have first checked whether the selected genre array is empty or not. If it’s empty, return an empty string, else return the values of the selected genre array using the map() function and convert them into a string using the reducer function.

Our reducer function takes in two parameters – acc and curr. acc stands for accumulator meaning the first value while curr stands for the current value. This simple line will convert our array of elements into a string.

But to use this we have to send this custom hook some data from the Movies Component, that is the selected genre state as it is clear from the above code.
const genreURL = useGenre(value);

Now that we have made all the components that we need for our Movies Page to work properly, it’s time to complete this page by adding the Card Component and the Pagination Component. We have already seen how to make them in the Trending Component.
{
  state.map((Val) => {
    const {
      name,
      title,
      poster_path,
      first_air_date,
      release_date,
      media_type,
      id,
    } = Val;
    return (
      <>
        <div className="col-md-3 col-sm-4 py-3" id="card" key={id}>
          <div className="card bg-dark" key={id}>
            <img
              src={poster_path ? `${img_300}/${poster_path}` : unavailable}
              className="card-img-top pt-3 pb-0 px-3"
              alt={title || name}
            />
            <div className="card-body">
              <h5 className="card-title text-center fs-5">{title || name}</h5>
              <div className="d-flex fs-6 align-items-center justify-content-evenly movie">
                <div>{media_type === "tv" ? "TV Series" : "Movie"}</div>
                <div>{first_air_date || release_date}</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  });
}
<Pagination page={page} setPage={setPage} />;
The Movie Page
TV Series Page

In this page, we will only be displaying various tv series which are sorted and displayed on the basis of their popularity in ascending order. As we have already said at the beginning of the blog, the only difference between these pages is their API, and the rest remains the same.

Just like the Movies Page, this page is also divided into 4 sections – the Header Section, the Genre Section, the Card Section, and the Pagination Section. The Header Section contains only the name of the Page – TV Series. As for the rest, we have already made them in our Movies Page.

Given below is the API that we will be using to fetch the different movies.
https://api.themoviedb.org/3/discover/tv?api_key=3d820eab8fd533d2fd7e1514e86292ea&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`);

    In the above-mentioned API, we have used three String Literals – ${Access_key}, ${page} and ${genreURL}. The Access_key string literal is used to secure our API Key so that no one can misuse it as we are only allowed to make a limited number of API calls.

    For this reason, everyone gets a different set of Access Keys and Security Keys. It’s always best to hide these keys from others so that it doesn’t get misused and we pay the price for that.

We all know what purpose page string literal is serving here, but what about the genreURL string literal? This string literal will help us in filtering movies based on their genres.
Working on the UI part of the TV Series Page

As told above, the UI of this page is quite similar to the Movies Page so the entire code we have just written for the Movies Page will also be written for the TV Series Page except for the type variable of the genre component.

The type variable of the Movies Page has the value of ‘movies’ as it will fetch all the genres that different movies are based on from the API. But here the value of the type variable will be ‘tv’ as we want to fetch different genres on which TV shows are based on so that we can display them and filter the TV Series data accordingly.

Here is the complete code –
import React, { useState, useEffect } from "react";
import { img_300, unavailable } from "../Components/config";
import Pagination from "../Components/Pagination";
import Genre from "../Components/Genre";
import useGenre from "../useGenre";
const TV = () => {
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState([]);
  const [value, setValue] = useState([]);
  const genreURL = useGenre(value);
 
 
  const fetchTrending = async () => {
    const data = await fetch(`
    https://api.themoviedb.org/3/discover/tv?api_key=3d820eab8fd533d2fd7e1514e86292ea&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`);
    const dataJ = await data.json();
    setState(dataJ.results);
  };
  useEffect(() => {
    fetchTrending();
  }, [page, genreURL]);
 
 
  return (
    <>
      <div className="container">
        <div className="row py-5 my-5">
          <div className="col-12 text-center mt-2 mb-4 fs-1 fw-bold text-decoration-underline">
            TV Series
          </div>
          <Genre
            genre={genre}
            setGenre={setGenre}
            setPage={setPage}
            type="tv"
            value={value}
            setValue={setValue}
          />
          {state.map((Val) => {
            const {
              name,
              title,
              poster_path,
              first_air_date,
              release_date,
              media_type,
              id,
            } = Val;
            return (
              <>
                <div className="col-md-3 col-sm-4 py-3" id="card" key={id}>
                  <div className="card bg-dark" key={id}>
                    <img
                      src={
                        poster_path ? `${img_300}/${poster_path}` : unavailable
                      }
                      className="card-img-top pt-3 pb-0 px-3"
                      alt={title || name}
                    />
                    <div className="card-body">
                      <h5 className="card-title text-center fs-5">
                        {title || name}
                      </h5>
                      <div className="d-flex fs-6 align-items-center justify-content-evenly movie">
                        <div>{media_type === "movie" ? "Movie" : "TV"}</div>
                        <div>{first_air_date || release_date}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
          <Pagination page={page} setPage={setPage} />
        </div>
      </div>
    </>
  );
};
 
 
export default TV;
The TV Page
The Custom Search Page

This page is mainly about searching and getting various results related to our favorite movies and tv shows. We just have to enter the query and hit the search button and BOON here comes all the movies and TV Shows related to that query that the API has. Let’s see this page in action.
Custom Search Page

Let’s start building this page. But before that let’s get familiar with the API that we will be using
https://api.themoviedb.org/3/search/multi?api_key=${Access_key}&language=en-US&query=${searchText}&page=${page}&include_adult=false

In the above, there are once again three String Literal that we have used. We are already familiar with the two of them – the Access_key and the page string literal but the searchText String Literal is new here. This string literal is used as a query parameter which will help us in searching the movies and tv series, and its value will be received through the input section which we will discuss later in this section.

Just like every other page our app has, this page is also divided into 3 sections – the Search Section, the Card Section, and the Pagination Section.
Working on the UI of the Search Section of the Page

This section is made by combining two components – the Input Component and the Button Component. The Input Component is just a regular input tag of HTML with an onChange() event handler to get the value of the text written by us in the input field.

And the button is also a regular button tag of HTML which has an onClick() event handler that triggers the Search function.
<div className="col-12 pt-5 pb-3 mt-5 d-flex justify-content-center align-items-center">
  <input
    type="text"
    placeholder="search..."
    onChange={Trigger}
    className="form-control-lg col-6 search bg-dark text-white border border-0"
  />
  <button
    className="btn btn-primary text-white mx-2 col-md-1 col-sm-2 py-2"
    onClick={Search}
  >
    <i className="fas fa-search"></i>
  </button>
</div>;
Working on fetching the results from the API using Hooks

We have already discussed how to fetch data using hooks when we were making our trending page, here’s a quick recap. Make a state variable and initialize it with an empty array in which we will store all the values fetched from the API using the useState hook.

With the help of the Async-Await and fetch method, we can easily fetch data from the API and store it in an empty state which we initialized for this purpose only using its update function which is used to update the initial state. And then with the help of the useEffect hook, we can trigger this function whenever the page renders.
const [searchText, setSearchText] = useState("");
const [page, setPage] = useState(1);
const [content, setContent] = useState([]);
 
const fetchSearch = async () => {
  const data = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=3d820eab8fd533d2fd7e1514e86292ea&language=en-US&query=${searchText}&page=${page}&include_adult=false`
  );
  const { results } = await data.json();
  setContent(results);
};
useEffect(() => {
  fetchSearch();
}, []);
 
const Trigger = (e) => {
  setSearchText(e.target.value);
};
 
const Search = () => {
  fetchSearch();
};

In the above code, we have also explained the function that will be triggered when we click the onChange() and onClick() event handlers respectively.

The Trigger function will display the value which we have written in the search box and will make that value the query parameter for the API – searchText. And as we click the search button, the search button will get triggered which will trigger the fetchSearch() function.

The data that we will fetch from the API will be displayed in the form of cards just like every other page. So here is the code for the Card Component and Pagination Component of this page.
{
  content &&
    content.map((Val) => {
      const {
        name,
        title,
        poster_path,
        first_air_date,
        release_date,
        media_type,
        id,
      } = Val;
      return (
        <>
          <div className="col-md-3 col-sm-4 py-3" id="card" key={id}>
            <div className="card bg-dark" key={id}>
              <img
                src={poster_path ? `${img_300}/${poster_path}` : unavailable}
                className="card-img-top pt-3 pb-0 px-3"
              />
              <div className="card-body">
                <h5 className="card-title text-center fs-5">{title || name}</h5>
                <div className="d-flex fs-6 align-items-center justify-content-evenly movie">
                  <div>{media_type === "tv" ? "TV" : "Movie"}</div>
                  <div>{first_air_date || release_date}</div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    });
}
{
  page > 1 && <Pagination page={page} setPage={setPage} />;
}

In the Pagination Component, we have used a condition statement. According to the condition, the Pagination Component will only be displayed if the data that is fetched from the API has more values than 20 or has more pages than 1.

This is because the API has a limit it can only show up to 20 results on a single page, and the rest will be displayed on the next page. Thus we have checked if the number of pages that the API is sending to us is more than 1, then only display the Pagination Buttons.
Summary

Developing a movie app in React is one of those projects that a React developer should make in order to get a better grasp of various concepts like how and why to make a custom hook, fetching details from API using hooks, and many other simple but tricky concepts of React.

In this blog, we have made a movie app in React which contains 4 pages made from different APIs but have a common UI. The four pages that our app has are the Trending Page, the Movies Page, the TV Series Page, and the Custom Search Page.

The Trending Page displays a list of 20 movies and tv shows that are in trend right now on the basis of their popularity.

The Movies and the TV Series Page displays a sorted list of movies and tv shows on the basis of their popularity.

And the Custom Search page is a page where we can search any movie or tv series by its name, and we will get all the data that the API had on that specific name.

So, it is a fun app to make, and while having fun we can also learn a few of the major, easy, and complex topics of React.
Share your love
Context API
Previous Post A Guide to React Context API and useContext hook
Next Post How to Implement Infinite Scrolling in React by Making a Custom Hook
Infinite Scroll in React
You may also like
Detect a click outside a React Component
How to Detect a Click Outside of a React Component using Hooks?
