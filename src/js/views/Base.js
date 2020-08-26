// NOTE - SELECTING ELEMENTS FROM PAGE
export const Elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe')
}

// NOTE - MAKING LOADER DYNAMIC  
export const elementsStrings = {
    loader: 'loader'
};


// NOTE - RENDERING LOADER
export const renderLoader = parent => {
    const loader = `
    <div class='${elementsStrings.loader}'>
        <svg>
            <use href='img/icons.svg#icon-cw'
        <svg>
    </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
}

// NOTE - REMOVING LOADER
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementsStrings.loader}`)
    if (loader) loader.parentElement.removeChild(loader);
}