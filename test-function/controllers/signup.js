// ответ должен иметь статус-код 200
// в ответе должен возвращаться токен
// в ответе должен возвращаться объект user с 2 полями email и subscription, имеющие тип данных String

const user = [
  {
    email: String,
    subscription: String,
  },
];

console.log("user", user);
const signup = async (req, res) => {};

module.exports = signup;
