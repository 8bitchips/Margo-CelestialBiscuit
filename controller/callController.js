const { uuid } = require("uuidv4");
const nodemailer = require("nodemailer");

const callHandler = async (req, res) => {
  try {
    let id = uuid();
    let link = `https://margowomen.herokuapp.com/connect?appid=29e55ef2413b499287a93d636bfe9979&channel=${id}`;

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "architg603@gmail.com", // generated ethereal user
        pass: "pchgajwpxjnduanc",
      },
    });

    // send mail with defined transport object
    let info = transporter
      .sendMail({
        from: "architg603@gmail.com", // sender address
        to: req.body.mail, // list of receivers
        subject: "Call Over Margo", // Subject line
        // text: link,
        html: `Hello Human! <br><br> We would like to let you know your dear one is suffering from horrible period cramps. <br> <b>Pro tip:</b> Don't go near her or else you will awake a deadly monster and regret the decision for your entire life. <br> But she needs you right now. No worries, Team Margo is here with suggestions specially for you to make her feel better, amazing and beautiful like she is. Here are some things you can do for her right now: <br><br> 1. Get some chocolates for her. Trust us, that works. <br> 2. Hot water bags. They are literally God's own creation. <br> 3. Her favorite games. She is overloading with emotions, let her win this time soldier :wink: <br> <br>Oh, and, most importantly, tell her how much you love her. <br> <br><b> You are amazing. Cheers!</br>
        <br>Link- ${link} <br> <i>Team Margo</i>"`,
        // plain text body
      })
      .catch((err) => {
        console.log(err);
      });

    res.status(200).json({
      id,
      link,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Faild to make call",
    });
  }
};

const sendMail = async (req, res) => {
  try{
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "architg603@gmail.com", // generated ethereal user
      pass: "pchgajwpxjnduanc",
    },
  });

  // send mail with defined transport object
  let info = transporter
    .sendMail({
      from: "architg603@gmail.com", // sender address
      to: req.body.mail, // list of receivers
      subject: "Hello, your favourite person needs you :puppy-face:", // Subject line
      html: `Hello Human! <br><br> We would like to let you know your dear one is suffering from horrible period cramps. <br> <b>Pro tip:</b> Don't go near her or else you will awake a deadly monster and regret the decision for your entire life. <br> But she needs you right now. No worries, Team Margo is here with suggestions specially for you to make her feel better, amazing and beautiful like she is. Here are some things you can do for her right now: <br><br> 1. Get some chocolates for her. Trust us, that works. <br> 2. Hot water bags. They are literally God's own creation. <br> 3. Her favorite games. She is overloading with emotions, let her win this time soldier :wink: <br> <br>Oh, and, most importantly, tell her how much you love her. <br> <br><b> You are amazing. Cheers!</br>
      <br> <br> <i>Team Margo</i>"`,
      // plain text body
    })
    .catch((err) => {
      console.log(err);
    });
    res.status(200).json({
      msg:"successfully mail send"
    })
  }catch(err){
    res.status(500).json({
      msg:"failed to send mail"
    })
  }
};


module.exports.callHandler = callHandler;
module.exports.sendMail = sendMail;
