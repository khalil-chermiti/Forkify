export default class Like {
    constructor(){
        this.likes = [] ;
    }

    // add item to the list 
    addItem = (id , title , author ,img) => {
        const item = {id , title , author ,img}

        // add item to the state 
        this.likes.push(item) ; 

        // add item to the localStorage 
        this.persistLikes();
        
        return item;
    }

    // remove item from the list 
    removeItem = (id) => {
        const index = this.likes.findIndex(el => el.id === id) ;

        // remove item from the state 
        this.likes.splice(index , 1) ;

        // remove item from the local storage 
        localStorage.setItem('likes' , this.likes) ;
    }

    // test if item is liked or not 
    isLiked = (id) => {
        return this.likes.findIndex(el => el.id === id) != -1 ;
    }

    // get number of likes 
    getNumLikes = () => {
        return this.likes.length;
    }

    // persist data to the localStorage 
    persistLikes = () => localStorage.setItem('likes' , JSON.stringify(this.likes)) ;

    // read data from localStorage and restore it to the state 
    readStorage = () => {

        // if there are likes ...(cond prevent JSON.stringify from throwing an error)
        if (localStorage.getItem('likes')) {
            let storage = JSON.parse(localStorage.getItem("likes"));
            // restoring ... 
            if (storage) this.likes = storage ;
        }
    }
}