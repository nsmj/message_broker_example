"use strict";

const express = require("express");
const amqp = require("amqplib/callback_api");

const PORT = 8080;
const HOST = "0.0.0.0";

const app = express();

app.get("/", (req, res) => {
  res.json({ username: "Initial page" });
});

app.get("/send", (req, res) => {
  amqp.connect("amqp://rabbitmq:5672", function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      var queue = "hello";
      var msg = "Hello world";

      channel.assertQueue(queue, {
        durable: true,
      });

      channel.sendToQueue(queue, Buffer.from(msg), {
        persistent: true,
      });
      console.log(" [x] Sent %s", msg);
    });
  });

  res.send("Finished");
});

app.listen(PORT, HOST);
