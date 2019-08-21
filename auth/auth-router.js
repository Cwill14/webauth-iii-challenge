const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');
const secrets = require('./secrets.js');

router.post('/register', verifyUser, async (req, res) => {
    let user = req.body;
    user.password = bcrypt.hashSync(user.password, 10);
    try {
        const newUser = await Users.addUser(user);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
})
// router.post('/register', verifyUser, (req, res) => {
//     let user = req.body;
//     const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
//     user.password = hash;
  
//     Users.addUser(user)
//       .then(saved => {
//         res.status(201).json(saved);
//       })
//       .catch(error => {
//         res.status(500).json(error);
//       });
// });

router.post('/login', verifyUser, async (req, res) => {
    let { username, password } = req.body;
    Users.getByFilter({ username })
    .first()
    .then(user => {
        if(!user && !bcrypt.compareSync(password, user.password)) {
            res.status(401).json({ error: 'incorrect username and/or password' })
        } else {
            const token = generateToken(user)
            res.status(200).json({
                message: `Welcome, ${user.username}`,
                token
            })
        }
    })
    .catch(error => {
        res.status(500).json(error);
    })
    
})

function verifyUser(req, res, next) {
    let user = req.body;
    if (!user.username && !user.password) {
        res.status(400).json({ error: 'please provide username and password' })
    } 
    // else if(!user.department){
    //     res.status(400).json({ error: 'please provide department' })
    // } 
    else {
        next();
    }
}

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;