const nodemailer = require('nodemailer');
  
  
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rakshithagowda7476@gmail.com',
        pass: 'Rakshi@mapa143'
    }
});
  
let mailDetails = {
    from: 'rakshithagowda7476@gmail.com',
    to: 'subbu.lak.ec@gmail.com',
    subject: 'Test mail',
    text: 'Email is triggered from Rakshitha'
};
  
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully');
    }
});