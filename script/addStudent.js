import { API_URL } from "/script/apiService.js";
import { printAttendee } from "./utils/print.js";
import { inputValidationId } from "./utils/id.js";

const adminDashboardURL = "../admin/index.html";
const id_form = document.querySelector("#id_form");
const inputId = document.querySelector("#id_t_z_id");
const inputFirstName = document.querySelector("#id_first");
const inputLastName = document.querySelector("#id_last");
const institute = document.querySelector("#institute");

id_form.onsubmit = async (e) => {
  e.preventDefault();
  const validId = inputValidationId(inputId.value);
  if (!validId) return;

  // TODO: add validation to first and last name inputs.
  const bodyData = {
    t_z_id: validId,
    first: inputFirstName.value,
    last: inputLastName.value,
    institute: institute.value,
  };
  const t_z_id = bodyData.t_z_id;
  try {
    await addAttendeeToDB(bodyData);
    printAttendee(t_z_id, adminDashboardURL);
  } catch {
    alert("something went wrong");
    console.error("something went wrong while writing to the DB");
  }
};

const addAttendeeToDB = async (_bodyData) => {
  try {
    let url = API_URL + "add_students.php";
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(_bodyData),
      headers: { "content-type": "application/json" },
    });
    alert("Stuednt added");
  } catch {
    throw new Error("Error adding attendee");
  }
};
