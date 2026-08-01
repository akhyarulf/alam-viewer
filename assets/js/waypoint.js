/* ==========================================================
   Alam Viewer v1.0
   waypoint.js

   Waypoint Sidebar Manager
   -- render breakdown durasi per ruas (leg) antar waypoint,
      bukan cuma daftar titik.
========================================================== */

"use strict";

const WaypointManager = {

    container: null,

    points: [],
    legs: [],

    initialized: false,

    /* ======================================================
       Init
    ====================================================== */

    init() {

        this.container = document.getElementById("waypoint-list");

        this.initialized = true;

    },

    /* ======================================================
       Set Data
    ====================================================== */

    setData(points = [], legs = []) {

        if (!this.initialized) {
            this.init();
        }

        this.points = Array.isArray(points) ? points : [];
        this.legs = Array.isArray(legs) ? legs : [];

    },

    /* ======================================================
       Render
    ====================================================== */

    render() {

        if (!this.container) return;

        this.container.innerHTML = "";

        if (this.legs.length === 0) {

            this.container.innerHTML = `
                <div class="empty">
                    Belum ada waypoint.
                </div>
            `;

            return;
        }

        this.legs.forEach((leg, index) => {
            this.container.appendChild(this.createLegItem(leg, index));
        });

    },

    /* ======================================================
       Cari koordinat waypoint berdasar nama (buat fly-to)
    ====================================================== */

    findPoint(name) {
        return this.points.find(p => (p.name || p.title) === name);
    },

    /* ======================================================
       Create Leg Item
    ====================================================== */

    createLegItem(leg, index) {

        const item = document.createElement("div");
        item.className = "waypoint";

        const duration =
            window.Utils
                ? `${Utils.formatDuration(leg.duration_minutes_low)} - ${Utils.formatDuration(leg.duration_minutes_high)}`
                : `${leg.duration_minutes_low} - ${leg.duration_minutes_high} menit`;

        const distance =
            leg.distance_km !== undefined && leg.distance_km !== null
                ? `${Number(leg.distance_km).toFixed(2)} km`
                : "-";

        item.innerHTML = `
            <div class="waypoint-dot"></div>
            <div class="waypoint-content">
                <div class="waypoint-title">
                    ${leg.from} &rarr; ${leg.to}
                </div>
                <div class="waypoint-subtitle">
                    ${distance} &nbsp;&bull;&nbsp; ${duration}
                </div>
            </div>
        `;

        item.addEventListener("click", () => {
            this.focus(leg, index);
        });

        return item;

    },

    /* ======================================================
       Focus (fly-to titik tujuan leg ini)
    ====================================================== */

    focus(leg, index) {

        this.highlight(index);

        const target = this.findPoint(leg.to);

        if (
            target &&
            window.MapViewer &&
            typeof MapViewer.flyTo === "function"
        ) {
            MapViewer.flyTo(target.lat, target.lng, 16);
        }

    },

    /* ======================================================
       Highlight Active Item
    ====================================================== */

    highlight(index) {

        if (!this.container) return;

        this.container
            .querySelectorAll(".waypoint")
            .forEach(el => el.classList.remove("active"));

        const active = this.container.children[index];

        if (active && active.classList.contains("waypoint")) {
            active.classList.add("active");
        }

    },

    /* ======================================================
       Refresh
    ====================================================== */

    refresh(points, legs) {

        this.setData(points, legs);

        this.render();

    },

    /* ======================================================
       Clear
    ====================================================== */

    clear() {

        this.points = [];
        this.legs = [];

        if (this.container) {

            this.container.innerHTML = `
                <div class="empty">
                    Belum ada waypoint.
                </div>
            `;

        }

    },

    /* ======================================================
       Count
    ====================================================== */

    count() {
        return this.legs.length;
    },

    /* ======================================================
       Destroy
    ====================================================== */

    destroy() {

        this.clear();

        this.container = null;

        this.initialized = false;

    }

};


/* ==========================================================
   Export
========================================================== */

window.WaypointManager = WaypointManager;


/* ==========================================================
   DOM Ready
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    WaypointManager.init();
});


console.log("Waypoint Module Loaded");
