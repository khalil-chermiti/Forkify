// Global app controller

// imports
import {elements , renderLoader , clearLoader} from "./view/base";

import searchModel from "./model/searchModel";
import * as searchView from "./view/searchView";
 
import Recipe from "./model/recipeModel" ;
import * as recipeView from './view/recipeView' ;

import List from './model/listModel';
import * as listView from './view/listView';

//////// search controller ///////////

// the app state  
let state = {};
window.state = state ;

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

//////// list controller /////////////

const listController = () => {
  // add new list if there is none 
  if (!state.list) {
    state.list = new List() ;
  }

  // add item to the list 
  state.recipe.ing.forEach(el => {
    const item =  state.list.addItem(el.count , el.unit , el.ingredient) 
    listView.renderItem(item) ; 
  }) ;
}

// handling delete and update item list buttons 
elements.list.addEventListener('click' , event => {
  const id = event.target.closest('.shopping__item').dataset.itemid;
  window.id = id ;
   // handle the delete button 
  if (event.target.matches('.shopping__delete , .shopping__delete *')) {
    // delete item from state 
    state.list.deleteItem(id) ; 
    // delete item from UI
    listView.removeItem(id) ;
  } else if (event.target.matches('.shopping__count-value')) {

    //getting the new value from the input field
    const val = parseFloat(event.target.value , 10) ;
    
    console.log(val) ;
    state.list.updateCount(id , val) ;
  }

})
// handling recipe buttons 

elements.recipe.addEventListener('click' , e => {

  if (e.target.matches('.btn-decrease , .btn-decrease *')) {
    // decrease servings 

      state.recipe.updateServings('dec') ;
      recipeView.updateServingsIngredients(state.recipe) ;
    
  }else if (e.target.matches('.btn-increase , .btn-increase *')) {
    // increase servings 
    state.recipe.updateServings('inc')  ;
    recipeView.updateServingsIngredients(state.recipe) ;

  }else if (e.target.matches('.recipe__btn--add , .recipe__btn--add *')){

    // adding ingredients to the list
    listController() ;
  }
})
