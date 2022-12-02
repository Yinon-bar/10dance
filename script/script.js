import { getAttendeeFromDB, printAttendee } from "./utils/print.js";
import { setAttendeeArrived } from "./utils/students.js";

const clientURL = "../index.html";

let inputText = document.querySelector("#input-text");
const btnAll = document.querySelectorAll(".btn");
const deleteAll = document.querySelector("#delete-all");
const deleteOne = document.querySelector("#delete");
const submit = document.querySelector("#submit");
const displayElement = document.createElement("h1");
displayElement.classList.add("has-arrived");

// MAIN BUTTONS EVENT-LISTENERS //
for (let i = 0; i < btnAll.length; i++) {
  btnAll[i].addEventListener("click", (e) => {
    if (inputText.value.length < 8) inputText.value += btnAll[i].innerHTML;
  });
}

deleteAll.addEventListener("click", (e) => {
  inputText.value = "";
});
deleteOne.addEventListener("click", (e) => {
  let str = inputText.value;
  str = str.substr(0, str.length - 1);
  inputText.value = str;
});

// SUBMIT EVENT-LISTENER //
submit.addEventListener("click", (e) => {
  e.preventDefault();

  const inputLength = inputText.value.length;
  if (!inputLength) {
    alert("נא הקש ת.ז.");
  } else if (inputLength > 8) {
    alert("ת.ז ארוכה מידי");
  } else {
    let newIdBase = inputText.value;
    if (inputLength < 8) {
      const delta = 8 - inputLength;
      let prefix = "";
      for (let i = 0; i < delta; i++) {
        prefix += "0";
      }
      const newId = `${prefix}${newIdBase}`;
      inputText.value = newId;
    }
    submitToAPI(inputText.value);
  }
});

const submitToAPI = async (t_z_id) => {
  displayMessage("אנא המתן...")
  const attendee = await getAttendeeFromDB(t_z_id);
  if (attendee) {
    await setAttendeeArrived(t_z_id);
    displayMessage("נרשמת בהצלחה")
    setTimeout(() => {
      printAttendee(t_z_id, clientURL);
    }, 700);
  } else {
    displayMessage("אינך רשום במערכת, אנא גש לעמדת הרישום")
    setTimeout((e) => {
      displayElement.remove();
      inputText.value = "";
    }, 2000);
  }
};

function displayMessage (message) {
  displayElement.innerHTML = `<h1>${message}</h1>`;
  document.body.append(displayElement);
}