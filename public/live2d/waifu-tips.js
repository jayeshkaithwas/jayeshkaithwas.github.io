/**
 * DAEMON // 守護  —  live2d config.
 *
 * Audited fork of the upstream widget. Changes from stock:
 *   · All four third-party quote APIs removed (see showHitokoto below).
 *   · Model switching, the quote-source switcher and screenshot capture are
 *     off — this is one character, in-world, not a widget with a settings menu.
 *   · debug and console logging off. The stock config shipped them enabled.
 *   · Paths rebased onto /live2d/ where the assets now live, deduplicated from
 *     the three copies the old site served.
 */
const live2d_settings = {
    'modelUrl': '/live2d',
    'tipsMessage': '/live2d/waifu-tips.json',
    'modelName': 'miku',
    'modelStorage': false,
    'modelRandMode': false,
    'preLoadMotion': true,
    'tryWebp': true,

    'showToolMenu': true,
    'canCloseLive2d': true,             // the kill switch must always exist
    'canSwitchModel': false,            // one model; nothing to switch to
    'canSwitchHitokoto': false,         // the API switcher it controlled is gone
    'canTakeScreenshot': false,
    'canTurnToHomePage': false,         // the site HUD already does this
    'canTurnToAboutPage': false,
    'showVolumeBtn': false,

    'showHitokoto': true,               // now served from this origin only
    'hitokotoAPI': '',
    'showWelcomeMessage': true,
    'showCopyMessage': true,
    'showF12OpenMsg': true,

    'live2dHeight': 420,
    'live2dWidth': 310,
    'waifuMinWidth': '1024px',          // never spawns on phones
    'waifuEdgeSide': 'right:0',

    'debug': false,
    'debugMousemove': false,
    'logMessageToConsole': false,

    'l2dVersion': '2.0.0',
    'homePageUrl': 'https://jayeshkaithwas.github.io',
    'aboutPageUrl': 'https://jayeshkaithwas.github.io/#identity',
    'screenshotCaptureName': 'daemon.png',
}

// 模型列表
const live2d_models = [
    {
        name: 'miku',
        message: 'SDK2.1 official sample 初音ミク <a href="https://www.live2d.com/eula/live2d-free-material-license-agreement_en.html">LICENSE</a>',
        version: 2,
        // Docks right. Without this changePosition() falls through to the branch
        // that clears both edges and the character reverts to the left.
        position: 'right'
    }
]
/****************************************************************************************************/
// SessionStorage LocalStorage 操作
const setSS = (k, v) => {
    try {
        sessionStorage.setItem(k, v);
    } catch (e) {
    }
}
const removeSS = (k) => {
    try {
        sessionStorage.removeItem(k);
    } catch (e) {
    }
}
const getSS = (k) => {
    try {
        return sessionStorage.getItem(k);
    } catch (e) {
        return null
    }
}
const setLS = (k, v) => {
    try {
        localStorage.setItem(k, v);
    } catch (e) {
    }
}
const removeLS = (k) => {
    try {
        localStorage.removeItem(k);
    } catch (e) {
    }
}
const getLS = (k) => {
    try {
        return localStorage.getItem(k);
    } catch (e) {
        return null
    }
}
String.prototype.render = function (context) {
    const tokenReg = /(\\)?{([^{}\\]+)(\\)?}/g;
    return this.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {
            return word.replace('\\', '');
        }
        const variables = token.replace(/\s/g, '').split('.');
        let currentObject = context;
        let i, length, variable;

        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
};
const $$ = (selector) => {
    try {
        const e = document.querySelectorAll(selector);
        if (e.length === 1) {
            return e[0];
        } else
            return Array.from(e);
    } catch (e) {
        console.error(e);
        return null;
    }
}
const re = /x/;
console.log(re);
const live2dId2 = 'live2d2';
const live2dId4 = 'live2d4';
const waifuTips = $$('#waifu-message');
const waifu = $$('#waifu');

function getRandText(text) {
    return Array.isArray(text) ? text[Math.floor(Math.random() * text.length + 1) - 1] : text
}

let timeoutID;

function testWebP() {
    return new Promise(res => {
        const webP = new Image();
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        webP.onload = webP.onerror = () => {
            res(webP.height === 2);
        };
    })
}

