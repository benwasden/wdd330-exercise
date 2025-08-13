import { navBar, getLocalStorage, setLocalStorage } from "./data.js";

navBar();

// Getting bars/selecting elements
const cal = document.querySelector("#calorie-count");
const min = document.querySelector("#minutes");

const calBar = document.querySelector(".ex-calories");
const minBar = document.querySelector(".ex-minutes");

const encouragement = document.querySelector("#ex-bars");

// Adding bar animation change
cal.addEventListener("change", () => {
    calorieBar();
})

min.addEventListener("change", () => {
    minuteBar();
})

// localStorage for bars
let date = getLocalStorage("day")
const today = new Date().toISOString().split("T")[0];
if (date == null) {
    setLocalStorage("day", today);
}
else if (today == date) {
    cal.value = getLocalStorage("calorie");
    if (cal.value == null) {
        cal.value = null;
    }
    else {
        calorieBar();
    }
    min.value = getLocalStorage("minute");
    if (min.value == null) {
        min.value = null;
    }
    else {
        minuteBar();
    }
}
else {
    setLocalStorage("day", today);
    setLocalStorage("calorie", 0);
    setLocalStorage("minute", 0);
}


// ***********
// Constructing bars
// ***********

function calorieBar() {
    if (calBar.classList.contains("addedClass")) {
        calBar.classList.remove("addedClass");
    }
    let calories = cal.value;
    // console.log(calories);
    document.querySelector("#cal-count-bar").innerHTML = `${calories}/200 cal`;
    if (calories < 200) {
        calBar.style.setProperty("--target-height", `${calories}px`);
        calBar.classList.add("addedClass");
        encouragement.textContent = "Keep it up! You're doing great!";
    }
    else {
        calBar.style.setProperty("--target-height", "200px");
        calBar.classList.add("addedClass");
        if (calories >= 200 && calories <= 250) {
            encouragement.textContent = "Nice job on reaching your goal!";
        }
        else if (calories >= 251) {
            encouragement.textContent = "Wow, nice stretch goal!";
        }
    }
    setLocalStorage("calorie", calories);
}

function minuteBar() {
    if (minBar.classList.contains("addedClass")) {
        minBar.classList.remove("addedClass");
    }
    let minutes = min.value;
    // console.log(minutes);
    document.querySelector("#minutes-bar").innerHTML = `${minutes}/30 min`;
    if (minutes < 30) {
        minBar.style.setProperty("--target-height", `${minutes * 6.66}px`);
        minBar.classList.add("addedClass");
    }
    else {
        minBar.style.setProperty("--target-height", "200px");
        minBar.classList.add("addedClass");
    }
    setLocalStorage("minute", minutes);
}