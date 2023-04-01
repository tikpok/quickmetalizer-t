nodemailer = require('nodemailer');
require('dotenv').config();
mail = process.env.MailAddress;
pass = process.env.MailPassword;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MailAddress, // 送信元のGmailアカウント
      pass: process.env.MailPassword, // 送信元のGmailアカウントのパスワード
    }
  });
  const mailOptions = {
    from: process.env.MailAddress, // 送信元のメールアドレス
    to: process.env.MailAddress, // 送信先のメールアドレス
    subject: 'Error Notification', // メールの件名
    text: "test" // エラーメッセージの本文
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      
    } else {
      console.log('Email sent: ' + info.response);
      
    }
  });
