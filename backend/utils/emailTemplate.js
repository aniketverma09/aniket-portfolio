const escapeHTML = (text = "") => {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const createEmailTemplate = ({ name, email, subject, message }) => {
  return `
<!DOCTYPE html>

<html>

<head>
    <meta charset="UTF-8">

    <title>
        New Portfolio Message
    </title>
</head>

<body style="
    margin:0;
    padding:20px;
    font-family:Arial,sans-serif;
    background:#f5f5f5;
">

    <div style="
        max-width:600px;
        margin:auto;
        padding:30px;
        background:white;
        border-radius:15px;
    ">

        <h2 style="
            color:#8d7b68;
        ">
            New Portfolio Message
        </h2>

        <hr>

        <p>
            <strong>Name:</strong>
            ${escapeHTML(name)}
        </p>

        <p>
            <strong>Email:</strong>
            ${escapeHTML(email)}
        </p>

        <p>
            <strong>Subject:</strong>
            ${escapeHTML(subject)}
        </p>

        <p>
            <strong>Message:</strong>
        </p>

        <div style="
            padding:15px;
            background:#f5f2ee;
            border-radius:10px;
            white-space:pre-wrap;
        ">
            ${escapeHTML(message)}
        </div>

    </div>

</body>

</html>
`;
};

export default createEmailTemplate;
