import { COOKIE_NAME } from "~~/Globals";

const ALLOWED = [/^\/auth\/*/];

export default defineNuxtRouteMiddleware((to, from) => {
    if (ALLOWED.some((route) => route.test(to.fullPath))) {
        return;
    }

    const cookie = useCookie(COOKIE_NAME);
    if (!cookie || !cookie.value || cookie.value.length <= 0) {
        return navigateTo('/auth');
    }
});
