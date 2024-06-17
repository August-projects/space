// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
"use strict";

//side nav
var side = document.querySelector("nav").innerHTML;
document.querySelector("header").insertAdjacentHTML('beforeend', side);

//header
document.querySelectorAll("nav li, header>ul li").forEach(function (li) {
  li.addEventListener("click", function () {
    var menu = Array.from(document.querySelectorAll('nav li')).indexOf(this);
    if (menu < 0) {
      menu = Array.from(document.querySelectorAll('header>ul li')).indexOf(this);
    }
    var move = document.querySelectorAll('section')[menu].offsetTop;
    window.scroll({
      top: move,
      left: 0,
      behavior: "smooth"
    });
    return false;
  });
});

//ufo
setInterval(function () {
  var x = Math.ceil(Math.random() * 100);
  var y = Math.ceil(Math.random() * 100);
  var sloganUfo = document.querySelector(".ufo");
  sloganUfo.style.left = x + "%";
  sloganUfo.style.top = y + "%";
}, 500);

//typing text
function typingEffect(elementSector) {
  var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
  var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 30;
  var element = document.querySelector(elementSector);
  var text = element.innerHTML;
  var textNum = 0;
  var tag = false;
  var typingEffect = setInterval(function () {
    textNum++;
    if (text[textNum] === "<") tag = true;
    if (text[textNum] === ">") tag = false;
    if (!tag) {
      var typing = text.substring(0, textNum);
      element.innerHTML = typing;
    }
    if (textNum > text.length + delay) {
      textNum = 0;
    }
  }, interval);
}
typingEffect(".sloganT", 200, 30);
typingEffect(".about h2", 200, 30);
typingEffect(".portfolio h2", 200, 30);

//mouse interaction
function move_bg(element, x, y, speed) {
  element.style.margin = y * speed + "px 0 0 " + x * speed + "px";
}
window.addEventListener('mousemove', function (e) {
  var x = e.clientX - window.innerWidth / 2;
  var y = e.clientY - window.innerHeight / 2;
  var bgElements = document.querySelector('.orbit');
  if (bgElements) move_bg(bgElements, x, y, 0.1);
});

//skills button
document.querySelector(".profile button").addEventListener("click", function () {
  document.querySelector(".profile + details").classList.toggle("on");
});
;

//portfolio category
var category = document.querySelectorAll(".portfolio>.wrap button");
var article = document.querySelectorAll(".portfolio article>ul>li");
category.forEach(function (e) {
  e.addEventListener("click", function () {
    var categoryIndex = Array.from(category).indexOf(this);
    var showTheArticle = e.textContent.toLocaleLowerCase();
    document.querySelector(".portfolio>.wrap .on").classList.remove("on");
    category[categoryIndex].classList.add("on");
    article.forEach(function (element) {
      if (element.classList.contains(showTheArticle)) {
        element.style.display = "block";
        element.classList.add("on");
      } else {
        element.style.display = "none";
        element.classList.remove("on");
      }
    });
    article.forEach(function (element) {
      if (element.classList.contains(showTheArticle)) {
        element.classList.add("on");
      } else {
        element.classList.remove("on");
      }
    });
  });
});

//mouse interaction of img in web portfolio
var links = document.querySelectorAll(".cording a");
links.forEach(function (links) {
  var webImg = links.querySelectorAll(".cording-img");
  var initialTransform = getComputedStyle(webImg[0]).getPropertyValue('transform');
  webImg.forEach(function (webImg) {
    links.addEventListener("mousemove", function (e) {
      var offsetX = e.offsetX,
        offsetY = e.offsetY;
      webImg.style.transform = "translate(-".concat(offsetX / 2, "px, ").concat(offsetY / 2, "px)");
      webImg.classList.remove('hidden');
    });
    links.addEventListener("mouseleave", function () {
      webImg.style.transform = initialTransform;
      webImg.classList.add("hidden");
    });
  });
});

