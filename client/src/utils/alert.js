import swal from "sweetalert";
import deleteItem from "../helpers/delete";

export const alertDelete = async ({
  id,
  axiosAuth,
  type,
  navigate = undefined,
  location = undefined,
  callback = undefined,
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
    await deleteItem({ id, axiosAuth, type });
    callback && callback();
    location && navigate && navigate(location);
  }
};
