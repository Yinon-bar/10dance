import { API_URL } from "/script/apiService.js";

window.onload = async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    // ?id= אוסף קווארי סטרינג
    let userId = urlParams.get("id");
    let url = API_URL + "singleStudent.php?id=" + userId;
    const res = await fetch(url);
    const data = await res.json();
    renderToHTML(data[0]);
  } catch {}
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
