export const registerCall = async (userCred, dispatch, isAuth, setIsAuth) => {};

export const logoutCall = async (dispatch) => {
  const user = localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.setItem("isAuth", false);
  dispatch({ type: "LOGOUT", payload: user });
};
