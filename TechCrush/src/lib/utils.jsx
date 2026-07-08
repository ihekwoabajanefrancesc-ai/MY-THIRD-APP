export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString();
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}