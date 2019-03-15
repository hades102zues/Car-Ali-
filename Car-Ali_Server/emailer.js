const nodemailer = require('nodemailer');


//this is only be viable in development
//had to turn on the less secure app feautre on the gmail account
//or the email are never handled
const  transporter = nodemailer.createTransport({
    service: 'gmail',
  auth: {
    user: 'carali.test@gmail.com',
    pass: 'carali_50282409'
  },
  tls:{ //to prevent the self-signed certificate error
  	rejectUnauthorized: false
  }
  
});

//in a production setup we must make use of a 3rd Party Mailing Servers like 
//SendGrid or Mailgun
//or your outgoing emails will be seen as unsecure and ignored by Outlook, Gmail, etc.
const api_key='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';
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(api_key);

//these 3rd parties usually provide their own api module for which
//to connect to their servers

//In addition to that, your hosting platform will have a list of 3rd party mail servers it supports 
//which are applied through addons.
//And so, make sure to chose a hoster which has support for your 3rd party mailer of choice

module.exports = transporter;

