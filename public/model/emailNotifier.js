var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sajidahmed696@gmail.com',
    pass: ''
  }
});

window.sendEmailNotification=function(to)
{
      var mailOptions = {
        from: 'sajidahmed696@gmail.com',
        to: to,
        subject: 'Bus Koi',
        text: 'Bus has already reached the University'
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