function showMessage(text, timeout, flag) {
    if (flag || getSS('waifu-text') === '' || getSS('waifu-text') === null) {
        if (timeoutID) window.clearTimeout(timeoutID);
        if (Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1) - 1];
        if (live2d_settings.logMessageToConsole) console.log('[WaifuTips]', text.replace(/<[^<>]+>/g, ''));
        if (flag) setSS('waifu-text', text);
        waifuTips.style.opacity = 1;
        waifuTips.innerHTML = text;
        if (timeout === undefined) timeout = 5000;
        hideMessage(timeout);
    }
}

function hideMessage(timeout) {
    if (timeout === undefined) timeout = 5000;
    timeoutID = window.setTimeout(function () {
        removeSS('waifu-text');
        waifuTips.style.opacity = 0;
    }, timeout);
}

function changePosition(position) {
    if (position === 'left') {
        $$('.waifu-tool').style.right = 'unset';
        $$('.waifu-tool').style.left = '10px';
        waifu.style.right = 'unset';
        waifu.style.left = live2d_settings.waifuEdgeSide.split(":")[1];
    } else if (position === 'right') {
        $$('.waifu-tool').style.left = 'unset';
        $$('.waifu-tool').style.right = '10px';
        waifu.style.left = 'unset';
        waifu.style.right = live2d_settings.waifuEdgeSide.split(":")[1];
    } else {
        $$('.waifu-tool').style.left = '';
        $$('.waifu-tool').style.right = '';
        waifu.style.left = '';
        waifu.style.right = '';
    }
}

