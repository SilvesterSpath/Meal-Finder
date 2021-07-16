const searchEl = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const singleMealEl = document.getElementById('single-meal');

// Search meal and fetch from api
function searchMeal(e) {
  e.preventDefault();

  // Clear single meal
  singleMealEl.innerHTML = '';

  // Get search term
  const term = searchEl.value;
  console.log(term);
  // Check for empty
  if (term.trim()) {
    fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no search results for '${term}'</p>`;
        } else {
          resultHeading.innerHTML = `<h3>Search results for '${term}' :</h3>`;
          mealsEl.innerHTML = data.meals
            .map(
              (i) =>
                `<div class="meal">
            <img src="${i.strMealThumb}" alt="${i.strMeal}"/>
            <div class="meal-info" data-mealID="${i.idMeal}">
              <h3>${i.strMeal}</h3>
            </div>
          </div>`
            )
            .join('');
        }
      });
    // Clear search text
    search.value = '';
  } else {
    alert('Please enter a serch term');
  }
}

// Fetch meal by ID
async function getMealById(id) {
  const meal = await fetch(
    `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  )
    .then((res) => res.json())
    .then((data) => {
      return data.meals[0];
    });
  console.log(meal);
  addMealToDOM(meal);
}

// Add meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  singleMealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map((i) => `<li>${i}</li>`).join('')}
        </ul>
      </div>
      
    </div>
  `;
}

// Event listeners
submit.addEventListener('submit', searchMeal);

mealsEl.addEventListener('click', (e) => {
  const mealInfo = e.path.find((i) => {
    if (i.classList) {
      return i.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    getMealById(mealID);
  }
});
