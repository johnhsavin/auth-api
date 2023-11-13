import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { db } from "./dbConnect.js";
import { secretKey } from "./creds.js";

const coll = db.collection('users');

export async function createUser(req, res) {
const { email, password } = req.body
if(!email) {
  res.status(400).send({message: ' Invalid email or password.'});
  return;
}
const hashedPw = await bcrypt.hash(password, 10); // generates salt(10) and hashes
await coll.add({email: email.toLowerCase(), password: hashedPw }); 
login(req, res);
}

export async function login(req, res) {
  const { email, password} = req.body;
  const userCol = await coll.where('email', '==', email.toLowerCase()).get();
  const users = userCol.docs.map(doc => ({id: doc.id, ...doc.data() }));
  const user = users.filter(user => bcrypt.compareSync(password, user.password))[0];
  if(!user) {
    res.status(400).send({message: ' Not authorized; missing or bad email or password'})
    return;
   }
   delete user.password;    //this removes password from user object        
   const token = jwt.sign(user, secretKey)  
   res.send({ token })       
  }
  
                             
 

