// events-render.js - event data + render
window.EVENTS = [
  { id: 'tech2025', type:'upcoming', title:'Annual Tech Fest 2025', img:'./assets/images/techfest.jpg', desc:'Technical competitions, project displays & coding contests.', date:'Coming Soon', photos:['./assets/images/techfest.jpg'] },
  { id: 'sports', type:'upcoming', title:'Sports Meet', img:'./assets/images/sports.jpg', desc:'Inter-department sports championships.', date:'TBA', photos:['./assets/images/sports.jpg'] },
  { id: 'fest2024', type:'past', title:'Cultural Fest 2024', img:'./assets/images/fest2024.jpg', desc:'Dance, singing, drama & celebrations.', date:'2024-10-12', photos:['./assets/images/fest2024.jpg'] },
  { id: 'blood2024', type:'past', title:'Blood Donation Camp', img:'./assets/images/bloodcamp.jpg', desc:'Annual blood donation awareness program.', date:'2024-05-02', photos:['./assets/images/bloodcamp.jpg'] }
];

function renderUpcoming(){
  const out = document.getElementById('upcomingList');
  if(!out) return;
  out.innerHTML = '';
  window.EVENTS.filter(e=>e.type==='upcoming').forEach(ev=>{
    const div = document.createElement('div');
    div.className = 'event-box';
    div.innerHTML = `<img src="${ev.img}" alt="${ev.title}"><div><h3 style="margin:0 0 6px 0">${ev.title}</h3><p class="small-muted">${ev.desc}</p><p><strong>Date:</strong> ${ev.date}</p><p style="margin-top:8px"><a class="btn" href="./event-detail.html?id=${ev.id}">View Details</a></p></div>`;
    out.appendChild(div);
  });
}

function renderPast(){
  const out = document.getElementById('pastGrid');
  if(!out) return;
  out.innerHTML = '';
  window.EVENTS.filter(e=>e.type==='past').forEach(ev=>{
    const div = document.createElement('div');
    div.className = 'event-card';
    div.innerHTML = `<img src="${ev.img}" alt="${ev.title}"><h4>${ev.title}</h4><p style="margin-top:8px"><a class="btn" href="./event-detail.html?id=${ev.id}">View Details</a></p>`;
    out.appendChild(div);
  });
}

// Run on pages
document.addEventListener('DOMContentLoaded', ()=>{
  renderUpcoming();
  renderPast();
});