function initModel() {
    /* Load style sheet */
    addStyle(waifuStyle);
    if (getSS('waifuHide') === '1') {
        waifu.classList.add('hide');
        return;
    } else if (window.innerWidth <= Number(live2d_settings.waifuMinWidth.replace('px', ''))) {
        waifu.classList.add('hide');
        return;
    } else {
        waifu.classList.remove('hide');
    }
    /* console welcome message */
    console.log("\u304f__,.\u30d8\u30fd.\u3000\u3000\u3000\u3000/\u3000,\u30fc\uff64 \u3009\n\u3000\u3000\u3000\u3000\u3000\uff3c ', !-\u2500\u2010-i\u3000/\u3000/\u00b4\n\u3000\u3000\u3000 \u3000 \uff0f\uff40\uff70'\u3000\u3000\u3000 L/\uff0f\uff40\u30fd\uff64\n\u3000\u3000 \u3000 /\u3000 \uff0f,\u3000 /|\u3000 ,\u3000 ,\u3000\u3000\u3000 ',\n\u3000\u3000\u3000\uff72 \u3000/ /-\u2010/\u3000\uff49\u3000L_ \uff8a \u30fd!\u3000 i\n\u3000\u3000\u3000 \uff9a \uff8d 7\uff72\uff40\uff84\u3000 \uff9a'\uff67-\uff84\uff64!\u30cf|\u3000 |\n\u3000\u3000\u3000\u3000 !,/7 '0'\u3000\u3000 \u00b40i\u30bd| \u3000 |\u3000\u3000\u3000\n\u3000\u3000\u3000\u3000 |.\u4ece\"\u3000\u3000_\u3000\u3000 ,,,, / |./ \u3000 |\n\u3000\u3000\u3000\u3000 \uff9a'| i\uff1e.\uff64,,__\u3000_,.\u30a4 / \u3000.i \u3000|\n\u3000\u3000\u3000\u3000\u3000 \uff9a'| | / k_\uff17_/\uff9a'\u30fd,\u3000\uff8a.\u3000|\n\u3000\u3000\u3000\u3000\u3000\u3000 | |/i \u3008|/\u3000 i\u3000,.\uff8d |\u3000i\u3000|\n\u3000\u3000\u3000\u3000\u3000\u3000.|/ /\u3000\uff49\uff1a \u3000 \uff8d!\u3000\u3000\uff3c\u3000|\n\u3000\u3000\u3000 \u3000 \u3000 k\u30fd>\uff64\uff8a \u3000 _,.\uff8d\uff64 \u3000 /\uff64!\n\u3000\u3000\u3000\u3000\u3000\u3000 !'\u3008//\uff40\uff34\u00b4', \uff3c \uff40'7'\uff70r'\n\u3000\u3000\u3000\u3000\u3000\u3000 \uff9a'\u30fdL__|___i,___,\u30f3\uff9a|\u30ce\n\u3000\u3000\u3000\u3000\u3000 \u3000\u3000\u3000\uff84-,/\u3000|___./\n\u3000\u3000\u3000\u3000\u3000 \u3000\u3000\u3000'\uff70'\u3000\u3000!_,.:\nLive2D \u770b\u677f\u5a18 v" + live2d_settings.l2dVersion + " / Konata");

    $$(`#${live2dId2}`).setAttribute('height', live2d_settings.live2dHeight);
    $$(`#${live2dId2}`).setAttribute('width', live2d_settings.live2dWidth);
    $$(`#${live2dId4}`).setAttribute('height', live2d_settings.live2dHeight);
    $$(`#${live2dId4}`).setAttribute('width', live2d_settings.live2dWidth);
    if (!live2d_settings.showToolMenu) $$('.waifu-tool').classList.add('hide');
    if (!live2d_settings.canCloseLive2d) $$('.waifu-tool .icon-cross').classList.add('hide');
    if (!live2d_settings.canSwitchModel) $$('.waifu-tool .icon-next').classList.add('hide');
    if (!live2d_settings.canSwitchHitokoto) $$('.waifu-tool .icon-message').classList.add('hide');
    if (!live2d_settings.canTakeScreenshot) $$('.waifu-tool .icon-camera').classList.add('hide');
    if (!live2d_settings.canTurnToHomePage) $$('.waifu-tool .icon-home').classList.add('hide');
    if (!live2d_settings.canTurnToAboutPage) $$('.waifu-tool .icon-about').classList.add('hide');
    if (!live2d_settings.showVolumeBtn) $$('.waifu-tool .icon-volumeup').classList.add('hide') || $$('.waifu-tool .icon-volumedown').classList.add('hide');
    $$('.waifu-tool .icon-next').addEventListener('click', () => loadOtherModel());
    $$('.waifu-tool .icon-home').addEventListener('click', () => window.location = live2d_settings.homePageUrl)
    $$('.waifu-tool .icon-about').addEventListener('click', () => window.open(live2d_settings.aboutPageUrl))
    $$('.waifu-tool .icon-camera').addEventListener('click', () => {
        window.live2dCurrentVersion === 3 ? window.live2dv4.CaptureCanvas() : window.live2dv2.captureFrame = true;
    });
    $$('.waifu-tool .icon-cross').addEventListener('click', () => {
        sessionStorage.setItem('waifuHide', '1');
        window.setTimeout(function () {
            waifu.classList.add('hide');
            // document.getElementById('show-live2d').classList.remove('btnHide');
        }, 1000);
    })

    window.waifuResize = () => {
        if (getSS('waifuHide') !== '1')
            window.innerWidth <= Number(live2d_settings.waifuMinWidth.replace('px', '')) ? waifu.classList.add('hide') : waifu.classList.remove('hide');
    };

    if (live2d_settings.waifuMinWidth !== 'disable') {
        waifuResize();
        window.addEventListener('resize', waifuResize)
    }

    live2d_settings.homePageUrl = live2d_settings.homePageUrl === 'auto' ? window.location.protocol + '//' + window.location.hostname + '/' : live2d_settings.homePageUrl;

    if (live2d_settings.tipsMessage)
        window.fetch(live2d_settings.tipsMessage)
            .then(res => res.json())
            .then(resjson => loadTipsMessage(resjson));

    let modelName = getLS('modelName');

    if (!live2d_settings.modelStorage || modelName == null)
        modelName = live2d_settings.modelName;

    window.live2dv4.setPreLoadMotion(live2d_settings.preLoadMotion);
    window.live2dv2.debug = live2d_settings.debug;
    window.live2dv4.debug = live2d_settings.debug;
    window.live2dv2.debugMousemove = live2d_settings.debug && live2d_settings.debugMousemove;
    window.live2dv4.debugMousemove = live2d_settings.debug && live2d_settings.debugMousemove;
    if (live2d_settings.tryWebp) {
        testWebP().then(r => window.webpReady = r).then(() => {
            if (window.webpReady === true)
                console.log("[WaifuTips] Your browser support WebP format. Try to load WebP texture first.");
            else
                console.log("[WaifuTips] Your browser do not support WebP format.");
            loadModel(modelName);
        });
    } else {
        loadModel(modelName);
    }
}

