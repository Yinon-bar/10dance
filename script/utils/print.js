import { getAllStudents } from "./students.js";

export const getAttendeeFromDB = async (t_z_id) => {
  try {
    const attendees = await getAllStudents();
    const atteendee = attendees.find((attendee) => attendee.t_z_id === t_z_id);
    return atteendee;
  } catch {}
};

export const printAttendee = async (t_z_id, postPrintURL) => {
  window.location =
    "../admin/print_page.html?id=" + t_z_id + `&post-print-url=${postPrintURL}`;
};
