import {elements , } from './base'  ;

export const getInput = () => elements.searchField.value ;

export const clearInput = () => elements.searchField.value = '' ; 

export const clearList = () => elements.resultsList.innerHTML = '' ;

export const renderRecipes = (recipes) => recipes.forEach(renderRecipe) ;

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
//  render the markup of each recipe 
const renderRecipe = (recipe) => {
    let markup = 
    `
    <li>
        <a class="results__link results__link--active" href="${recipe.recipe_id}">
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