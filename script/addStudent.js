import { API_URL } from "/script/apiService.js";

const declareEvents = () => {
  let id_form = document.querySelector("#id_form");
  id_form.addEventListener("submit", (e) => {
    e.preventDefault();
    // TODO: לבדוק שגיאות באינפוטים של המשתמש
    let bodyData = {
      t_z_id: document.querySelector("#id_t_z_id").value,
      first: document.querySelector("#id_first").value,
      last: document.querySelector("#id_last").value,
      // if_dikan: document.querySelector("#id_if_dikan").value,
    };
    addApiReq(bodyData);
    doApi();
    window.location =
      "../admin/print_page.html?name=" + bodyData.first + " " + bodyData.last;
  });
};

const doApi = () => {
  let url = API_URL + "/students_list.php";
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      printStudent(data);
    });
};

const printStudent = (_ar) => {
  let isHere = false;
  for (const item of _ar) {
    console.log(item);
    isHere = true;
    userName = console.log(isHere);
    const printUser = function (arr) {
      window.location = "../../Admin/print_page.html?id=" + arr.id;
    };
    printUser(item);
  }
};

const addApiReq = (_bodyData) => {
  let url = API_URL + "/add_students.php";
  fetch(url, {
    method: "POST",
    body: JSON.stringify(_bodyData),
    headers: { "content-type": "application/json" },
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.status === "ok") {
        alert("Stuednt added");
      } else {
        console.log(data);
      }
    });
};

declareEvents();
