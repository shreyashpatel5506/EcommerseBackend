import Usermodels from "../models/Usermodels.js";

import bcrypt from "bcrypt";

export const registerController = async (req, res) => {
  try {
    // [
    //     body("name", "Enter a valid name").isLength({ min: 3 }),
    //     body("email", "Enter a valid email").isEmail(),
    //     body("password", "Enter a valid password").isLength({ min: 5 }),
    //     body("phone", "Enter a valid username"),
    //     body("address", "Enter a valid address"),
    //     body("role", "Enter a valid role")

    //   ]
    const { name, email, password, address, role, phone } = req.body;

    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    if (!name) {
      return res.status(401).json({ success, errors: errors.array() });
    }
    if (!email) {
      return res.status(401).json({ success, errors: errors.array() });
    }
    if (!address) {
      return res.status(401).json({ success, errors: errors.array() });
    }
    if (!phone) {
      return res.status(401).json({ success, errors: errors.array() });
    }
    if (!password) {
      return res.status(401).json({ success, errors: errors.array() });
    }
    if (!role) {
      return res.status(401).json({ success, errors: errors.array() });
    }

    const userEmail = await Usermodels.findOne({ email });
    if (userEmail) {
      return res
        .status(200)
        .json({ success: true, message: "Alreday regestier please login" });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    const user = await Usermodels.create({
      name,
      email,
      phone,
      address,
      password: secPass,
      role,
    });

    const data = { user: { id: user.id } };
    const jwtToken = jwt.sign(data, JWT_SECRET);

    success = true;
    res.status(201).json({ success, jwtToken });
  } catch (error) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
