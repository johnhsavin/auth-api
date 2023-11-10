import jwt from "jsonwebtoken";
import { secretKey } from "./creds.js";

export async function isAuthenticated(req, res, next) {   // middleware takes three parameters (next)
// first check if they have a token:
const { authorization } = req.headers;    // authorization is the token

// then check if the token is valid:
if(!authorization) {
  res.status(401).send({ message: 'No authorization token found' });
  return;
}

// then check if the token is valid:
jwt.verify(authorization, secretKey, (err, decoded) => {
  if(err) {           // not valid token
res.status(401).send(err);
return;
  }

  // valid token:
  req.locals = decoded;   //attach our decoded tokens to the request

  // if so, go on:
  next();
});
}