function loadModel(modelName) {
    if (live2d_settings.modelStorage)
        setLS('modelName', modelName);
    else
        setSS('modelName', modelName);
    live2d_settings.debug && console.log(`[WaifuTips] 加载模型 ${modelName}`);
    let modelVersion = 2;
    // 在配置中找到要加载模型的版本
    for (let model of live2d_models) {
        if (model.name === modelName) {
            modelVersion = model.version;
            changePosition(model.position);
            break;
        }
    }
    // 如果要加载的模型版本不同，先释放之前的SDK并隐藏canvas
    // Guarded: on the very first load live2dCurrentVersion is undefined, which
    // sends this down the v4 branch and calls release() on an SDK that may not
    // be initialised yet — throwing before the canvas is ever shown.
    if (window.live2dCurrentVersion !== undefined && window.live2dCurrentVersion !== modelVersion) {
        try {
            if (window.live2dCurrentVersion === 2) {
                window.live2dv2?.release();
                $$(`#${live2dId2}`).style.display = 'none';
            } else {
                window.live2dv4?.release();
                $$(`#${live2dId4}`).style.display = 'none';
            }
        } catch (e) {
            /* releasing a not-yet-loaded SDK must never block the new model */
        }
    }
    // 根据模型版本选择不同的SDK加载
    if (modelVersion === 2) {
        $$(`#${live2dId2}`).style.display = 'block';
        window.live2dv2.load(live2dId2, `${live2d_settings.modelUrl}/${modelName}/model.json`);
    } else if (window.live2dCurrentVersion === modelVersion) {
        window.live2dv4.change(`${live2d_settings.modelUrl}/${modelName}`, `${modelName}.model3.json`);
    } else {
        $$(`#${live2dId4}`).style.display = 'block';
        window.live2dv4.load(live2dId4, `${live2d_settings.modelUrl}/${modelName}`, `${modelName}.model3.json`);
    }
    window.live2dCurrentVersion = modelVersion;
}

// 读取记忆的模型
function modelStorageGetItem(key) {
    return live2d_settings.modelStorage ? getLS(key) : getSS(key);
}

function loadOtherModel() {
    const modelName = modelStorageGetItem('modelName');
    let modelIndex = 0;
    if (live2d_settings.modelRandMode) {
        modelIndex = Math.floor(Math.random() * live2d_models.length + 1) - 1;
    } else {
        modelIndex = live2d_models.findIndex(modelObj => modelObj.name === modelName)
        if (modelIndex < live2d_models.length - 1)
            modelIndex++;
        else
            modelIndex = 0;
    }
    if (live2d_models[modelIndex].message) showMessage(live2d_models[modelIndex].message, 3000, true);
    loadModel(live2d_models[modelIndex].name);
}


