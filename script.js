const searchEl = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const singleMealEl = document.getElementById('single-meal');



// Search meal and fetch from api
function searchMeal(e){
  e.preventDefault();

  // Clear single meal
  singleMealEl.innerHTML = '';

  // Get search term
  const term = searchEl.value;
  console.log(term);
  // Check for empty
  if(term.trim()){
    fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${term}`).then(res => res.json()).then(data =>{
      console.log(data);
      
      if (data.meals === null){
        resultHeading.innerHTML = `<p>There are no search results for '${term}'</p>`
      } else{
        resultHeading.innerHTML = `<h3>Search results for '${term}' :</h3>`;
        mealsEl.innerHTML = data.meals.map(i=>
          
          `<div class="meal">
            <img src="${i.strMealThumb}" alt="${i.strMeal}"/>
            <div class="meal-info" data-mealID="${i.idMeal}">
              <h3>${i.strMeal}</h3>
            </div>
          </div>`          
          
        ).join('');
      }
    })
    // Clear search text
    search.value = ''
  } else{
    alert('Please enter a serch term');
  }
}

// Event listeners
submit.addEventListener('submit', searchMeal)

