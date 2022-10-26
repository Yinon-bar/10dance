import { API_URL } from "/script/apiService.js";

const doApi = () => {
  const urlParams = new URLSearchParams(window.location.search);
  // ?id= אוסף קווארי סטרינג
  let userId = urlParams.get("id");
  let url = API_URL + "singleStudent.php?id=" + userId;
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      renderToHTML(data[0]);
    });
};

const renderToHTML = (_studentItem) => {
  document.querySelector("#fName").innerHTML =
    _studentItem.first + " " + _studentItem.last;
  window.print();
  timer();
};

const timer = function () {
  setTimeout((e) => {
    window.location = "../client/clientIndex.html";
  }, 200);
};

doApi();
