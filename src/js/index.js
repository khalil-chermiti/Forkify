// Global app controller

// imports
import {elements , renderLoader , clearLoader} from "./view/base";

import searchModel from "./model/searchModel";
import * as searchView from "./view/searchView";
 
import Recipe from "./model/recipeModel" ;
import * as recipeView from './view/recipeView' ;

//////// search controller ///////////

// the app state  
let state = {};

const searchController = async () => {

  // get the search query
  let query = searchView.getInput();

  if (query) {
    // instansiate a new search object
    state.search = new searchModel(query);

    // clean the UI
    searchView.clearResults();
    searchView.clearInput();
    renderLoader(elements.results)
    try {
      
      // get the results
      await state.search.getResults();
      clearLoader(elements.results)
  
      // render the results
      searchView.renderRecipes(state.search.results);

    }catch {
      clearLoader() ;
    }
  }
};

// add event listener on submit to get search results
elements.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchController();
});

// add event listener on pagination's buttons 
elements.resultsPages.addEventListener('click' , (event) => {

  // selecting the closest button element (cuz the buttons contains other elements that will be selected instead)
  let btn = event.target.closest('.btn-inline');

  if (btn){
    // get the page number using the data attribute (so we move to that page);
    const goToPage = parseInt(btn.dataset.goto , 10) ;

    // clearing the last results from UI
    searchView.clearResults();

    // rendering the next or prev page of recipes 
    searchView.renderRecipes(state.search.results , goToPage ) ;
  }
  
})


//////// recipe controller /////////////

const recipeController = async () => {
  // getting the recipe id from the window adress 
  const id = window.location.hash.replace('#' , '');

  if (id) searchView.formatSelected(id) ;
  
  if (id) {
    
    // create the recipe object
    state.recipe = new Recipe(id);
    
    try {
      // prepare the UI for changes 
      recipeView.clearRecipe() ;
      renderLoader(elements.recipe);

      // get the recipe data and parse it 
      await state.recipe.getRecipeData() ;
      state.recipe.parseIng() ; 

      // calculate time and servings 
      state.recipe.calcTime() ;
      state.recipe.calcServings() ;

      // render the recipe 
      clearLoader() ;
      recipeView.renderRecipe(state.recipe) ;

    } catch(err) {
      console.log('error while loading the the recipe' , err ) ;
    }
  }
}

// invoke the recipe controller when the adress hash changes 
window.addEventListener('hashchange' , recipeController) ;
// invoke the recipe controller when the page reloads 
window.addEventListener('load' , recipeController) ;