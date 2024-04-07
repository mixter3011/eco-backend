import user from "../models/User.js"
import bcrypt from "bcryptjs";

const authControllers = {
    register: async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json("Enter all fields");

        const doesUserExist = await user.findOne({ email });
        if (doesUserExist) return res.status(400).json("User with that email already exists");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await user.create({
            email,
            password: hashedPassword
        });

        return res.status(201).json(newUser);
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json("Enter all fields");

        const doesUserExist = await user.findOne({ email });
        if (!doesUserExist) return res.status(400).json("User with that email doesnt exists");

        const passwordsMatch = await bcrypt.compare(password, doesUserExist.password);
        if (!passwordsMatch) return res.status(403).json("Password Incorrect");

        return res.status(200).json(doesUserExist);
    }
}

export default authControllers;