// NOTE - IMPORTING AXIOS
import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id
    };

    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (e) {
            console.log('error while getting recipe data');
            alert('something went wrong');
        }
    };

    calcTime() {

        // assuming that we need 15 minutes for each 3 ingredients  
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods;

    };

    calcServings() {
        this.servings = 4;
    };
    // NOTE - this is all about parsing the ingredients 
    parseIng() {

        // NOTE - preparing the strings to replace them 
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds']
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound']
        const units = [...unitsShort, 'kg', 'g']

        const newIng = this.ingredients.map(el => {

            // NOTE  uniforming units 
            let ingredient = el.toLowerCase();

            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            })
            // NOTE - remove parentheses 
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // NOTE - parse ingredients into count , unit and ingredients 

            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            let objInt;
            if (unitIndex > -1) {
                // there a unit
                // EX_1 : 4 1/2 cups , arrCount is [4 , 1/2]  
                // EX_2 : 4 cups , arrCount is [4]  
                const arrCount = arrIng.slice(0, unitIndex);
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objInt = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };

            } else if (parseInt(arrIng[0], 10)) {
                // there is no unit but the 1st element is a number 
                objInt = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }

            } else if (unitIndex === -1) {
                // there is no unit and no number 
                objInt = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }
            return objInt;
        });

        this.ingredients = newIng;
        return this.ingredients;
    };

    updateServings(type) {
        // update servings
         
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;
        //update ingredients 

        this.ingredients.forEach(ing => {
            ing.count *= (newServings / this.servings);
        });

        this.servings = newServings;
    }
}