const nodemailer = require('nodemailer');


//this stuff is only viable in development
const  transporter = nodemailer.createTransport({
    service: 'gmail',
  auth: {
    user: 'jacob26referibles@gmail.com',
    pass: 'joshua_8205@24.09'
  },
  tls:{
  	rejectUnauthorized: false
  }
  
});

//in a production setup we must make use of a 3rd Party Mailing Service like 
//SendGrid or Mailgun
//or your outgoing emails will be seen as unsecure and ignored by Outlook, Gmail, etc.

module.exports = transporter;

