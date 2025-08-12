// localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Variables for menu button in mobile view
export function navBar() {
  const hamButton = document.querySelector('#menu');
  const navigation = document.querySelector('#animateme');

  // Event listener for menu button
  hamButton.addEventListener('click', () => {
      navigation.classList.toggle('open');
      hamButton.classList.toggle('open');
  });
}

// *********************
// Meals API
// *********************
export async function getRecipesByCategory(category) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
    );
    if (response.ok) {
      const mealData = await response.json();
      // console.log(mealData);
      const meals = mealData.meals;
      return meals;
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getRecipeInfo(mealID) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    if (response.ok) {
      const data = await response.json();
      const meal = data.meals;
      // console.log(meal);

      return meal;
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    console.error(error);
  }
}


// *********************
// Exercise API
// *********************
export async function getExercises(requestedInfo) {
  const url = `https://api.api-ninjas.com/v1/exercises?${requestedInfo}`;

  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": "H3UCtQUpJaKUN1lBeRdLur2rfcU8G38qCK3MSWXb",
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    console.error(error);
  }
}
