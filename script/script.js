import { API_URL } from "./apiService.js";

const doApi = () => {
  let url = API_URL + "students_list.php";
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      printAttendeeFromList(data);
    });
};

// |||||||||||||||||||||||||||||||||||||||||||||||||||||
const doApi2 = () => {
  let bodyData = inputText.value;
  let url = API_URL + "/has_arrived.php";
  fetch(url, {
    method: "PUT",
    body: JSON.stringify(bodyData),
    headers: { "content-type": "application/json" },
  });
};

const printUser = function (arg) {
  window.location = "../admin/print_page.html?id=" + arg.t_z_id;
};

const printAttendeeFromList = (list) => {
  const attendee = list.find((attendee) => attendee.t_z_id === inputText.value);
  if (attendee) {
    printUser(attendee);
    submitOk(list);
  } else {
    submitDeny();
  }
};

// |||||||||||||||||||||||||||||||||||||||||||||||||||

const btnAll = document.querySelectorAll(".btn");
let inputText = document.querySelector("#input-text");
const deleteAll = document.querySelector("#delete-all");
const deleteOne = document.querySelector("#delete");
const submit = document.querySelector("#submit");

for (let i = 0; i < btnAll.length; i++) {
  btnAll[i].addEventListener("click", (e) => {
    inputText.value += btnAll[i].innerHTML;
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
    doApi();
  }
});

function submitOk(_ar) {
  const userArrived = document.createElement("div");
  const userConfirm = document.createElement("h1");
  userArrived.classList.add("has-arrived");
  document.body.append(userArrived);
  userConfirm.innerHTML = `<h1>נרשמת בהצלחה</h1>`;
  userArrived.innerHTML += userConfirm.innerHTML;
  doApi2();
  setTimeout((e) => {
    window.location.reload(true);
  }, 3000);
}

function submitDeny() {
  const userArrived = document.createElement("div");
  const userConfirm = document.createElement("h1");
  userArrived.classList.add("has-arrived");
  document.body.append(userArrived);
  userConfirm.innerHTML = `<h1>אינך רשום במערכת, אנא גש לעמדת הרישום</h1>`;
  userArrived.innerHTML += userConfirm.innerHTML;
  setTimeout((e) => {
    window.location.reload(true);
  }, 3000);
}
