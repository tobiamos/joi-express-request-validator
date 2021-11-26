#  EXPRESS JOI REQUEST VALIDATOR

This library takes a declarative approach in validating http request data in express using Joi validation Lib


#### HOW TO USE

1. Install the npm package

> ` npm install express-joi-validator`

2. Define your Joi Schema 

```js

const registerSchema = {
  body: {
    name: joi.string().min(2).max(150).required()
      .messages({
        'any.required': 'Name is required',
        'string.min': 'Name must be at least two characters long',
        'string.max': 'Name cannot be more than 150 characters long',
      }),
    email: joi.string().email().required().messages({
      'any.required': 'Email is required',
    }),
    password: joi.string().min(6).max(200).required()
      .messages({
        'any.required': 'Password is required',
        'string.min': 'Password must be at least 6 characters long',
        'string.max': 'Password must be at most 200 characters long',
      }),
    organization: joi.string().min(2).max(200)
      .required()
      .messages({
        'any.required': 'Name of Organization is required',
      }),
  },
};

 ```

3. Add the middleware to your route

```js

const validate = require("express-joi-validator");
const controller = require('./controller');
const registerSchema = require("./registerSchema");

app.post(
  '/register',
  validate(registerSchema),
  controller.register,
)

```
4. Handle Errors in express error handler

```js
app.use((err, req, res, next) => { 
  if (err.isBoom) {
    res.status(err.output.statusCode);
    const { message } = err.data[0];
   return res.json({ error: message });
  }

//...
});

```
