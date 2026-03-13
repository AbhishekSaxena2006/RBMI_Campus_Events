// event-detail.js - show selected event's detail
(function(){
  function qs(name){ const url = new URL(location.href); return url.searchParams.get(name); }
  const id = qs('id');
  if(!id) return;
  const ev = (window.EVENTS || []).find(x=>x.id===id) || null;
  if(!ev){
    document.getElementById('detailWrap').innerHTML = '<p>Event not found.</p>';
  } else {
    const wrap = document.getElementById('detailWrap');
    wrap.innerHTML = `
      <h2>${ev.title}</h2>
      <div class="organizer" style="margin-top:12px">
        <img src="${ev.img}" alt="${ev.title}">
        <div class="info">
          <p><strong>Date:</strong> ${ev.date}</p>
          <p>${ev.desc}</p>
          <p><strong>Photos:</strong></p>
          <div id="photos" style="display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:10px; margin-top:8px"></div>
        </div>
      </div>
    `;
    const photosDiv = document.getElementById('photos');
    (ev.photos||[]).forEach(p=>{
      const im = document.createElement('img'); im.src = p; im.style.width='100%'; im.style.borderRadius='8px'; im.style.objectFit='cover';
      photosDiv.appendChild(im);
    });
  }
})();
