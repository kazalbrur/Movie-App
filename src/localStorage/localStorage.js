// Movie Functions
export function fetchWhichMovies() {
    let which_movies_local = localStorage.getItem("which_movies_local");
    if (which_movies_local) {
        return which_movies_local;
    } else {
        return "top_rated";
    }
}

export function storeWhichMovies(data) {
    localStorage.setItem("which_movies_local", data);
}

// TV Show Functions
export function fetchWhichTVShows() {
    let which_tvShows_local = localStorage.getItem("which_tvShows_local");
    if (which_tvShows_local) {
        return which_tvShows_local;
    } else {
        return "top_rated";
    }
}

export function storeWhichTVShows(data) {
    localStorage.setItem("which_tvShows_local", data);
}

// Sorting Functions
export function fetchSortedBy() {
    let sorted_by_local = localStorage.getItem("sorted_by_local");
    if (sorted_by_local) {
        return sorted_by_local;
    } else {
        return "default";
    }
}

export function storeSortedBy(data) {
    localStorage.setItem("sorted_by_local", data);
}

// Language Functions
export function fetchLanguage() {
    let language_local = localStorage.getItem("language_local");
    if (language_local) {
        return language_local;
    } else {
        return "en-US";
    }
}

export function storeLanguage(data) {
    localStorage.setItem("language_local", data);
}

// Input Functions
export function fetchInput() {
    let input_local = localStorage.getItem("input_local");
    if (input_local) {
        return input_local;
    } else {
        return "";
    }
}

export function storeInput(data) {
    localStorage.setItem("input_local", data);
}

// Removing previous variables saved in users' local storage for this website.
// Because I changed the variables names.
localStorage.removeItem("which_movies");
localStorage.removeItem("sorted_by");
localStorage.removeItem("language");
localStorage.removeItem("input");
