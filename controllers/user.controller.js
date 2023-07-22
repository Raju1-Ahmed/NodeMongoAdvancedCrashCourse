const { signupService, findUserByEmail } = require("../services/user.services")
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");
const { sendMailWithMailGun } = require("../utils/email");

exports.signup = async (req, res) => {
    try {
        const user = await signupService(req.body);

        const mailData = {
            to: [user.email],
            subject: "Verify your Account",
            text: "Thanks You"
        };

        sendMailWithMailGun(mailData);


        res.status(200).json({
            status: "success For Create a user Account",
            message: "Successfully signed Up",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error: error.message,
        });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                status: "fail",
                error: "Please Provide Your Credentials"
            });
        }
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                status: "fail",
                error: "No user found. please create an account"
            });
        }
        const isPasswordValid = user.comparePassword(password, user.password)
        if (!isPasswordValid) {
            return res.status(403).json({
                status: "fail",
                error: "password is not correct"
            });
        }
        if (user.status != "active") {
            return res.status(401).json({
                status: "fail",
                error: "Your Account Is Not Active Yet"
            });
        }

        const token = generateToken(user);
        const {password:pwd,...others} = user.toObject();

        res.status(200).json({
            status: "success",
            message: "Successfully logged in",
            data:{
                others,
                token
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error: error.message,
        });
    }
};

exports.getMe = async (req, res) =>{
    try {
        const user = await findUserByEmail(req.user?.email);
        res.status(200).json({
            status: "success",
            data: user
        })
    } catch (error) {
        req.status(500).json({
            status: "fail",
            error,
        })
    }
}