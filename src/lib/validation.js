const validateName = (name) => name.length > 1;
const validatePrice = (player) => player.price > 0 || player.freeTransfer;
const validateEmail = (email) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
const validateClub = (club) => club;
const validatePosition = (position) => position;

const validatePlayer = (player) =>
  validateName(player.name) &&
  validatePrice(player) &&
  validateEmail(player.email) &&
  validateClub(player.club) &&
  validatePosition(player.position);

export default validatePlayer;
