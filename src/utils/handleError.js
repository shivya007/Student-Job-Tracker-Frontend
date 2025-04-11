export const handleError = (error) => {
    if (error.response && error.response.data?.message) {
      return error.response.data.message;
    }
    return error.message || "Something went wrong!";
  };
  