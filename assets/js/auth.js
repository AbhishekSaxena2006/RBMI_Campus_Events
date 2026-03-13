(function(){

  function getUsers(){
    try { return JSON.parse(localStorage.getItem("rbmi_users") || "[]"); }
    catch { return []; }
  }

  function saveUsers(arr){
    localStorage.setItem("rbmi_users", JSON.stringify(arr));
  }

  // ------------------- SIGNUP -------------------
  const signupForm = document.getElementById("signupForm");
  if(signupForm){
    signupForm.addEventListener("submit", e=>{
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim().toLowerCase();
      const dept = document.getElementById("dept").value;
      const eventName = document.getElementById("event").value;
      const pwd = document.getElementById("pwd").value;
      const pwd2 = document.getElementById("pwd2").value;
      const msg = document.getElementById("signupMsg");

      if(!name || !email || !dept || !eventName || !pwd){
        msg.textContent = "Please fill all fields.";
        return;
      }

      if(pwd !== pwd2){
        msg.textContent = "Passwords do not match.";
        return;
      }

      const allowedDomains = ["gmail.com","rbmi.edu.in","outlook.com"];
      const domain = email.split("@")[1];

      if(!allowedDomains.includes(domain)){
        msg.textContent = "Invalid email domain.";
        return;
      }

      const users = getUsers();
      if(users.some(u=>u.email===email)){
        msg.textContent = "Email already registered.";
        return;
      }

      users.push({name,email,dept,eventName,pwd,created:Date.now()});
      saveUsers(users);

      msg.style.color="#0a3d62";
      msg.textContent="Signup successful! Redirecting...";

      setTimeout(()=> location.href="./login.html",800);
    });
  }

  // ------------------- LOGIN -------------------
  const loginForm = document.getElementById("loginForm");

  if(loginForm){
    loginForm.addEventListener("submit", e=>{
      e.preventDefault();

      const email = emailL.value.trim().toLowerCase();
      const pwd = pwdL.value;
      const msg = document.getElementById("loginMsg");

      msg.textContent = "";

      const allowedDomains = ["gmail.com","rbmi.edu.in","outlook.com"];
      const domain = email.split("@")[1];

      if(!allowedDomains.includes(domain)){
        msg.textContent = "Invalid domain";
        return;
      }

      const users = getUsers();
      const found = users.find(u => u.email===email && u.pwd===pwd);

      if(!found){
        msg.textContent="Invalid credentials";
        msg.style.color="#c62828";
        return;
      }

      localStorage.setItem("rbmi_current_user", JSON.stringify(found));
      msg.style.color="#0a3d62";
      msg.textContent="Login Successful...";

      setTimeout(()=> location.href="./index.html",700);
    });
  }

  // ------------------- NAVBAR UPDATE -------------------
  window.addEventListener("DOMContentLoaded", ()=>{
    const cur = JSON.parse(localStorage.getItem("rbmi_current_user") || "null");
    const navSign = document.getElementById("nav-sign");
    const navLogin = document.getElementById("nav-login");

    if(cur){
      if(navSign) navSign.textContent = cur.name;
      if(navLogin){
        navLogin.textContent="Logout";
        navLogin.href="#";
        navLogin.addEventListener("click", e=>{
          e.preventDefault();
          localStorage.removeItem("rbmi_current_user");
          location.reload();
        });
      }
    }
  });

})();
