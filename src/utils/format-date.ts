export const formatDate = (date: string | Date) => {
  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
