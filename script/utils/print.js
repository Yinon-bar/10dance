export const printAttendeeFromList = async (list, t_z_id, postPrintURL) => {
  const attendee = list.find((attendee) => attendee.t_z_id === t_z_id);
  if (attendee) {
    window.location =
      "../admin/print_page.html?id=" +
      t_z_id +
      `&post-print-url=${postPrintURL}`;
  } else {
    alert("Attendee missing");
  }
};
