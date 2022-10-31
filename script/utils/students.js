import { API_URL } from "../apiService.js";

export const getAllStudents = async () => {
  try {
    const url = API_URL + "/students_list.php";
    const resp = await fetch(url);
    const data = await resp.json();

    return data;
  } catch {}
};

export const setAttendeeArrived = async (t_z_id) => {
  const url = API_URL + "/has_arrived.php";
  const res = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(t_z_id),
    headers: { "content-type": "application/json" },
  });
  return res;
};
