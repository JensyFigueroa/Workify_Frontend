export default function validate({
  category,
  image,
  description,
  price,
  ubication,
}) {
  var errors = {};
  const numericRegex = /^[0-9]+$/;
  if (!numericRegex.test(price)) {
    errors.price = "Price must contain only numbers";
  }
  return errors;
}
