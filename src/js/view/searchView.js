import {elements , } from './base'  ;

// return the input value
export const getInput = () => elements.searchField.value ;

// clear input field 
export const clearInput = () => elements.searchField.value = '' ; 

// clearing inputs 
export const clearResults = () => {
    elements.resultsList.innerHTML = '' ;
    elements.resultsPages.innerHTML = '';
}

// format recipe titles  

const formatTitle = (title , limit = 17) => {

    let newArr = [] ;

    if (title.length > limit){

        title.split(' ').reduce((acc , cur)=>{
            if (acc + cur.length <= limit) {
                newArr.push(cur) ;
            }
            return acc + cur.length ;
        },0) ;

        return `${newArr.join(' ')} ...` ;
    
    } else {
        return title ;
    }
}

/* rendering recipes 
* @page : default is one , at first search , the first page is always displayed
* @recipes : recipes stored in state
*/
export const renderRecipes = (recipes , page = 1 , resPerPage = 10) => {

    let start = (page - 1) * resPerPage ;
    let end = page * resPerPage ;

    recipes.slice(start , end).forEach(renderRecipe) ;

    // render the buttons 

    renderButtons(page , resPerPage , recipes) ;

}

//  render the markup of each recipe 
const renderRecipe = (recipe) => {
    let markup = 
    `
    <li>
        <a class="results__link results__link--active" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${formatTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    ` ;
    elements.resultsList.insertAdjacentHTML('beforeend' , markup) ;
}

// button component
const createButton = (type , page ) => {

    let markup = 
    `<button class="btn-inline results__btn--${type}" data-goto="${type === 'prev'? page - 1 : page +1}">
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev'? 'left' : 'right'}"></use>
        </svg>
        <span> page ${type === 'prev'? page - 1 : page +1}</span>
    </button>`

    return markup ;
}

// setting pagination
/*
* @page : current page 
* @results : recipes stored in state
*/
const renderButtons = (page , resPerPage , results) => {

    // calculate the number of pages for each search result 
    let pages = Math.ceil(results.length / resPerPage) ;
    let button ;
    
    /* in first page : we render one button => if(page == 1)
    * in the middle : we render two buttons => if( page < pages  )
    * in last page : we render one button => (page == pages) if (page == pages)
    */

    if (page === 1 && pages > 1) {
        // render next button 
        button = `${createButton('next' , page)}` ;
    } else if (page < pages) {
        // render nexp and previous buttons
        button = `
        ${createButton('prev' , page)}
        ${createButton('next' , page)}
        ` ;
    } else if (page === pages && pages > 1){
        // render last button 
        button =`${createButton('prev' , page)}` ;
    }

    elements.resultsPages.insertAdjacentHTML('afterbegin', button) ;
}