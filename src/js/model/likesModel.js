export default class Like {
    constructor(){
        this.likes = [] ;
    }

    // add item to the list 
    addItem = (id , title , author ,img) => {
        const item = {id , title , author ,img}
        this.likes.push(item) ; 
        return item;
    }

    // remove item from the list 
    removeItem = (id) => {
        const index = this.likes.findIndex(el => el.id === id) ;
        this.likes.splice(index , 1) ;
    }

    // test if item is liked or not 
    isLiked = (id) => {
        return this.likes.findIndex(el => el.id === id) != -1 ;
    }

    // get number of likes 
    getNumLikes = () => {
        return this.likes.length;
    }
}