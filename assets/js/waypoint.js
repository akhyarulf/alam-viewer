/* ==========================================================
   Alam Viewer v1.0
   waypoint.js

   Waypoint Sidebar Manager
========================================================== */

"use strict";

const WaypointManager = {

    container: null,

    waypoints: [],

    initialized: false,

    /* ======================================================
       Init
    ====================================================== */

    init() {

        this.container = document.getElementById(

            "waypoint-list"

        );

        this.initialized = true;

    },

    /* ======================================================
       Set Waypoints
    ====================================================== */

    setWaypoints(waypoints = []) {

        if (!this.initialized) {

            this.init();

        }

        if (!Array.isArray(waypoints)) {

            this.waypoints = [];

            return;

        }

        this.waypoints = waypoints;

    },

    /* ======================================================
       Render
    ====================================================== */

    render() {

        if (!this.container) {

            return;

        }

        this.container.innerHTML = "";

        if (this.waypoints.length === 0) {

            this.container.innerHTML = `

                <div class="empty">

                    Belum ada waypoint.

                </div>

            `;

            return;

        }

        this.waypoints.forEach(

            (waypoint, index) => {

                this.container.appendChild(

                    this.createItem(

                        waypoint,

                        index

                    )

                );

            }

        );

    },

    /* ======================================================
       Create Item
    ====================================================== */

    createItem(wp, index) {

        const item = document.createElement(

            "div"

        );

        item.className =

            "waypoint-item";

        const title =

            wp.name ||

            wp.title ||

            `Waypoint ${index + 1}`;

        const elevation =

            wp.ele ??

            wp.elevation ??

            "-";

        item.innerHTML = `

            <div class="waypoint-title">

                ${title}

            </div>

            <div class="waypoint-meta">

                Elevasi ${elevation} m

            </div>

        `;

        item.addEventListener(

            "click",

            () => {

                this.focus(

                    wp,

                    index

                );

            }

        );

        return item;

    },
	
    /* ======================================================
       Focus Waypoint
    ====================================================== */

    focus(wp, index) {

        this.highlight(index);

        if (

            window.MapViewer &&

            typeof MapViewer.flyTo === "function"

        ) {

            MapViewer.flyTo(

                wp.lat,

                wp.lng,

                16

            );

        }

        console.log(

            `📍 Waypoint ${index + 1}`,

            wp.name || ""

        );

    },

    /* ======================================================
       Highlight Active Item
    ====================================================== */

    highlight(index) {

        if (!this.container) return;

        this.container

            .querySelectorAll(

                ".waypoint-item"

            )

            .forEach(

                el => el.classList.remove(

                    "active"

                )

            );

        const active = this.container.children[index];

        if (

            active &&

            active.classList.contains(

                "waypoint-item"

            )

        ) {

            active.classList.add(

                "active"

            );

        }

    },

    /* ======================================================
       Refresh
    ====================================================== */

    refresh(waypoints) {

        this.setWaypoints(

            waypoints

        );

        this.render();

    },

    /* ======================================================
       Add Waypoint
    ====================================================== */

    add(wp) {

        this.waypoints.push(

            wp

        );

        this.render();

    },

    /* ======================================================
       Remove Waypoint
    ====================================================== */

    remove(index) {

        if (

            index < 0 ||

            index >= this.waypoints.length

        ) {

            return;

        }

        this.waypoints.splice(

            index,

            1

        );

        this.render();

    },

    /* ======================================================
       Getter
    ====================================================== */

    getAll() {

        return this.waypoints;

    },

    get(index) {

        return this.waypoints[index];

    },
	
    /* ======================================================
       Clear
    ====================================================== */

    clear() {

        this.waypoints = [];

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

        return this.waypoints.length;

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

document.addEventListener(

    "DOMContentLoaded",

    () => {

        WaypointManager.init();

    }

);


/* ==========================================================
   Ready
========================================================== */

console.log(

    "✅ Waypoint Module Loaded"

);