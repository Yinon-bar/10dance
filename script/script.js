import { API_URL } from "./apiService.js";

const doApi = () => {
  let url = API_URL + "students_list.php";
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      // console.log(data);
      createAllStudents(data);
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

const createAllStudents = (_ar) => {
  let isHere = false;
  let userName;
  for (const item of _ar) {
    console.log(item);
    if (item.t_z_id == inputText.value) {
      // console.log("success");
      isHere = true;
      userName = console.log(isHere);
      const printUser = function (arr) {
        console.log(arr.id);
        window.location = "../admin/print_page.html?id=" + arr.id;

        // זה הקוד הנכון בשרת האמיתי
        // window.location = "https://www.yinon-bar.online/Ofer/add_students/Admin/print_page.html?id=" + arr.id;
      };
      printUser(item);
      break;
      // submitOk();
    } else {
      console.log(isHere);
    }
  }
  if (isHere == true) {
    // const print = (_ar) => {
    //   console.log(_ar);

    // };
    submitOk(_ar);
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
  console.log(str);
  str = str.substr(0, str.length - 1);
  console.log(str);
  inputText.value = str;
});

submit.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputText.value.length < 8) {
    alert("ת.ז קצרה מידי");
  } else if (inputText.value.length > 9) {
    alert("ת.ז ארוכה מידי");
  } else {
    let newId = inputText.value;
    if (newId.indexOf("0") == 0) {
      newId = newId.substr(1);
      console.log(newId);
      inputText.value = newId;
      // doApi();
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
  // inputText.innerHTML = "";
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
