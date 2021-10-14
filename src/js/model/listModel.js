import uniqid from 'uniqid' ;

export default class List {
    constructor (){
        this.items =  [] ;
    }


    // add item to the shopping list 
    addItem(count , unit , ing ) {

        const item = {
            id : uniqid() ,
            count , 
            unit , 
            ing
        }

        this.items.push(item) ;
        return item ;  

    }

    // remove item from the shopping list 
    deleteItem (id){
        const index = this.items.findIndex(el => el.id === id) ;
        this.items.splice(index , 1) ;
    }

    // update the count of the ingredients 
    updateCount(id , newCount) {
        this.items.find(el => el.id === id ).count = newCount ; 
    }
}