const express = require("express");
const router = express.Router();

const config = require("../../databaseConfig.js");
const connection = config.connection;

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

const stripe = require("stripe")(stripeSecretKey);

router.post("/", (req, res) => {
  let event;

  try {
    event = req.body;
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      var paymentIntentID = event.data.object.id;
      var session = stripe.checkout.sessions.retrieve(
        paymentIntentID,
        (err, session) => {
          var beatName = session.display_items[0].custom.name;
          var databaseBeatPrice = 0;
          let sql =
            `SELECT exclusive_price FROM beats WHERE name='` + beatName + "'";
          let query = connection.query(sql, (err, rows, fields) => {
            if (err) throw err;
            databaseBeatPrice = rows[0].exclusive_price;
            var price = session.display_items[0].amount / 100;
            // If track bought exclusively, delete it from the database
            if (price == databaseBeatPrice) {
              connection.query(`DELETE FROM beats WHERE name='` + beatName + "'", (err, result) => {
                
              });
              // Send email containing beat
            } 
            // Else track was bought as trackout
            else {
              // Send email containing beat
            }
          });
        }
      );
      break;
    // ... handle other event types
    default:
      // Unexpected event type
      return res.status(400).end();
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
});

module.exports = router;
