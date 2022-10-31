import { getAttendeeFromDB, printAttendee } from "./utils/print.js";
import { setAttendeeArrived } from "./utils/students.js";

const clientURL = "../client/clientIndex.html";

let inputText = document.querySelector("#input-text");
const btnAll = document.querySelectorAll(".btn");
const deleteAll = document.querySelector("#delete-all");
const deleteOne = document.querySelector("#delete");
const submit = document.querySelector("#submit");

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
  const attendee = await getAttendeeFromDB(t_z_id);
  if (attendee) {
    await setAttendeeArrived(t_z_id);
    displayOk();
    setTimeout(() => {
      printAttendee(t_z_id, clientURL);
    }, 2500);
  } else {
    displayDeny();
  }
};

async function displayOk() {
  const userArrived = document.createElement("div");
  const userConfirm = document.createElement("h1");
  userArrived.classList.add("has-arrived");
  document.body.append(userArrived);
  userConfirm.innerHTML = `<h1>נרשמת בהצלחה</h1>`;
  userArrived.innerHTML += userConfirm.innerHTML;
}

function displayDeny() {
  const userArrived = document.createElement("div");
  const userConfirm = document.createElement("h1");
  userArrived.classList.add("has-arrived");
  document.body.append(userArrived);
  userConfirm.innerHTML = `<h1>אינך רשום במערכת, אנא גש לעמדת הרישום</h1>`;
  userArrived.innerHTML += userConfirm.innerHTML;
  setTimeout((e) => {
    const displayElement = document.querySelector(".has-arrived");
    displayElement.remove();
    inputText.value = "";
  }, 3000);
}
