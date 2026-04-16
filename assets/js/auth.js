(function(){

  function getCurrentUser(){
    try { return JSON.parse(localStorage.getItem("rbmi_current_user")); }
    catch { return null; }
  }

  window.addEventListener("DOMContentLoaded", ()=>{

    const cur = getCurrentUser();
    const role = localStorage.getItem("role");

    const navSign = document.getElementById("nav-sign");
    const navLogin = document.getElementById("nav-login");
    const adminEvents = document.getElementById("admin-events");
    const adminData = document.getElementById("admin-data");

    // 🔴 DEFAULT HIDE
    if(adminEvents) adminEvents.style.display = "none";
    if(adminData) adminData.style.display = "none";

    // ✅ LOGIN STATE
    if(cur){
      if(navSign) navSign.textContent = cur.name;

      if(navLogin){
        navLogin.textContent = "Logout";
        navLogin.href = "#";

        navLogin.onclick = (e)=>{
          e.preventDefault();
          localStorage.clear();
          location.reload();
        };
      }
    }

    // 👑 ADMIN
    if(role === "admin"){
      if(adminEvents) adminEvents.style.display = "inline";
      if(adminData) adminData.style.display = "inline";
    }

  });

})();