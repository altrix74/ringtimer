const C="ringtimer-v3";
const CORE=["./","index.html","manifest.webmanifest"];
const EXTRA=["IMG_1379.png","IMG_1380.png","IMG_1381.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE).then(()=>Promise.all(EXTRA.map(u=>c.add(u).catch(()=>{}))))));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request).then(hit=>{
    const net=fetch(e.request).then(r=>{if(r&&(r.ok||r.type==="opaque")){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));}return r;}).catch(()=>hit);
    return hit||net;
  }));
});
