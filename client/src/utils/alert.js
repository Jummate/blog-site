import swal from "sweetalert";

export const alertDelete = async (id, axiosAuth, navigate, callback) => {
  const willDelete = await swal({
    title: "Are you sure you want to delete this item?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
    closeOnClickOutside: false,
    closeOnEsc: false,
  });
  if (willDelete) {
    callback(id, axiosAuth, navigate);
  }
};
