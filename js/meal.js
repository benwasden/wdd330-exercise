import { getRecipesByCategory } from "./data";

// Element selection for meal viewer
const category = document.querySelector("#category");
const mealList = document.querySelector("#meal-container");

// Event listener on select dropdown to display the meals for the requested category
category.addEventListener("change", async function () {
  mealList.innerHTML = "";
  const selectedValue = this.value;
  const mealInfo = await getRecipesByCategory(selectedValue);
  // console.log(mealInfo);

  displayMeals(mealInfo);
});

// Format to display meals, creating a card for each item
const displayMeals = (meals) => {
  meals.forEach((meal) => {
    let item = document.createElement("li");
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
  });
};

// const mealItem = document.querySelector(".meal-item");
// const dialog = document.querySelector("#meal-dialog");

// mealItem.addEventListener("click", async function () {
//   dialog.innerHTML = "";
//   const selectedMeal = this.value[0];
// })