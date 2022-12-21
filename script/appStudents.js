import { API_URL } from "/script/apiService.js";

const init = () => {
  doApi();
};

const doApi = () => {
  let url = API_URL + "students_has_arrive.php";
  console.log(url);
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => createAllStudents(data));
};

const createAllStudents = (_ar) => {
  _ar.forEach((item) => {
    renderStudent(item);
  });
};

const renderStudent = (item) => {
  let trElem = document.createElement("tr");
  document.querySelector("#id_tbody").append(trElem);

  trElem.innerHTML += `
    <th>${item.id}</th>
    <th>${item.t_z_id}</th>
    <th>${item.first} ${item.last}</th>
    <th>${item.institute}</th>
    <th><button class="btn btn-success" id="btnTableDelete">מחק</button>
    <button class="btn btn-success" id="btnTableEdit">עריכה</button> 
    </th> 
  `;
};

init();
