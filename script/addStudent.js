import { API_URL } from "/script/apiService.js";
import { getAttendeeFromDB, printAttendee } from "./utils/print.js";

const adminDashboardURL = "../admin/index.html";

const declareEvents = () => {
  let id_form = document.querySelector("#id_form");
  id_form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // TODO: לבדוק שגיאות באינפוטים של המשתמש
    let bodyData = {
      t_z_id: document.querySelector("#id_t_z_id").value,
      first: document.querySelector("#id_first").value,
      last: document.querySelector("#id_last").value,
      // if_dikan: document.querySelector("#id_if_dikan").value,
    };
    const t_z_id = bodyData.t_z_id;
    try {
      await addAttendeeToDB(bodyData);
      printAttendee(t_z_id, adminDashboardURL);
    } catch {
      alert("something went wrong");
    }
  });
};

const addAttendeeToDB = async (_bodyData) => {
  try {
    let url = API_URL + "/add_students.php";
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

declareEvents();
