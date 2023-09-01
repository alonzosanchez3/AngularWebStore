const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')

const app = express()
app.use(express.static('public'))
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.use(cors({origin: true, credentials: true}))

const stripe = require('stripe')("sk_test_51NlQzWG9MLiQo8RGglThHY7BjO6WMgldXihVrpjVNsUJ2ydJrpLNgEjnn7rUR0V6F6duHl4K8NMxkRSiL30pr4TR00YW4r981G");

app.post('/checkout', async(req, res, next) => {
  console.log('accessed')
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['US', "CA"]
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'usd'
            },
            display_name: 'Free shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              }
            }
          }
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 1500,
              currency: 'usd'
            },
            display_name: 'Next day air',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 1,
              },
              maximum: {
                unit: 'business_day',
                value: 1,
              }
            }
          }
        }
      ],
      line_items: req.body.items.map((item) => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: [item.product]
            },
            unit_amount: item.price * 100
          },
          quantity: item.quantity
        }
      }),
      mode: 'payment',
      success_url: "http://localhost:4242/success.html",
      cancel_url: "http://localhost:4242/cancel.html"
    })
    res.status(200).json(session)
  } catch(error) {
    console.log(error)
    next(error)
  }
})

app.listen(4242, () => {
  console.log('app is running on 4242')
})
