import axios from "axios";  

export default class Search {
    constructor(query){
        this.query = query 
    }

    getResults = async () => {
        let data = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`) ;
        this.results = data.data.recipes ;
    }
}