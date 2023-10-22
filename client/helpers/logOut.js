export default logOut = async (navigate, setToken, handleProfileMenu) => {
  try {
    await axios.get(`${baseUrl.serverBaseUrl}/logout`, {
      withCredentials: true,
    });
    handleProfileMenu();
    setToken("");
    navigate("/");
  } catch (err) {
    console.error(err);
  }
};
