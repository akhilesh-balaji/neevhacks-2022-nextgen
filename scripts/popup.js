(function() {
    var storage = chrome.storage;

    function updateOnButton() {
        var onButton = document.getElementById("onButton");

        storage.local.get("on", function(item) {
            if (item.on === true) {
                onButton.innerText = "Deactivate";
            } else {
                onButton.innerText = "Activate";
            }
        });
    }

    function updateIcon() {
        storage.local.get("on", function(item) {
            if (item.on === true) {
                chrome.browserAction.setIcon({ "path": "images/icon.png" });
            } else {
                chrome.browserAction.setIcon({ "path": "images/icon.png" });
            }
        });
    }

    function onButtonClick() {
        storage.local.get(["on", "blocked"], function(item) {
            console.log(item.on);
            var on;

            if (item.on === undefined || item.on === false) {
                on = true;
            } else {
                on = false;
            }

            storage.local.set({ "on": on, "blocked": 0 });

            updateOnButton();
            updateIcon();
        });
    }

    function optionsButtonClick() {
        chrome.tabs.create({ "url": "settings.html" });
    }

    function updateAttempts() {
        var nbAttempts = 0;

        storage.local.get("blocked", function(item) {
            if (item.blocked !== undefined) {
                nbAttempts = item.blocked;
            }

            var number = document.getElementsByTagName("number")[0];
            number.innerText = nbAttempts;
        });
    }

    updateAttempts();
    updateOnButton();
    updateIcon();

    var onButton = document.getElementById("onButton");
    var optionsButton = document.getElementById("optionsButton");

    onButton.addEventListener("click", onButtonClick);
    optionsButton.addEventListener("click", optionsButtonClick);
})();