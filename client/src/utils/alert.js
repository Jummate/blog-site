import swal from "sweetalert";

export const alertDelete = async (id, axiosAuth, navigate, deletePost) => {
  const willDelete = await swal({
    title: "Are you sure you want to delete this post?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
    closeOnClickOutside: false,
    closeOnEsc: false,
  });
  if (willDelete) {
    deletePost(id, axiosAuth, navigate);
  }
};
