import swal from "sweetalert";

export const alertDelete = async ({
  id,
  axiosAuth,
  navigate = undefined,
  location = undefined,
  cb_role = undefined,
  cb_post = undefined,
  cb_delete,
}) => {
  const willDelete = await swal({
    title: "Are you sure you want to delete this item?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
    closeOnClickOutside: false,
    closeOnEsc: false,
  });
  if (willDelete) {
    await cb_delete(id, axiosAuth);
    cb_post && cb_post();
    cb_role && cb_role();
    location && navigate && navigate(location);
  }
};
