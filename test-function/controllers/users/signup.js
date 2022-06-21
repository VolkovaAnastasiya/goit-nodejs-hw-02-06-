// ответ должен иметь статус-код 200
// в ответе должен возвращаться токен
// в ответе должен возвращаться объект user с 2 полями email и subscription, имеющие тип данных String

const user = [
  {
    email: "vhggdh@gmail.com",
    subscription: "vhggdh",
    token: "",
  },
];
// false - ошибка 'Year must be number'

const signup = (req, res) => {
  res.json(user);
  if (res.status !== 200) {
    throw new Error("status must be 200");
  }
  if (typeof email !== "string") {
    throw new Error("email must be typeof string");
  }
  if (typeof subscription !== "string") {
    throw new Error("subscription must be typeof string");
  }
  if (!res.email || res.email === undefined) {
    throw new Error("user must have email");
  }
  if (!res.subscription) {
    throw new Error("user must have subscription");
  }
  if (res.email === undefined) {
    throw new Error("email must be typeof string");
  }
  if (res.subscription === undefined) {
    throw new Error("user must have subscription");
  }
  if (res.token === undefined) {
    console.log("user must have register");
    throw new Error("user must have register");
  }
  if (res.token === null) {
    console.log("user must have avtorization");
    throw new Error("user must have avtorization");
  }
};

module.exports = signup;

// function sum(a, b) {
//   return a + b;
// }
// module.exports = sum;

// const products = [
//   {
//     id: "1",
//     name: "iPhone X",
//     price: 17000,
//   },
// ];

// const getAll = async (req, res) => {
//   res.json(products);
// };

// module.exports = getAll;
