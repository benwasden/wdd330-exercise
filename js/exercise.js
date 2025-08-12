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

// Filling in workouts
const difficulty = document.querySelector("#difficulty");
const workoutList = document.querySelector(".workout-container");

// ***************
// Two select options
// (Almost certainly a cleaner way to do this but not sure how w/ maintaining functionality)
// Made it so that regardless of what user picks (even removing difficulty later), the app
// is still responsive to their input.
// ***************
muscleSelector.addEventListener("change", async function () {
    workoutList.innerHTML = "";
    if (difficulty.value == "") {
        let requestedInfo = `muscle=${this.value}`
        let workouts = await getExercises(requestedInfo);

        console.log("just muscle");
        displayExercises(workouts);
    }
    else if (difficulty.value != "" && muscleSelector.value == "") {
        let requestedInfo = `difficulty=${difficulty.value}`
        let workouts = await getExercises(requestedInfo);

        console.log("just difficulty");
        displayExercises(workouts);
    }
    else {
        let requestedInfo = `muscle=${this.value}&difficulty=${difficulty.value}`;
        let workouts = await getExercises(requestedInfo);

        console.log("both");
        displayExercises(workouts);
    }
})

difficulty.addEventListener("change", async function () {
    workoutList.innerHTML = "";
    if (muscleSelector.value == "") {
        let requestedInfo = `difficulty=${this.value}`
        let workouts = await getExercises(requestedInfo);

        console.log("just difficulty");
        displayExercises(workouts);
    }
    else if (muscleSelector.value != "" && difficulty.value == "") {
        let requestedInfo = `muscle=${muscleSelector.value}`
        let workouts = await getExercises(requestedInfo);

        console.log("just muscle");
        displayExercises(workouts);
    }
    else {
        let requestedInfo = `muscle=${muscleSelector.value}&difficulty=${this.value}`;
        let workouts = await getExercises(requestedInfo);

        console.log("both");
        displayExercises(workouts);
    }
})

// ***************
// Format for displaying exercises
// ***************

const displayExercises = (workouts) => {
    if (workouts.length != 0) {
        workouts.forEach((workout) => {
            let item = document.createElement("section");
            let exerciseName = document.createElement("h2");
            let challenge = document.createElement("p");

            exerciseName.textContent = workout.name;
            challenge.textContent = workout.difficulty.charAt(0).toUpperCase() + workout.difficulty.slice(1);

            item.appendChild(exerciseName);
            item.appendChild(challenge);

            workoutList.appendChild(item);
        })
    } else {
        workoutList.innerHTML = `<h2>No workouts available for this option.</h2>`;
    }
}
