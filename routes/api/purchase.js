const express = require('express');
const router = express.Router();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

const stripe = require("stripe")(stripeSecretKey);

router.post("/", (req, res) => {
    (async () => {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [{
            name: req.body.name,
            description: req.body.description,
            images: req.body.images,
            amount: req.body.amount,
            currency: 'cad',
            quantity: 1,
          }],
          success_url: 'http://5c4355d0.ngrok.io/beats',
          cancel_url: 'http://5c4355d0.ngrok.io/beats',
        });
        res.send(session);
      })();
      
});

module.exports = router;