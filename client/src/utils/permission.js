export const hasPermission = (accessLevel, roles) => {
  if (!roles || roles.length < 1) return false;
  const isAuthorized = roles
    .map((role) => accessLevel.includes(role))
    .some((val) => val === true);

  return isAuthorized;
};