//modal pop up in design portfolio
var designClick = document.querySelectorAll(".design>ul>li");
var designDetails = document.querySelectorAll(".design details");
var backDrop = document.querySelector(".back-drop");
var detailIndex = 0;
//open
designClick.forEach(function (clicking, index) {
  clicking.addEventListener("click", function () {
    detailIndex = index;
    designDetails[detailIndex].classList.add("on");
    backDrop.classList.add("on");
    document.body.classList.add("no-scroll");
  });
});
//close
backDrop.addEventListener("click", function () {
  var video = document.querySelector(".design details.on video");
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
  document.querySelector(".design details.on").classList.remove("on");
  backDrop.classList.remove("on");
  document.body.classList.remove("no-scroll");
});

//scrollevent
window.addEventListener("scroll", function () {
  var t = window.scrollY;
  var h = window.innerHeight / 2;
  var menus = document.querySelectorAll('section');
  var menu2 = menus[1].offsetTop - h;
  var menu3 = menus[2].offsetTop - h;
  var menu4 = menus[3].offsetTop - h;

  //article merit
  var merit = document.querySelector(".merit");
  var meritHeight = merit.offsetTop - h;
  var headerOn = document.querySelector("header>ul .on");
  var svgOn = document.querySelectorAll(".merit .on");
  if (headerOn) {
    headerOn.classList.remove("on");
  }
  if (t >= 0 && t < menu2) {
    document.querySelector("header>ul li:nth-of-type(1)").classList.add("on");
  } else if (t >= menu2 && t < menu3) {
    document.querySelector("header>ul li:nth-of-type(2)").classList.add("on");
    document.querySelector(".profile img").classList.add("on");
    document.querySelector(".profile h3").classList.add("on");
    document.querySelector(".profile ul").classList.add("on");
    document.querySelector(".profile button").classList.add("on");
    document.querySelector(".study>h3").classList.add("on");
    var studyHeight = document.querySelector(".study").offsetTop - h;
    if (t >= studyHeight) {
      document.querySelectorAll(".card").forEach(function (card) {
        card.classList.add("in");
      });
    } else {
      document.querySelector(".study>h3").classList.remove("on");
      document.querySelectorAll(".card").forEach(function (card) {
        card.classList.remove("in");
      });
    }
    if (t >= meritHeight && t < menu3) {
      document.querySelector(".merit svg").classList.add("on");
      document.querySelectorAll(".merit .path").forEach(function (element) {
        element.classList.add("on");
      });
      var goods = document.querySelectorAll(".good");
      var goodArray = [];
      var numGoods = goods.length;
      for (var j = 0; j < numGoods; j++) {
        goodArray[j] = goods[j].offsetTop - h;
        if (t >= goodArray[j]) {
          goods[j].classList.add("on");
        }
      }
    } else {
      document.querySelector(".merit svg").classList.remove("on");
      document.querySelectorAll(".merit .path").forEach(function (element) {
        element.classList.remove("on");
      });
      document.querySelectorAll(".good").forEach(function (e) {
        e.classList.remove("on");
      });
    }
    var categoryOn = document.querySelector(".portfolio > .wrap.on");
    if (categoryOn) {
      categoryOn.classList.remove("on");
    }
    var portfolioOn = document.querySelectorAll(".portfolio article .on");
    if (portfolioOn) {
      portfolioOn.forEach(function (e) {
        e.classList.remove("on");
      });
    }
  } else if (t >= menu3 && t < menu4) {
    document.querySelector("header>ul li:nth-of-type(3)").classList.add("on");
    document.querySelector(".merit svg").classList.remove("on");
    document.querySelectorAll(".merit .path").forEach(function (element) {
      element.classList.remove("on");
    });
    document.querySelector(".portfolio>.wrap").classList.add("on");
    var _categoryOn = document.querySelector(".category button.on").textContent.toLocaleLowerCase();
    article.forEach(function (element) {
      if (element.classList.contains(_categoryOn)) {
        element.style.display = "block";
        element.classList.add("on");
      } else {
        element.classList.remove("on");
        element.style.display = "none";
      }
    });
  } else {
    document.querySelector("header>ul li:nth-of-type(4)").classList.add("on");
  }
});
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58992" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/space.e31bb0bc.js.map