import { getExercises } from "./data";
import data from "../data/muscleOptions.json" assert { type: "json" };


// Fill in select info
const muscleSelector = document.querySelector("#muscles");
const muscles = data.muscles;

muscles.forEach((muscle) => {
    let item = document.createElement("option");
    item.textContent = muscle.name;
    item.setAttribute("value", muscle.value);

    muscleSelector.appendChild(item);
})
