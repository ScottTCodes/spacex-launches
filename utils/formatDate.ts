const formatDate = (date: string) => {
  const dateObject = new Date(date);

  if (dateObject instanceof Date && !isNaN(dateObject.getTime())) {
    return dateObject.toUTCString();
  }

  return null;
};

export default formatDate;
