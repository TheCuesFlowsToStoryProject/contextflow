const Express = require("express");
const router = Express.Router();
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const config = require("../config");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "please enter all the fields" });
  }

  User.findOne({ email }).then((user) => {
    if (user)
      return res.send({
        err: "User already exists",
      });
    const newUser = new User({ name, email, password });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            config.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) {
                console.log(err);
              } else {
                res.json({
                  token,
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                  },
                });
              }
            }
          );
        });
      });
    });
  });
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, config.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/user", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send({ err: "please enter all the fields" });
  }

  User.findOne({ email }).then((user) => {
    if (!user) return res.send({ err: "user does not exist" });
    //validate password

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.send({ err: "invalid credential" });

      jwt.sign(
        { id: user.id },
        config.JWT_SECRET,
        // {expiresIn: 3600},
        (err, token) => {
          if (err) {
            console.log(err);
          } else {
            res.json({
              token,
              user: {
                _id: user._id,
                name: user.name,
                email: user.email,
              },
            });
          }
        }
      );
    });
  });
});
router.get("/auth/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => {
      res.json(user);
    });
});

module.exports = router;