function loadTipsMessage(result) {
    window.waifu_tips = result;

    const mouseenterListener = (e, tips) => {
        e.addEventListener('mouseenter', () => {
            let text = getRandText(tips.text);
            if (text.indexOf("{text}") > 0)
                text = text.replace(/{text}/, e.innerText);
            showMessage(text, 3000);
        });
    }
    const addMouseoverListener = () => {
        for (let tips of result.mouseover) {
            const select = $$(tips.selector);
            if (Array.isArray(select))
                select.forEach(e => mouseenterListener(e, tips));
            else if (select)
                mouseenterListener(select, tips);
            else
                live2d_settings.debug && console.warn(`[WaifuTips] can not found element: ${tips.selector}`)
        }
    }
    const addClickListener = () => {
        for (let tips of result.click) {
            const select = $$(tips.selector);
            if (Array.isArray(select))
                select.forEach(e => e.addEventListener('click', () => {
                    let text = getRandText(tips.text);
                    showMessage(text, 3000, true);
                }))
            else if (select)
                select.addEventListener('click', () => {
                    let text = getRandText(tips.text);
                    showMessage(text, 3000, true);
                })
            else
                live2d_settings.debug && console.warn(`[WaifuTips] can not found element: ${tips.selector}`)
        }
    }
    for (let tips of result.seasons) {
        const now = new Date();
        const after = tips.date.split('-')[0];
        const before = tips.date.split('-')[1] || after;
        if ((after.split('/')[0] <= now.getMonth() + 1 && now.getMonth() + 1 <= before.split('/')[0]) &&
            (after.split('/')[1] <= now.getDate() && now.getDate() <= before.split('/')[1])) {
            let text = getRandText(tips.text);
            if (text.indexOf("{year}") > 0)
                text = text.replace(/{year}/, now.getFullYear());
            showMessage(text, 6000, true);
        }
    }
    if (live2d_settings.showF12OpenMsg) {
        re.toString = function () {
            showMessage(getRandText(result.waifu.console_open_msg), 5000, true);
            return '';
        };
    }
    const addCopyListener = () => {
        if ($$('#articleContent').length !== 0)
            $$('#articleContent').addEventListener('copy', () => (showMessage(getRandText(result.waifu.copy_message), 5000, true)));
    }
    window.showWelcomeMessage = function (result) {
        let text;
        if (window.location.href === live2d_settings.homePageUrl) {
            const now = (new Date()).getHours();
            if (now > 23 || now <= 5) text = getRandText(result.waifu.hour_tips['t23-5']);
            else if (now > 5 && now <= 7) text = getRandText(result.waifu.hour_tips['t5-7']);
            else if (now > 7 && now <= 11) text = getRandText(result.waifu.hour_tips['t7-11']);
            else if (now > 11 && now <= 14) text = getRandText(result.waifu.hour_tips['t11-14']);
            else if (now > 14 && now <= 17) text = getRandText(result.waifu.hour_tips['t14-17']);
            else if (now > 17 && now <= 19) text = getRandText(result.waifu.hour_tips['t17-19']);
            else if (now > 19 && now <= 21) text = getRandText(result.waifu.hour_tips['t19-21']);
            else if (now > 21 && now <= 23) text = getRandText(result.waifu.hour_tips['t21-23']);
            else text = getRandText(result.waifu.hour_tips.default);
        } else {
            // The upstream build sniffed document.referrer and announced which
            // search engine you arrived from, splicing it into the greeting from
            // a 3-slot template. Removed: it leaks the visitor's previous page
            // back at them for no benefit, and the template was already broken
            // by the rewritten copy. One in-world line instead.
            text = getRandText(result.waifu.welcome);
        }
        showMessage(text, 6000);
    };
    if (live2d_settings.showWelcomeMessage) showWelcomeMessage(result);

    const waifu_tips = result.waifu;

    if (live2d_settings.showHitokoto) {
        window.getActed = false;
        window.hitokotoTimer = 0;
        window.hitokotoInterval = false;
        setInterval(function () {
            if (!getActed) ifActed();
            else elseActed();
        }, 1000);
    }
    /* 检测用户活动状态，并在空闲时显示一言 */
    const addHitokotoListener = () => {
        document.addEventListener('mousemove', () => (getActed = true))
        document.addEventListener('keydown', () => (getActed = true))
    }

    if (document.readyState === "interactive" || document.readyState === "complete") {
        addMouseoverListener();
        addClickListener();
        if (live2d_settings.showCopyMessage) addCopyListener();
        if (live2d_settings.showHitokoto) addHitokotoListener();
    } else {
        window.addEventListener("DOMContentLoaded", addMouseoverListener);
        window.addEventListener("DOMContentLoaded", addClickListener);
        if (live2d_settings.showCopyMessage) window.addEventListener("DOMContentLoaded", addCopyListener);
        if (live2d_settings.showHitokoto) window.addEventListener("DOMContentLoaded", addHitokotoListener);
    }

    function ifActed() {
        if (!hitokotoInterval) {
            hitokotoInterval = true;
            hitokotoTimer = window.setInterval(showHitokotoActed, 30000);
        }
    }

    function elseActed() {
        getActed = hitokotoInterval = false;
        window.clearInterval(hitokotoTimer);
    }

    function showHitokotoActed() {
        if (document.visibilityState === 'visible') showHitokoto();
    }

    /**
     * DAEMON // local dialogue only.
     *
     * The upstream widget fetched idle quotes from four third-party endpoints
     * (hitokoto.cn, lwl12.com, fghrsh.net, jinrishici.com) on a 30s timer, one
     * of them carrying the original author's uid. Every one of those has been
     * removed: lines now come from waifu-tips.json, served from this origin.
     * The site makes zero third-party requests.
     */
    let daemonQueue = [];

    function showHitokoto() {
        const pool = (waifu_tips && waifu_tips.daemon_idle) || [];
        if (pool.length === 0) return;

        // Shuffled queue rather than random pick, so a short pool does not
        // repeat the same line twice in a row.
        if (daemonQueue.length === 0) {
            daemonQueue = pool.slice();
            for (let i = daemonQueue.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [daemonQueue[i], daemonQueue[j]] = [daemonQueue[j], daemonQueue[i]];
            }
        }

        showMessage(daemonQueue.pop(), 5000, true);
    }

    $$('.waifu-tool .icon-message').addEventListener('click', () => showHitokoto());
}

