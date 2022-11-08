"use strict";

class ExpoLoader {

    /**
     * function showOverlay show over lay on the container during ajax
     * @param {*} obj   Dom object will be pass as a parameter
     * priostatic have to css and html
     */
    showOverlay(obj) {
        let element = this.getOverlayLoaderElement();
        if (obj.children(".prio-overlayloader").length <= 0) {
            obj.addClass(this.getOverlayLoaderClass());
            obj.append(element);
        }
    }

    /**
     * function hideOverlay hide over lay on the container during ajax
     * @param {*} obj   Dom object will be pass as a parameter
     * priostatic have to css and html
     */
    hideOverlay(obj) {
        obj.removeClass(this.getOverlayLoaderClass());
        obj.children(".prio-overlayloader").remove();
    }

    /**
     * function showLoader show loader in the container
     * @param {*} obj   Dom object will be pass as a parameter
     */
    showLoader(obj, action = 'after') {
        if (obj.children("span.expo-loader").length > 0) {
            return false;
        }
        let element = this.getLoaderElement();
        if (action === "before") {
            obj.prepend(element);
        } else {
            obj.append(element);
        }
    }

    /**
    * return overlay loader class
    */
    getOverlayLoaderClass() {
        return "pos-rel";
    }

    /**
    * return overlay loader element to make loader
    */
    getOverlayLoaderElement() {
        var element = document.createElement('div');
        element.setAttribute("class", "prio-overlayloader");
        element.style.position = 'absolute';
        element.style.width = '100%';
        element.style.height = '100%';
        element.style.display = 'flex';
        element.style.alignItems = 'center';
        element.style.justifyContent = 'center';
        element.style.top = 0;
        element.style.left = 0;
        element.style.background = 'rgba(255, 255, 255, 0.7)';
        element.innerHTML = '<div class="text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>';
        return element;
    }

    /**
    * return loader element to make loader
    */
    getLoaderElement() {
        var element = document.createElement('span');
        element.setAttribute("class", "spinner-border spinner-border-sm expo-loader");
        element.setAttribute("role", "status");
        element.setAttribute("aria-hidden", "true");
        element.setAttribute("style", "vertical-align: inherit;position:absolute;");
        return element;
    }

    /**
     * function hideLoader hide loader in the container
     * @param {*} obj   Dom object will be pass as a parameter
     */
    hideLoader(obj) {
        $(obj).children("span.expo-loader").remove();
    }
}

let expoLoader = new ExpoLoader;
