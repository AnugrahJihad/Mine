const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const mealList = document.getElementById('mealList');
const modalContainer = document.getElementById('modal-container');
const mealDetailsContent = document.getElementById('meal-details-content');
const recipeCloseBtn = document.getElementById('recipeCloseBtn');

searchButton.addEventListener('click', async() => {
    const ingredient = searchInput.value.trim();
    if(ingredient){
        const meal = await searchMealByIngredient(ingredient);
        displayMeals(meals);
    }
});

mealList.addEventListener('click', async (e) =>{
    const card = e.target.closest('meal-item');
    if(card){
        const mealId = card.dataset.id;
        const meal = await getMealDetails(mealId);
        if(meal){
            showMealDetailsPopup(meal);
        }
    }
});

async function searchMealByIngredient(ingredient){
    try{
        const response =  await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const data = await response.json();
        return data.meals;
    }catch (error){
        console.error('Error fetching data:', error);
    }
}

async function getMealDetails(mealId){
    try{
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        const data = await response.json();
        return data.meals[0];
    }catch(error){
        console.error('Error fatching meal details:',error);
    }
}

function displayMeals(meals){
    mealList.innerHTML = '';
    if(meals){
        meals.foreach((meal) =>{
        ('div');
        mealItem.classlist.add('meal-item');
        mealItem.dataset.id = meal.idMeal;
        mealItem.innerHTML =`
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        `;
        mealList.appendChild(mealItem);
        });
    }else{
        mealList.innerHTML = '<p>Tidak Ada Film Ditemukan. Coba Kata Kunci Lain.</p>';
    }
}

