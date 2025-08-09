async function getRecipesByCategory(category) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
  );
  const mealData = await response.json();
  console.log(mealData);
  const meals = mealData.meals;
  // console.log(meals);
  // displayMeals(meals);
  return meals;
}

const category = document.querySelector("#category");

const mealList = document.querySelector("#meal-container");
category.addEventListener("change", async function () {
  mealList.innerHTML = "";
  const selectedValue = this.value;
  const mealInfo = await getRecipesByCategory(selectedValue);
  console.log(mealInfo);

  displayMeals(mealInfo);
});

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

    mealList.appendChild(item);
  });
};
