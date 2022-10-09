export const config = (user) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };
  return config;
};
