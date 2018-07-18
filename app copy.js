const http = require("http");
const fs = require("fs");
const os = require("os");
const ip = require("ip");
const url = require("url");
const path = require("path");

const port = 8080;
const hostname = "127.0.0.1";
// const bodyParser = require("body-parser");

const navigation =
  "<a href='/'>Home</a> <a href='/about'>About</a> <a href='/contact'>Contact</a>";

http
  .createServer((req, res) => {
    if (req.url === "/" || req.url === "/home") {
      fs.readFile("index.html", (err, data) => {
        if (err) {
          return console.log(err);
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(navigation);
        res.write(data);
        res.end();
      });
    } else if (req.url === "/about") {
      fs.readFile("about.html", (err, data) => {
        if (err) {
          return console.log(err);
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(navigation);
        res.write(data);
        res.end();
      });
    } else if (req.url === "/contact") {
      fs.readFile("contact.html", (err, data) => {
        if (err) {
          return console.log(err);
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(navigation);
        res.write(data);
        res.end();
        console.log(req.url);
      });
    } else if (req.url.inludes("name")) {
      res.writeHead(200, { "Content-Type": "text/html" });
      const nodemailer = require("nodemailer");

      // const url = require("url");
      // const adr = url;
      // const q = url.parse(adr, true);

      // const qdata = q.query;
      // const name = qdata.name;
      // const email = qdata.email;
      // const message = qdata.message;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: false,
        port: 25,
        auth: {
          user: "hamamdjian@gmail.com",
          pass: "axellino"
        },
        tls: {
          rejectedUnauthorized: false
        }
      });
      const mailOptions = {
        from: '"Chris" <hamamdjian@gmail.com',
        to: "chistian.hamamdjian@welho.com",
        subject: "Sending Email using Node.js",
        text: "That was easy!"
      };
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          console.log(info);
        }
      });

      // const formcontent = `User name: ${name} user ip:${ip.address()} checking time:${checkingTime} email:${email} message:${pageUrl}\n`;
      // fs.appendFile("track.user.txt", formcontent, e => {
      //   if (e) {
      //     console.log(e);
      //   }
      //   console.log("form content saved");
      // });
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      const nodemailer = require("nodemailer");

      const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: false,
        port: 25,
        auth: {
          user: "hamamdjian@gmail.com",
          pass: "axellino"
        },
        tls: {
          rejectedUnauthorized: false
        }
      });
      const mailOptions = {
        from: '"Chris" <hamamdjian@gmail.com',
        to: "chistian.hamamdjian@welho.com",
        subject: "Sending Email using Node.js",
        text: "That was easy!"
      };
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          console.log(info);
        }
      });
    }

    const user = os.hostname();
    const pageUrl = req.url;
    const checkingTime = Date.now();

    const content = `User: ${user} user ip:${ip.address()} checking time:${checkingTime} checked page:${pageUrl}\n`;

    fs.appendFile("track.user.activity.txt", content, e => {
      if (e) {
        console.log(e);
      }
      console.log("content saved");
    });
  })

  .listen(port, hostname, () => {
    console.log(`Server is running on ${port}...`);
  });
