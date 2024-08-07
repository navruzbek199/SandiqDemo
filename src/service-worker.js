import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

clientsClaim();

precacheAndRoute(window.self.__WB_MANIFEST);

const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
registerRoute(({ request, url }) => {
    if (request.mode !== "navigate") {
        return false;
    }

    if (url.pathname.startsWith("/_")) {
        return false;
    }

    if (url.pathname.match(fileExtensionRegexp)) {
        return false;
    }

    return true;
    // TODO: .env is not working for frontend making backend request
}, createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html"));

registerRoute(
    ({ url }) =>
        url.origin === window.self.location.origin && url.pathname.endsWith(".png"),
    new StaleWhileRevalidate({
        cacheName: "images",
        plugins: [new ExpirationPlugin({ maxEntries: 50 })],
    })
);
window.self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        window.self.skipWaiting();
    }
});
