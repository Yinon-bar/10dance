import { API_URL } from "/script/apiService.js";
const urlParams = new URLSearchParams(window.location.search);

window.onload = async () => {
  try {
    // ?id= אוסף קווארי סטרינג
    const userId = urlParams.get("id");
    const url = API_URL + "singleStudent.php?id=" + userId;
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
  const postPrintURL = urlParams.get("post-print-url");
  setTimeout((e) => {
    window.location = postPrintURL;
  }, 200);
};
