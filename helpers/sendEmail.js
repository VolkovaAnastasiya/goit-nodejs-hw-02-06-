const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "volkova.anastasiya1986@gmail.com" };

  try {
    await sgMail.send(email);
    console.log("mail true");
    return true;
  } catch (error) {
    console.log("mail throw error.message");
    throw error.message;
  }
};

module.exports = sendEmail;
