const CACHE="due-json-sync-20261019-json1";
const STATIC=[
  "./",
  "./index.html",
  "./app.js?v=20261019-json1",
  "./due-data.json",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./favicon.ico"
];

self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(STATIC)));
  self.skipWaiting();
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
  );
  self.clients.claim();
});

async function networkFirst(request){
  try{
    const response=await fetch(request,{cache:"no-store"});
    if(response&&response.ok){
      const cache=await caches.open(CACHE);
      cache.put(request,response.clone());
    }
    return response;
  }catch(err){
    const cached=await caches.match(request,{ignoreSearch:true});
    if(cached)return cached;
    throw err;
  }
}

self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  const url=new URL(event.request.url);
  const networkSensitive=
    event.request.mode==="navigate" ||
    url.pathname.endsWith("/index.html") ||
    url.pathname.endsWith("/app.js") ||
    url.pathname.endsWith("/due-data.json");

  if(networkSensitive){
    event.respondWith(networkFirst(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request,{ignoreSearch:true})
      .then(cached=>cached||fetch(event.request))
  );
});
