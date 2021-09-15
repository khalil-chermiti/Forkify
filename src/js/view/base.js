export const elements = {
    searchForm : document.querySelector('.search') ,
    searchField : document.querySelector('.search__field') ,
    resultsList : document.querySelector('.results__list') ,
    results : document.querySelector('.results') ,
} ;

export const domElements = {
    loader : ('.loader')
}

export const renderLoader = (parent) => {
    let loader =
    `
    <div class='loader'>
        <svg>
            <use href='img/icons.svg#icon-cw'></use>
        </svg>
    </div>
    `;

    parent.insertAdjacentHTML('afterbegin' , loader);
}

export const clearLoader = () => {

    let loader = document.querySelector(domElements.loader) ;
    
    if (loader) loader.parentElement.removeChild(loader) ; 
    
}