export const convertDate = (datePosted: string | number | Date) =>
  `${new Date(datePosted).toLocaleDateString("en-GB").replaceAll("/", ".")}.`;
