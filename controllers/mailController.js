const nodemailer = require("nodemailer");

const sendEmailToUser = async (req, res) => {
  const { firstName, lastName, email, date, time, bill } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "moudislayer15@gmail.com",
      pass: "tpmw hbpk ypkp dxcx",
    },
  });
  const info = await transporter.sendMail({
    from: "Champions arena",
    to: `${email}`,
    subject: `Booking Confirmation - Champions Arena `, // Subject line
    html: `<b>Dear ${firstName} ${lastName}</b><br/>
               <p>We are pleased to inform you that your booking at Champions Arena has been confirmed. Below are the details of your reservation:</p>
               <ul>
                 <li>Date: ${date}</li>
                 <li>Time: ${time}</li>
                 <li>Total price: ${bill}$</li>
               </ul><br/>
               <p>If you have any questions or need to cancel your booking, feel free to contact us at this email.</p>
               <p>Check out all our forthcoming events by following this <a href='https://champions-arena.onrender.com/events'>link.</a></p>
               <p>We hope you will enjoy your time at our favorite sports facility.</p><br/>
               <p>Best regards,<br/>
                  Champions Arena team.
              </p>`,
             
              });
  if (!info) {
    return res
      .status(500)
      .json({ message: "An error occured while sending email" });
  }
  return res.status(200).json({ message: "email sent successfully!" });
};

module.exports = { sendEmailToUser };
