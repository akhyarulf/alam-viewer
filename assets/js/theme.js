/* ==========================================================
   Alam Viewer v1.0
   theme.js

   Light / Dark Theme Manager
========================================================== */

"use strict";

const Theme = {

    STORAGE_KEY: "alam-viewer-theme",

    current: "light",

    button: null,

    icon: null,

    initialized: false,

    /* ======================================================
       Init
    ====================================================== */

    init() {

        this.button = document.getElementById("btn-theme");

        if (!this.button) {

            console.warn("Theme button not found.");

            return;

        }

        this.icon = this.button.querySelector("i");

        const saved = Utils.loadLocal(

            this.STORAGE_KEY,

            null

        );

        if (saved) {

            this.current = saved;

        } else {

            this.current = window.matchMedia(

                "(prefers-color-scheme: dark)"

            ).matches

                ? "dark"

                : "light";

        }

        this.apply(this.current);

        this.bindEvents();

        this.initialized = true;

    },

    /* ======================================================
       Bind
    ====================================================== */

    bindEvents() {

        this.button.addEventListener(

            "click",

            () => {

                this.toggle();

            }

        );

        window.matchMedia(

            "(prefers-color-scheme: dark)"

        ).addEventListener(

            "change",

            e => {

                if (

                    Utils.loadLocal(

                        this.STORAGE_KEY,

                        null

                    ) === null

                ) {

                    this.apply(

                        e.matches

                            ? "dark"

                            : "light"

                    );

                }

            }

        );

    },

    /* ======================================================
       Apply Theme
    ====================================================== */

    apply(mode) {

        document.body.classList.remove(

            "light",

            "dark"

        );

        document.body.classList.add(mode);

        this.current = mode;

        Utils.saveLocal(

            this.STORAGE_KEY,

            mode

        );

        this.updateIcon();

        this.updateMetaTheme();

    },

    /* ======================================================
       Toggle
    ====================================================== */

    toggle() {

        if (this.current === "dark") {

            this.apply("light");

        } else {

            this.apply("dark");

        }

    },

    /* ======================================================
       Icon
    ====================================================== */

    updateIcon() {

        if (!this.icon) return;

        if (this.current === "dark") {

            this.icon.className =

                "fa-solid fa-sun";

        } else {

            this.icon.className =

                "fa-solid fa-moon";

        }

    },
	
    /* ======================================================
       Update Browser Theme Color
    ====================================================== */

    updateMetaTheme() {

        const meta = document.querySelector(

            'meta[name="theme-color"]'

        );

        if (!meta) return;

        meta.setAttribute(

            "content",

            this.current === "dark"

                ? "#111827"

                : "#2f855a"

        );

    },

    /* ======================================================
       Getter
    ====================================================== */

    isDark() {

        return this.current === "dark";

    },

    isLight() {

        return this.current === "light";

    },

    /* ======================================================
       Setter
    ====================================================== */

    setDark() {

        this.apply("dark");

    },

    setLight() {

        this.apply("light");

    },

    /* ======================================================
       Reset
    ====================================================== */

    reset() {

        localStorage.removeItem(

            this.STORAGE_KEY

        );

        this.current = window.matchMedia(

            "(prefers-color-scheme: dark)"

        ).matches

            ? "dark"

            : "light";

        this.apply(this.current);

    }

};


/* ==========================================================
   Export
========================================================== */

window.Theme = Theme;


/* ==========================================================
   DOM Ready
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        Theme.init();

    }

);


/* ==========================================================
   Ready
========================================================== */

console.log(

    "✅ Theme Loaded"

);