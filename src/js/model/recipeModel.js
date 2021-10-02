// the recipe api query 
// https://forkify-api.herokuapp.com/api/get?rId=

import axios from 'axios' ;

export default class Recipe {
    constructor(recipeId){
        this.recipeId = recipeId ;
    }  
    // fetch recipe data 
    getRecipeData = async () => {
        try {
            let results = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.recipeId}`) ;
            // console.log(results.data.recipe); 
            this.recipe = results.data.recipe.source_url;
            this.author = results.data.recipe.publisher ;
            this.title = results.data.recipe.title ;
            this.img = results.data.recipe.image_url ;
            this.ing = results.data.recipe.ingredients ;
            // this.calcTime();
        } catch {
            console.log('there was an error while loading the recipe');
        }
    } 

    // estimating the needed time for each recipe
    calcTime = () => this.avgTime = (this.ing.length * 3) ;

    // calculate the servings
    calcServings = () => {
        this.servings = 4 ;
    }

    // parsing the ingredients 
    parseIng = () => {
        // units data sets 
        const oldUnits = ['teaspoons' , 'teaspoon' , 'onces' , 'once' , 'tablespoons' , 'tablespoon' , 'cups' , 'pounds'];
        const newUnits = ['tpn' , 'tpn' , 'oz' , 'oz' , 'tbsp' , 'tbsp' , 'cup' , 'pound'] ;
        const units = [...newUnits , 'kg' ,'g']

        let newIng = this.ing.map(el => {
            
            // lowercase all ingredients
            let ing = el.toLowerCase();

            // replace old units with new ones
            oldUnits.forEach((unit , ind) => ing = ing.replace(unit , newUnits[ind]) ) ;

            // remove parenthesis 
            ing = ing.replace(/\s*\(.*?\)\s*/g, '');

            // parse ingredients into count , unit and ingredients
            const arrIng = ing.split(' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            let objIng;

            if (unitIndex > -1) {
                // There is a unit
                // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
                // Ex. 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex);
                
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };

            } else if (parseInt(arrIng[0], 10)) {
                // There is NO unit, but 1st element is number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                // There is NO unit and NO number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient : ing
                }
            }

            return objIng ; 
        })
        
        this.ing = newIng ;
    }

    // update the Servings 
    updateServings = (type) => {
        // servings 
        let newServings = type === 'dec' ? this.servings -1 : this.servings +1 ;

        // ingredients 

        this.ing.forEach(ing => ing.count *= (newServings / this.servings)) ;

        this.servings = newServings ;
    }
}