const addStyle = (() => {
    const style = document.createElement('style');
    document.head.append(style);
    return (styleString) => style.textContent = styleString;
})();

const blobDownload = (blob) => {
    if (typeof blob == 'object' && blob instanceof Blob) {
        blob = URL.createObjectURL(blob); // 创建blob地址
    }
    const aLink = document.createElement('a');
    aLink.href = blob;
    aLink.download = live2d_settings.screenshotCaptureName || 'live2d.png'; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    let event;
    if (window.MouseEvent) event = new MouseEvent('click');
    else {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
}

const waifuStyle = `
#waifu {
${live2d_settings.waifuEdgeSide}px;
position:fixed;
bottom:0;
z-index:998;
font-size:0
}

/* Restyled for the paper palette: a printed tag, not a chat bubble.
   The stock rule used fit-content + ellipsis, so a long line stretched across
   the whole hero on a single row. Wrapping and a max-width fix that. */
#waifu-message {
font-family:var(--font-martian),ui-monospace,Menlo,monospace;
font-size:0.6875rem;
line-height:1.5;
letter-spacing:0.02em;
width:max-content;
max-width:17rem;
white-space:normal;
height:auto;
right:0;left:auto;margin-left:auto;
top:0;
opacity:0;
z-index:998;
margin:0 12px 10px auto;
padding:10px 12px;
border:2px solid var(--color-ink,#14120e);
border-left:6px solid var(--color-burnt,#c2410c);
border-radius:0;
background-color:var(--color-paper,#f2efe6);
color:var(--color-ink,#14120e);
box-shadow:4px 4px 0 color-mix(in srgb,var(--color-ink,#14120e) 16%,transparent);
overflow:hidden;
position:relative;
transition:opacity .3s ease
}

#waifu-message>a {
color:#c2410c;
}

#live2d2,#live2d4 {
position:relative;
display:none;
z-index:997
}

.waifu-tool {
display:none;
color:var(--color-ink,#14120e);
top:60px !important;
${live2d_settings.waifuEdgeSide.split(":")[0]}:10px;
position:absolute;
z-index:998
}

#waifu:hover > .waifu-tool {
display:block
}

.waifu-tool > span {
font-family:"waifuico"!important;
display:block;
cursor:pointer;
color:var(--color-ink,#14120e);
transition:.2s;
font-size:18px;
font-style:normal;
-webkit-font-smoothing:antialiased;
-moz-osx-font-smoothing:grayscale
}

.waifu-tool > span:hover {
color:#c2410c
}

.waifu-tool > .icon-next:before{padding-left:1px;content:"\\e6ba"}.waifu-tool > .icon-message:before{content:"\\e632"}.waifu-tool > .icon-cross:before{content:"\\e606"}.waifu-tool > .icon-about:before{content:"\\e60c"}.waifu-tool > .icon-home:before{content:"\\e604"}.waifu-tool > .icon-camera:before{content:"\\e635"}.waifu-tool > .icon-volumedown:before{content:"\\e6c2"}.waifu-tool > .icon-volumeup:before{content:"\\e6c3"}#waifu.hide,.waifu-tool > span.hide{display:none}@font-face{font-family:"waifuico";src:url(data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAWcAAsAAAAAC0gAAAVNAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCEAgqIVIcCATYCJAMkCxQABCAFhG0HchuYCVGUT06K7OeB7R6lCBOgbWnZzIYDWz+EMHANCwis4uG/tdf7dmbx/wC6VAGqgCuhAwBFIEwVsNJVwEb21LKO3q1lyz+tCZvx3+UrWlPV795l73pusllKVXgcRqIMCNk9wkGaA/IP1K2mWg6WmlnR1Qqa7lwLoaYD/FpfOAE/f7i06QU2n2W5rPV/cy2K44ACGrcnLqDD0wI/YTkL68xspUBnvQo9T6CzQkdr1/bhCczKuDJQdj1LDMwmDHIFPTTqquDavDGelJricfGKl+7w8d98zFIoE/6iA9e2Ylj9lX1P9TmTXns0nA3bm0jYCGTiTaHjmRQkNprQnXOzC8C4sE0w1P4qQ/OWvPO97zOkb72kik5d+CcPlJKsUAm1hqhw1ZCot5MNv7LiUvKr4pL4NVSqQvPQKYCWoNQMvYNOAH2DTg30HQ0a0JprJoEpEPsB4i2ON7lEyOJpoGWF9Uoz6iBtQmEZSR0YgyVVYPFeOIPN3GSY5uUOTjKmlLks4xwO30ihSfCIyrtB4/PlZurwHsUBoelpYahQGMsORi9mnmOcZ53Fz4BQ8IuaCKZRdi7BW+cZ52Szpw+ehI6b5uVwWNcZJrl5XEaG4Bld+DyO/5TGe5LbP7LAWhojkRiji8z5YcW4eTbOYXEZBO3YphYFXCQmlfO4fOOcAZytB5LH1+1A0uQ5B/DIGQ0gj8ejLuvzhMI4gSALZBJK9MFFEGbOK1D72SB4ZF2DPLFhL3v8OkqZ3MwXCOi1BHU/icfLYxIMLouDs5sWjxhRQR6VjJ+FINpJiKW8dBgVnzyUAzNnYNNHlnYjV2upFMVP6IFi1tXVmW8ihqPPJMWLn3H3seGju3ci3kxPEJTA0jrAQ0fD8Bh6dl1hXf0jKHdKaRsxTzcO0JWMCoNpvbEutxBvrD4E64xscguymJWl87Zjuz13sbN3o1/REc9hj2HPEfRfUA14VOUN+7FLSlHD9gF0AN/dJbxQrsdqTB3bWeDw0/XbbtrtD/xvuymCYSI3VzoM07Joq6QFcq1EreSY1AupY67wGmL52IowWn008LOtnCa+PdJrVOzu58O13kDd54MrhoRV1HZxf/zUr1jBGrG7pF/6h14kOo20kntvDF6kSO5t+TgvfqwJSQ/VSg0rQ5KRsjB/bGg60jQ9Ai1DI9N26w1XrItJXd3kYnKRURRvBJG8CHy8T2KLtC/qq2WL2gJ6vtlO77JfPuylAcBR1HTZpJf91SwxeD4oigJToj4caJer06uTaZep061vZt/78dVJJWe2AnU4gB5PDpTgyF6yu7ScXvf3eIak4yE/dIofEGczzzlM3ABqvZvHHD39P3t+ZdNyM/gthH9c/L6TBMMoWrqXvkajeBuRb7kuP60g/JddpNzY5pNEGfo/hx8k0VMSdQi2thsxVqATC3y7PZM+hsUzjVX+THgmgkJtDpLGSmKmboTSwCJUGluhs8HOzQNTxITILdZ7ZBDGvUBh1GdIxr0RM/UdSrN+oTIeE9A5FlP3HFgd2fxOIaMUo73CLOLaSbPO+/IjSkJpJC51jDMSn4Vx2Buk0ztUkwxxgT9PRqoOnXCF2+xlVJaMjXBOkfZS1Wbc77uib+pFXMG8nQQxFIkh6wrKRFjNmeVqPrP/IyQRlAyp6HvmPUOEl62PhnoGDYg7qrpR36XUeucSI0oxB7ltKaugbbKRUiQYaoqPypGI6kk7xBpjfZrnmqp60+PqsV6BDv+YNopIkaOMKupooo1OvkmXOnODvDcJTV0W9tVTFy0Hnb6Xmpwrmr5sqjtz7PwxLkNFMV/Us6E/NAAAAAA=) format("woff2"),url(waifuico.woff?t=1597741284606) format("woff")}@keyframes shake{2%{transform:translate(0.5px,-1.5px) rotate(-0.5deg)}4%{transform:translate(0.5px,1.5px) rotate(1.5deg)}6%{transform:translate(1.5px,1.5px) rotate(1.5deg)}8%{transform:translate(2.5px,1.5px) rotate(0.5deg)}10%{transform:translate(0.5px,2.5px) rotate(0.5deg)}12%{transform:translate(1.5px,1.5px) rotate(0.5deg)}14%{transform:translate(0.5px,0.5px) rotate(0.5deg)}16%{transform:translate(-1.5px,-0.5px) rotate(1.5deg)}18%{transform:translate(0.5px,0.5px) rotate(1.5deg)}20%{transform:translate(2.5px,2.5px) rotate(1.5deg)}22%{transform:translate(0.5px,-1.5px) rotate(1.5deg)}24%{transform:translate(-1.5px,1.5px) rotate(-0.5deg)}26%{transform:translate(1.5px,0.5px) rotate(1.5deg)}28%{transform:translate(-0.5px,-0.5px) rotate(-0.5deg)}30%{transform:translate(1.5px,-0.5px) rotate(-0.5deg)}32%{transform:translate(2.5px,-1.5px) rotate(1.5deg)}34%{transform:translate(2.5px,2.5px) rotate(-0.5deg)}36%{transform:translate(0.5px,-1.5px) rotate(0.5deg)}38%{transform:translate(2.5px,-0.5px) rotate(-0.5deg)}40%{transform:translate(-0.5px,2.5px) rotate(0.5deg)}42%{transform:translate(-1.5px,2.5px) rotate(0.5deg)}44%{transform:translate(-1.5px,1.5px) rotate(0.5deg)}46%{transform:translate(1.5px,-0.5px) rotate(-0.5deg)}48%{transform:translate(2.5px,-0.5px) rotate(0.5deg)}50%{transform:translate(-1.5px,1.5px) rotate(0.5deg)}52%{transform:translate(-0.5px,1.5px) rotate(0.5deg)}54%{transform:translate(-1.5px,1.5px) rotate(0.5deg)}56%{transform:translate(0.5px,2.5px) rotate(1.5deg)}58%{transform:translate(2.5px,2.5px) rotate(0.5deg)}60%{transform:translate(2.5px,-1.5px) rotate(1.5deg)}62%{transform:translate(-1.5px,0.5px) rotate(1.5deg)}64%{transform:translate(-1.5px,1.5px) rotate(1.5deg)}66%{transform:translate(0.5px,2.5px) rotate(1.5deg)}68%{transform:translate(2.5px,-1.5px) rotate(1.5deg)}70%{transform:translate(2.5px,2.5px) rotate(0.5deg)}72%{transform:translate(-0.5px,-1.5px) rotate(1.5deg)}74%{transform:translate(-1.5px,2.5px) rotate(1.5deg)}76%{transform:translate(-1.5px,2.5px) rotate(1.5deg)}78%{transform:translate(-1.5px,2.5px) rotate(0.5deg)}80%{transform:translate(-1.5px,0.5px) rotate(-0.5deg)}82%{transform:translate(-1.5px,0.5px) rotate(-0.5deg)}84%{transform:translate(-0.5px,0.5px) rotate(1.5deg)}86%{transform:translate(2.5px,1.5px) rotate(0.5deg)}88%{transform:translate(-1.5px,0.5px) rotate(1.5deg)}90%{transform:translate(-1.5px,-0.5px) rotate(-0.5deg)}92%{transform:translate(-1.5px,-1.5px) rotate(1.5deg)}94%{transform:translate(0.5px,0.5px) rotate(-0.5deg)}96%{transform:translate(2.5px,-0.5px) rotate(-0.5deg)}98%{transform:translate(-1.5px,-1.5px) rotate(-0.5deg)}0%,100%{transform:translate(0,0) rotate(0)}}
`;
initModel();
window.downloadCap = blobDownload;
window.initModel = initModel;
export {showMessage, initModel}
