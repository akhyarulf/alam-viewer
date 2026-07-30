/* ==========================================================
   Alam Viewer v1.0
   stats.js

   Statistics & Information Module
========================================================== */

"use strict";

const Stats = {

    manifest: null,

    stats: null,

    track: null,

    initialized: false,

    elements: {},

    /* ======================================================
       Init
    ====================================================== */

    init() {

        this.elements = {

            title: document.getElementById("track-title"),

            routeTitle: document.getElementById("track-route"),

            mountain: document.getElementById("mountain"),

            route: document.getElementById("route"),

			distanceInfo: document.getElementById("distance-info"),
			
			gainInfo: document.getElementById("gain-info"),

			lossInfo: document.getElementById("loss-info"),
			
			highestInfo: document.getElementById("highest-info"),

			lowestInfo: document.getElementById("lowest-info")

        };

        this.initialized = true;

    },

    /* ======================================================
       Set Manifest
    ====================================================== */

    setManifest(manifest) {

        if (!this.initialized) {

            this.init();

        }

        this.manifest = manifest || {};

        this.stats = this.manifest.stats || {};

        this.track = this.manifest.track || {};

    },

    /* ======================================================
       Update Header
    ====================================================== */

    updateHeader() {

        Utils.setText(

            this.elements.title,

            this.track.name || "-"

        );

        Utils.setText(

            this.elements.routeTitle,

            `${this.track.mountain || "-"} • ${this.track.route || "-"}`

        );

    },

    /* ======================================================
       Update Track Info
    ====================================================== */

    updateInfo() {

        Utils.setText(

            this.elements.mountain,

            this.track.mountain || "-"

        );

        Utils.setText(

            this.elements.route,

            this.track.route || "-"

        );

		Utils.setText(

			this.elements.distanceInfo,

			Utils.formatDistance(

				this.stats.distance_km || 0

			)

		);

		Utils.setText(

			this.elements.gainInfo,

			Utils.formatElevation(

				this.stats.gain || 0

			)

		);

		Utils.setText(

			this.elements.lossInfo,

			Utils.formatElevation(

				this.stats.loss || 0

			)

		);

		Utils.setText(

			this.elements.highestInfo,

			Utils.formatElevation(

				this.stats.highest || 0

			)

		);

		Utils.setText(

			this.elements.lowestInfo,

			Utils.formatElevation(

				this.stats.lowest || 0

			)

		);
    },

    /* ======================================================
       Update Summary
    ====================================================== */

    updateSummary() {

        document.title =

            this.track.name ||

            "Alam Viewer";

        const description = document.querySelector(

            'meta[name="description"]'

        );

        if (description) {

            description.setAttribute(

                "content",

                `${this.track.name || ""} • ${this.track.mountain || ""} • ${Utils.formatDistance(this.stats.distance_km || 0)}`

            );

        }

    },

    /* ======================================================
       Update All
    ====================================================== */

    update() {

        this.updateHeader();

        this.updateInfo();

        this.updateSummary();

    },
	
    /* ======================================================
       Clear
    ====================================================== */

    clear() {

        this.manifest = null;

        this.stats = null;

        this.track = null;

        Object.values(this.elements).forEach(element => {

            if (!element) return;

            element.textContent = "-";

        });

    },

    /* ======================================================
       Refresh
    ====================================================== */

    refresh(manifest) {

        this.setManifest(manifest);

        this.update();

    },

    /* ======================================================
       Getter
    ====================================================== */

    getManifest() {

        return this.manifest;

    },

    getStats() {

        return this.stats;

    },

    getTrack() {

        return this.track;

    },

    /* ======================================================
       Destroy
    ====================================================== */

    destroy() {

        this.clear();

        this.elements = {};

        this.initialized = false;

    }

};


/* ==========================================================
   Export
========================================================== */

window.Stats = Stats;


/* ==========================================================
   DOM Ready
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        Stats.init();

    }

);


/* ==========================================================
   Ready
========================================================== */

console.log(

    "✅ Stats Module Loaded"

);