const errorHandler = (error, req, res, next) => {

    console.error("Email Error:", error);

    res.status(500).json({
        success: false,
        message:
            error.message ||
            "Unable to send message."
    });
};

export default errorHandler;