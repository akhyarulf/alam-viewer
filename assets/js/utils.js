/* ==========================================================
   Alam Viewer v1.0
   utils.js

   Global Utility Functions

   Digunakan oleh:
   - app.js
   - map.js
   - chart.js
   - stats.js
   - download.js
   - theme.js
   - waypoint.js

========================================================== */

"use strict";

/* ==========================================================
   DOM
========================================================== */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


/* ==========================================================
   Element Creator
========================================================== */

function createElement(tag, className = "", html = "") {

    const el = document.createElement(tag);

    if (className)
        el.className = className;

    if (html)
        el.innerHTML = html;

    return el;

}


/* ==========================================================
   Text
========================================================== */

function setText(target, value = "-") {

    let el = target;

    // jika dikirim string -> cari ID
    if (typeof target === "string") {

        el = document.getElementById(target);

    }

    // jika element tidak ada
    if (!el) return;

    el.textContent = value;

}


/* ==========================================================
   HTML
========================================================== */

function setHTML(id, html = "") {

    const el = document.getElementById(id);

    if (!el) return;

    el.innerHTML = html;

}


/* ==========================================================
   Show / Hide
========================================================== */

function show(el){

    if(typeof el==="string")
        el=$(el);

    if(!el) return;

    el.classList.remove("hidden");

}

function hide(el){

    if(typeof el==="string")
        el=$(el);

    if(!el) return;

    el.classList.add("hidden");

}


/* ==========================================================
   Toggle
========================================================== */

function toggle(el){

    if(typeof el==="string")
        el=$(el);

    if(!el) return;

    el.classList.toggle("hidden");

}


/* ==========================================================
   Number Formatter
========================================================== */

function formatNumber(number){

    if(number===undefined) return "-";

    if(number===null) return "-";

    return Number(number).toLocaleString("id-ID");

}


/* ==========================================================
   Decimal
========================================================== */

function formatDecimal(number,digit=2){

    if(number===undefined) return "-";

    if(number===null) return "-";

    return Number(number).toFixed(digit);

}


/* ==========================================================
   Distance
========================================================== */

function formatDistance(km){

    if(km===undefined) return "-";

    return `${Number(km).toFixed(2)} km`;

}


/* ==========================================================
   Elevation
========================================================== */

function formatElevation(m){

    if(m===undefined) return "-";

    return `${Math.round(m)} m`;

}

/* ==========================================================
   Fetch JSON
========================================================== */

async function fetchJSON(url){

    const response = await fetch(url,{

        cache:"no-cache"

    });

    if(!response.ok){

        throw new Error(
            `HTTP ${response.status}`
        );

    }

    return await response.json();

}


/* ==========================================================
   Current Route ID

   Priority:
   1. ?route=
   2. data-route
   3. CONFIG.defaultRoute
========================================================== */

function getRouteID(){

    const params=new URLSearchParams(

        window.location.search

    );

    const query=params.get("route");

    if(query){

        return query.trim();

    }

    const viewer=document.getElementById("viewer");

    if(

        viewer &&

        viewer.dataset.route

    ){

        return viewer.dataset.route;

    }

    return CONFIG.defaultRoute;

}


/* ==========================================================
   Manifest URL
========================================================== */

function getManifestURL(route){

    return `${CONFIG.dataBase}/${route}/manifest.json`;

}


/* ==========================================================
   Track JSON URL
========================================================== */

function getTrackURL(route){

    return `${CONFIG.dataBase}/${route}/track.json`;

}


/* ==========================================================
   GeoJSON URL
========================================================== */

function getGeoJSONURL(route){

    return `${CONFIG.dataBase}/${route}/track.geojson`;

}


/* ==========================================================
   Load Manifest
========================================================== */

async function loadManifest(route){

    const url=getManifestURL(route);

    return await fetchJSON(url);

}


/* ==========================================================
   Load Track JSON
========================================================== */

async function loadTrack(route){

    const url=getTrackURL(route);

    return await fetchJSON(url);

}


/* ==========================================================
   Load GeoJSON
========================================================== */

async function loadGeoJSON(route){

    const url=getGeoJSONURL(route);

    return await fetchJSON(url);

}


/* ==========================================================
   Parse Query String
========================================================== */

function getQuery(name){

    const params=new URLSearchParams(

        window.location.search

    );

    return params.get(name);

}


/* ==========================================================
   Sleep

   Useful for loader animation
========================================================== */

function sleep(ms){

    return new Promise(resolve=>{

        setTimeout(resolve,ms);

    });

}

/* ==========================================================
   Debounce

   Prevent repeated execution
========================================================== */

function debounce(fn, delay = 250) {

    let timer = null;

    return function (...args) {

        clearTimeout(timer);

        timer = setTimeout(() => {

            fn.apply(this, args);

        }, delay);

    };

}


/* ==========================================================
   Throttle

   Execute once every x ms
========================================================== */

