import Search from './models/Search';
import Recipe from './models/recipe';
import * as SearchView from './views/SearchView';
import * as RecipeView from './views/recipeView';
import {
    Elements,
    renderLoader,
    clearLoader
} from './views/Base';


// NOTE - our States 

/** Global state of the app 
 * - Search object
 * - Current recipe object
 * - shopping list object
 * - liked recipes
 */


const state = {}

/*
 * THE SEARCH CONTROLLER 
 */

// FUNCTION - building the search controller . 
// NOTE - in here we use the power of composition .
const searchController = async () => {
    // NOTE - get value from vue 
    const query = SearchView.getInput();
    if (query) {

        // NOTE - SAVING QUERY TO THE STATE
        state.search = new Search(query);

        // NOTE - CLEANING THE LIST + ADDING THE LOADER 
        SearchView.clearInput();
        SearchView.clearRes();
        renderLoader(Elements.searchRes);

        // NOTE - FETCHING RESULT
        await state.search.getResult();

        // NOTE - RENDERING RESULT TO THE UI
        clearLoader();
        SearchView.renderResults(state.search.result);
    }
}

// NOTE - ADDING EVENTLISTENER 
Elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    searchController()
})

Elements.searchResPages.addEventListener('click', ev => {
    const btn = ev.target.closest('.btn-inline');
    console.log(btn);
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto);
        console.log(goToPage);
        SearchView.clearRes();
        SearchView.renderResults(state.search.result, goToPage);
    };
})

/*
 * THE RECIPE CONTROLLER 
 */

const controlRecipe = async () => {
    // get the id from the url
    const id = window.location.hash.replace('#', '');
    console.log(id);

    // get recipe and parse ingredients 
    try {
        if (id) {
            // prepare the UI for changes 
            RecipeView.clearRecipe();
            renderLoader(Elements.recipe);

            if (state.search) SearchView.highlightSelected(id);
            // create the new recipe data 
            state.recipe = new Recipe(id);
            // get recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIng();

            // calculate time and servings 
            state.recipe.calcTime();
            state.recipe.calcServings();

            // render recipe 
            clearLoader();
            RecipeView.renderRecipe(state.recipe)
            // console.log(state.recipe.ingredients) ;
        }
    } catch (error) {
        alert('error processing recipe');
    }

}

// NOTE - adding event listener to the hashchange and load 
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


// NOTE - handling recipe button clicks 
Elements.recipe.addEventListener('click', el => {
    if (el.target.matches('.btn-decrease , .btn-decrease *')) {
        // decrease button is clicked 

        // NOTE making sure we don't go bellow 1 serving 
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            RecipeView.updateServingsIng(state.recipe);
        }

    } else if (el.target.matches('.btn-increase , .btn-increase *')) {
        // increase button is clicked 
        state.recipe.updateServings('inc');
        RecipeView.updateServingsIng(state.recipe);
    }
})