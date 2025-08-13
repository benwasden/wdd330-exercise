import { navBar, getLocalStorage, setLocalStorage } from "./data";

navBar();

const cal = document.querySelector("#calorie-count");
const min = document.querySelector("#minutes");

const calBar = document.querySelector(".ex-calories");
const minBar = document.querySelector(".ex-minutes");

const encouragement = document.querySelector("#ex-bars");
encouragement.textContent = "Please enter exercise details.";


// Adding bar animation change
cal.addEventListener("change", () => {
    if (calBar.classList.contains("addedClass")) {
        calBar.classList.remove("addedClass");
    }
    let calories = cal.value;
    // console.log(calories);
    document.querySelector("#cal-count-bar").innerHTML = `${calories}/200`
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
})

min.addEventListener("change", () => {
    let minutes = min.value;
    console.log(minutes);
})