function throttle(fn, wait = 200) {

    let waiting = false;

    return function (...args) {

        if (waiting) return;

        waiting = true;

        fn.apply(this, args);

        setTimeout(() => {

            waiting = false;

        }, wait);

    };

}


/* ==========================================================
   Clipboard
========================================================== */

async function copyToClipboard(text) {

    try {

        await navigator.clipboard.writeText(text);

        return true;

    } catch (err) {

        console.error(err);

        return false;

    }

}


/* ==========================================================
   Download File
========================================================== */

function downloadFile(url) {

    if (!url) return;

    window.open(url, "_blank");

}


/* ==========================================================
   Fullscreen
========================================================== */

function openFullscreen(element = document.documentElement) {

    if (element.requestFullscreen) {

        element.requestFullscreen();

    } else if (element.webkitRequestFullscreen) {

        element.webkitRequestFullscreen();

    } else if (element.msRequestFullscreen) {

        element.msRequestFullscreen();

    }

}

function closeFullscreen() {

    if (document.exitFullscreen) {

        document.exitFullscreen();

    } else if (document.webkitExitFullscreen) {

        document.webkitExitFullscreen();

    } else if (document.msExitFullscreen) {

        document.msExitFullscreen();

    }

}

function isFullscreen() {

    return !!document.fullscreenElement;

}


/* ==========================================================
   Local Storage
========================================================== */

function saveLocal(key, value) {

    localStorage.setItem(

        key,

        JSON.stringify(value)

    );

}

function loadLocal(key, fallback = null) {

    try {

        const value = localStorage.getItem(key);

        return value ? JSON.parse(value) : fallback;

    } catch {

        return fallback;

    }

}

function removeLocal(key) {

    localStorage.removeItem(key);

}


/* ==========================================================
   Theme Helper
========================================================== */

function isDarkMode() {

    return document.body.classList.contains("dark");

}


/* ==========================================================
   Random ID
========================================================== */

function uuid() {

    return Math.random()

        .toString(36)

        .substring(2, 10);

}


/* ==========================================================
   Timestamp
========================================================== */

function now() {

    return Date.now();

}

/* ==========================================================
   Event Helpers
========================================================== */

function on(target, event, callback, options = false) {

    if (!target) return;

    target.addEventListener(

        event,

        callback,

        options

    );

}

function off(target, event, callback) {

    if (!target) return;

    target.removeEventListener(

        event,

        callback

    );

}

function once(target, event, callback) {

    if (!target) return;

    target.addEventListener(

        event,

        callback,

        { once: true }

    );

}


/* ==========================================================
   Coordinate Formatter
========================================================== */

function formatCoordinate(value) {

    if (value === undefined || value === null)

        return "-";

    return Number(value).toFixed(6);

}


/* ==========================================================
   Bounds
========================================================== */

function createBounds(stats) {

    if (!stats || !stats.bbox)

        return null;

    return [

        [

            stats.bbox.min_lat,

            stats.bbox.min_lng

        ],

        [

            stats.bbox.max_lat,

            stats.bbox.max_lng

        ]

    ];

}


/* ==========================================================
   Center
========================================================== */

function getCenter(stats) {

    if (!stats || !stats.center)

        return [

            -7.9,

            112.48

        ];

    return [

        stats.center.lat,

        stats.center.lng

    ];

}


/* ==========================================================
   Elevation Array
========================================================== */

function getElevationArray(track) {

    if (!track)

        return [];

    if (!track.geometry)

        return [];

    return track.geometry.map(point =>

        point.ele ?? 0

    );

}


/* ==========================================================
   Distance Array
========================================================== */

function getDistanceArray(track) {

    if (!track)

        return [];

    if (!track.geometry)

        return [];

    return track.geometry.map(point =>

        point.distance ?? 0

    );

}


/* ==========================================================
   Error Helper
========================================================== */

function showError(message) {

    console.error(message);

    alert(message);

}


/* ==========================================================
   Toast
========================================================== */

function toast(message) {

    console.log(message);

}


/* ==========================================================
   Export Global
========================================================== */

window.Utils = {

    $,
    $$,

    createElement,

    setText,
    setHTML,

    show,
    hide,
    toggle,

    formatNumber,
    formatDecimal,
    formatDistance,
    formatElevation,
    formatCoordinate,

    fetchJSON,

    getRouteID,

    getManifestURL,
    getTrackURL,
    getGeoJSONURL,

    loadManifest,
    loadTrack,
    loadGeoJSON,

    getQuery,

    sleep,

    debounce,
    throttle,

    copyToClipboard,

    downloadFile,

    openFullscreen,
    closeFullscreen,
    isFullscreen,

    saveLocal,
    loadLocal,
    removeLocal,

    isDarkMode,

    uuid,
    now,

    on,
    off,
    once,

    createBounds,
    getCenter,

    getElevationArray,
    getDistanceArray,

    showError,
    toast

};

console.log(

    "✅ Utils Loaded"

);