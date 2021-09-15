import axios from "axios";  

// building the search class 
export default class Search {
    constructor(query){
        this.query = query 
    }
    // getting results from api 
    getResults = async () => {
        try {
            let data = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`) ;
            this.results = data.data.recipes ;
        }catch(err) {
            console.log('there was an error fetching data from api');
        }
    }
}