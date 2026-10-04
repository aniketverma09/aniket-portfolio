import transporter from "../config/mail.js";
import createEmailTemplate from "../utils/emailTemplate.js";

export const sendContactEmail = async (req, res, next) => {
    try {
        const {
            name,
            email,
            subject,
            message
        } = req.body;

        // ================= VALIDATION =================

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields."
            });
        }

        // ================= ENV CHECK =================

        if (
            !process.env.EMAIL_USER ||
            !process.env.EMAIL_PASS ||
            !process.env.EMAIL_TO
        ) {
            console.error(
                "Email environment variables are missing."
            );

            return res.status(500).json({
                success: false,
                message: "Email configuration is missing."
            });
        }

        // ================= VERIFY =================

        await transporter.verify();

        console.log(
            "Gmail transporter verified successfully ✅"
        );

        // ================= EMAIL =================

        await transporter.sendMail({
            from: process.env.EMAIL_USER,

            to: process.env.EMAIL_TO,

            replyTo: email,

            subject: `Portfolio Contact: ${subject}`,

            html: createEmailTemplate({
                name,
                email,
                subject,
                message
            })
        });

        console.log("Email sent successfully ");

        return res.status(200).json({
            success: true,
            message: "Message sent successfully!"
        });

    } catch (error) {
        next(error);
    }
};