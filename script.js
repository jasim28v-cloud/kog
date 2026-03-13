const GHOST_ID = 'NODE-' + Math.random().toString(36).substr(2, 4).toUpperCase();

// مزامنة الوقت
setInterval(() => {
    document.getElementById('timer').innerText = new Date().toLocaleTimeString('en-GB');
}, 1000);

// محرك جلب الفيديوهات فائق السرعة
db.ref('videos').on('value', (snap) => {
    const feed = document.getElementById('feed');
    const data = snap.val();
    if(!data) return;
    
    feed.innerHTML = '';
    Object.keys(data).reverse().forEach(id => {
        const v = data[id];
        const section = document.createElement('section');
        section.className = 'video-segment';
        section.innerHTML = `
            <video loop playsinline muted preload="auto" src="${v.url}"></video>
            <div class="absolute left-5 bottom-32 flex flex-col gap-6 z-50">
                <div class="nav-btn bg-white/5" onclick="toggleLike('${id}')">
                    <i class="fas fa-heart ${v.likedBy && v.likedBy[GHOST_ID] ? 'text-pink-500' : ''}"></i>
                    <span class="text-[10px] absolute -bottom-5">${v.likes || 0}</span>
                </div>
            </div>
        `;
        feed.appendChild(section);
    });
    initObserver();
    document.getElementById('loading').style.display = 'none';
});

// تشغيل تلقائي ذكي (بدون انتظار تحميل)
function initObserver() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            const v = e.target.querySelector('video');
            if(e.isIntersecting) {
                v.play().catch(()=>{});
            } else {
                v.pause();
                v.currentTime = 0;
            }
        });
    }, { threshold: 0.8 });
    document.querySelectorAll('.video-segment').forEach(s => obs.observe(s));
}

// نظام الرفع المباشر المطور
const widget = cloudinary.createUploadWidget({
    cloudName: "dssk5tabb", uploadPreset: "bjebvo5p", sources: ['local']
}, (err, res) => {
    if(res.event === "success") {
        db.ref('videos').push({ url: res.info.secure_url, likes: 0, sender: GHOST_ID });
    }
});
document.getElementById('upload-btn').onclick = () => widget.open();
