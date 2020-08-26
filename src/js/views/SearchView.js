import {
    Elements
} from './Base'

// NOTE - GETTING QUERY VALUE
export const getInput = () => Elements.searchInput.value;

// NOTE - CLEARING THE INPUT
export const clearInput = () => Elements.searchInput.value = '';

// NOTE - CLEARING THE RESULT LIST
export const clearRes = () => {
    Elements.searchResList.innerHTML = '';
    Elements.searchResPages.innerHTML = '';
}

// NOTE - HILIGHT SELECTED RECIPE 
export const highlightSelected = id => {
    const resultArr = Array.from(document.querySelectorAll('.results__link')) ;
    resultArr.forEach( el => el.classList.remove('results__link--active')) ;

    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
}

// NOTE - LIMITING TITLE SIZE 
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = []
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0)
        return `${newTitle.join(' ')} ...`;
    } else {
        return title;
    };
}

// NOTE - RENDERING THE RESULTS
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    var start , end ;
    start = (page - 1) * resPerPage;
    end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    // NOTE - rendering paginations 
    renderButtons(page, recipes.length, resPerPage);
}

// NOTE - RENDERING RECIPES TO THE PAGE 
const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    Elements.searchResList.insertAdjacentHTML('beforeend', markup)
};

// NOTE - rendering buttons 
const renderButtons = (page, numResults, resPerPage) => {

    const pages = Math.ceil(numResults / resPerPage);

    let button;
    if (page === 1 && pages > 1) {
        // one button to next page
        button = createBtn(page, 'next');
    } else if (page < pages) {
        // two buttons
        button = `
        ${createBtn(page, 'prev')}
        ${createBtn(page, 'next')}
        `
    } else if (page === pages && pages > 1) {
        // one button to prev page 
        button = createBtn(page, 'prev');
    }

    Elements.searchResPages.insertAdjacentHTML('afterbegin', button)
}
// NOTE - create buttons j=
const createBtn = (page, type) => `

    <button class="btn-inline results__btn--${type}" data-goto= ${ type === 'prev' ? page - 1 : page + 1  }>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${ type === 'prev' ? 'left' : 'right'  }"></use>
        </svg>
        <span>Page ${ type === 'prev' ? page - 1 : page + 1  }</span>
    </button>

`;