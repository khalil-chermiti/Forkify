// Global app controller

// imports
import {elements , renderLoader , clearLoader} from "./view/base";
import searchModel from "./model/searchModel";
import * as searchView from "./view/searchView";

// the state of the app 
let state = {};

const searchController = async () => {

  // get the search query
  let query = searchView.getInput();

  if (query) {
    // instansiate a new search object
    state.search = new searchModel(query);

    // clean the UI
    searchView.clearList();
    searchView.clearInput();
    renderLoader(elements.results)

    // get the results
    await state.search.getResults();

    clearLoader(elements.results)

    console.log(state.search.results);

    // render the results
    searchView.renderRecipes(state.search.results);
  }
};

elements.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchController();
});
