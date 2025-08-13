import { getRecipesByCategory, getRecipeInfo, navBar } from "./data";

navBar();

// Element selection for meal viewer
const category = document.querySelector("#category");
const mealList = document.querySelector(".meal-container");

// Event listener on select dropdown to display the meals for the requested category
category.addEventListener("change", async function () {
  mealList.innerHTML = "";
  const selectedValue = this.value;
  const mealInfo = await getRecipesByCategory(selectedValue);
  // console.log(mealInfo);

  displayMeals(mealInfo);
});

// const mealItem = document.querySelector(".meal-item");
const dialog = document.querySelector("#meal-dialog");
let mealDetails = document.createElement("detail");
dialog.appendChild(mealDetails);

// Format to display meals, creating a card for each item
const displayMeals = (meals) => {
  meals.forEach((meal) => {
    let item = document.createElement("section");
    let mealName = document.createElement("h2");
    let mealImg = document.createElement("img");

    mealName.textContent = `${meal.strMeal}`;
    mealImg.setAttribute("src", meal.strMealThumb);
    mealImg.setAttribute("alt", `Image of ${meal.strMeal}`);
    mealImg.setAttribute("loading", "lazy");

    item.appendChild(mealName);
    item.appendChild(mealImg);
    item.setAttribute("class", "meal-item");

    mealList.appendChild(item);
  
    // Adding dialog click for each recipe
    item.addEventListener("click", async function () {
        let selectedMeal = meal.idMeal;
        let recipe = await getRecipeInfo(selectedMeal);
        console.log(recipe);
        displayRecipe(recipe);
    })

  });
};

function displayRecipe(info) {
  mealDetails.innerHTML = '';

  mealDetails.innerHTML = `
  <button id="closeModal">X</button>
  <h4>${info[0].strMeal}</h4>
  <p><strong>Area:</strong> ${info[0].strArea}</p>
  <p><strong>Category:</strong> ${info[0].strCategory}</p>
  <div class="ingredients"></div>
  <p><strong>Instructions</strong></p> ${info[0].strInstructions}`

  getIngredients(info[0]);
  dialog.showModal();

  closeModal.addEventListener("click", () => {
      dialog.close();
  });
}

function getIngredients(meal) {
  const divIng = document.querySelector(".ingredients");
  let ingredients = document.createElement("ul");
  
  for (let i = 1; i <= 20; i++) {
    if ((meal[`strIngredient${i}`]) != "") {
      let ingredient = document.createElement("li");
      ingredient.textContent = `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`;
      console.log(ingredient);
      ingredients.appendChild(ingredient);
      
    } else {
      break;
    }
  }
  divIng.appendChild(ingredients);
}