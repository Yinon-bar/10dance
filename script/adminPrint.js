const fName = document.querySelector("#fName");
const lName = document.querySelector("#lName");
const btn = document.querySelector("#btn");

const doApi = () => {
  const urlParams = new URLSearchParams(window.location.search);
  // ?nameTxt= אוסף קווארי סטרינג
  let nameTxt = urlParams.get("name");
  init(nameTxt);
};

const timer = function () {
  setTimeout((e) => {
    window.location = "../client/index.html";
  }, 1000);
};

let init = function (nameTxt) {
  fName.innerHTML = nameTxt;
  window.print();
  timer();
};

doApi();
