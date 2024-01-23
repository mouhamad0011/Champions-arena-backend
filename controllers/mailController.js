const nodemailer = require('nodemailer');

const sendEmailToUser = async (req, res)=>{
    const {firstName, lastName, email, date, time} = req.body;
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
        subject: `Booked succesfully at Champions arena`, // Subject line
        //text: `Hello ${fullName} from Champions arena`, // plain text body
        html: `<b>Hello ${firstName} ${lastName}</b>
               <p>Your booking is on ${date} from ${time}</p>`, // html body
      });
      if(!info){
        return res.status(500).json({message : "An error occured while sending email"})
      }
      return res.status(200).json({message : "email sent successfully!"})
}

module.exports = {sendEmailToUser}