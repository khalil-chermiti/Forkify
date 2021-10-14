import {elements} from "./base"; 

export const renderItem = (item) => {
    const markup = `
        <li class="shopping__item " data-itemid="${item.id}">
            <div class="shopping__count">
                <input type="number" value="${item.count}" step="${item.count}" min="0" class="shopping__count-value" > 
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ing}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    ` ;

    elements.list.insertAdjacentHTML('beforeend' , markup) ;
} ;

export const removeItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`) ;
    item.parentElement.removeChild(item) ;
} ;
