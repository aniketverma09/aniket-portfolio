import resend from "../config/mail.js";
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
            !process.env.RESEND_API_KEY ||
            !process.env.EMAIL_TO
        ) {
            console.error(
                "Resend environment variables are missing."
            );

            return res.status(500).json({
                success: false,
                message: "Email configuration is missing."
            });
        }

        // ================= EMAIL =================

        const { data, error } = await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: [process.env.EMAIL_TO],
            replyTo: email,
            subject: `Portfolio Contact: ${subject}`,

            html: createEmailTemplate({
                name,
                email,
                subject,
                message
            })
        });

        // ================= RESEND ERROR =================

        if (error) {
            console.error("Resend Error:", error);

            return res.status(500).json({
                success: false,
                message: error.message || "Email could not be sent."
            });
        }

        console.log("Email sent successfully:", data?.id);

        return res.status(200).json({
            success: true,
            message: "Message sent successfully!"
        });

    } catch (error) {
        console.error("Contact Email Error:", error);
        next(error);
    }
};