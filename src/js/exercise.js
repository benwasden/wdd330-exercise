import { getExercises, navBar } from "./data.js";
import data from "../data/muscleOptions.json" with { type: "json" };

navBar();

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
const dialog = document.querySelector("#meal-dialog");
let workoutDetails = document.createElement("detail");
dialog.appendChild(workoutDetails);

// ***************
// Two select options
// (Almost certainly a cleaner way to do this but not sure how w/ maintaining functionality)
// Made it so that regardless of what user picks (even removing difficulty later), the app
// is still responsive to their input.
// ***************
muscleSelector.addEventListener("change", async function () {
    workoutList.innerHTML = "";
    if (difficulty.value == "" && this.value != "") {
        let requestedInfo = `muscle=${this.value}`
        let workouts = await getExercises(requestedInfo);

        // console.log("just muscle");
        displayExercises(workouts);
    }
    else if (difficulty.value != "" && muscleSelector.value == "") {
        let requestedInfo = `difficulty=${difficulty.value}`
        let workouts = await getExercises(requestedInfo);

        // console.log("just difficulty");
        displayExercises(workouts);
    }
    else if (muscleSelector.value == "" && difficulty.value == "") {
        workoutList.innerHTML = "";
    }
    else {
        let requestedInfo = `muscle=${this.value}&difficulty=${difficulty.value}`;
        let workouts = await getExercises(requestedInfo);

        // console.log("both");
        displayExercises(workouts);
    }
})

difficulty.addEventListener("change", async function () {
    workoutList.innerHTML = "";
    if (muscleSelector.value == "" && this.value != "") {
        let requestedInfo = `difficulty=${this.value}`
        let workouts = await getExercises(requestedInfo);

        // console.log("just difficulty");
        displayExercises(workouts);
    }
    else if (muscleSelector.value != "" && difficulty.value == "") {
        let requestedInfo = `muscle=${muscleSelector.value}`
        let workouts = await getExercises(requestedInfo);

        // console.log("just muscle");
        displayExercises(workouts);
    }
    else if (muscleSelector.value == "" && difficulty.value == "") {
        workoutList.innerHTML = "";
    }
    else {
        let requestedInfo = `muscle=${muscleSelector.value}&difficulty=${this.value}`;
        let workouts = await getExercises(requestedInfo);

        // console.log("both");
        displayExercises(workouts);
    }
})

// ***************
// ***************

// Format for displaying exercises
const displayExercises = (workouts) => {
    workoutList.innerHTML = "";
    if (workouts.length != 0) {
        workouts.forEach((workout) => {
            let item = document.createElement("section");
            let exerciseName = document.createElement("h2");
            let challenge = document.createElement("p");

            exerciseName.textContent = workout.name;
            challenge.textContent = workout.difficulty.charAt(0).toUpperCase() + workout.difficulty.slice(1);

            item.appendChild(exerciseName);
            item.appendChild(challenge);
            item.setAttribute("class", "workout-item");

            workoutList.appendChild(item);
            
            // Adding dialog click for each workout
            item.addEventListener("click", () => {
                displayExerciseInfo(workout);
            })
        })
    } else {
        workoutList.innerHTML = `<h2 id="no-workouts">No workouts available for this option.</br>Sorry!</h2>`;
    }
}

// Modal function for exercise page
function displayExerciseInfo(info) {
    workoutDetails.innerHTML = '';

    workoutDetails.innerHTML = `
    <button id="closeModal">X</button>
    <h4>${info.name}</h4>
    <p><strong>Muscle:</strong> ${info.muscle}</p>
    <p><strong>Difficulty:</strong> ${info.difficulty}</p>
    <p><strong>Required Equipment: </strong> ${checkEquipment(info.equipment)}</p>
    <p><strong>Instructions</strong></p>
    <p>${info.instructions}</p>`

    dialog.showModal();

    closeModal.addEventListener("click", () => {
        dialog.close();
    })
}

// Just a sanity check to see if any equipment is required.
// The API returns an ugly format if there isn't any, so this
// is tidying it up.
function checkEquipment(equipment) {
    if (equipment == "body_only") {
        return "None needed!";
    } else {
        return equipment;
    }
}