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
  if(description.length === 0 || description.length > 150){
    errors.description = "Please write a short description about your service..."
  }
  return errors;
}
