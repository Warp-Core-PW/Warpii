// TIME AND DATE
function showDateTime() {
    var hourDiv = document.getElementById("hour");
    var dateDiv = document.getElementById("date");
    var dateDiary = document.getElementById("date2");
  
    var date = new Date();
    var dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var monthNames = ["1","2","3","4","5","6","7","8","9","10","11","12"];
    var dayName = dayList[date.getDay()];
    var monthName = monthNames[date.getMonth()];
    var today = `${dayName} ${date.getDate()}/${monthName}`;
  
    var hour = date.getHours();
    var min = date.getMinutes().toString().padStart(2, '0');
    var sec = date.getSeconds().toString()
    var time = hour + ":" + min + ":"+sec;
    
    hourDiv.innerText = `${time}`;
    dateDiv.innerText = `${today}`;
    dateDiary.innerText = `${today}`;
}
function startDateTime() {
    setInterval(showDateTime, 50);
}

// Disable splash
function disableSplash() {
    document.querySelector('splash').style.opacity = '0';
}
// Example usage
// UI SFX
function zip() {
    bgMusicToggle();
    playSFXMulti(userConfig.sfxVol, ['channel-open.mp3', 'button-select.mp3']);
}

function rm2() {
    playSFX('returntomenu.mp3', userConfig.sfxVol);
    setTimeout(() => {document.body.classList.add("fadeOut");}, 1000);
    setTimeout(() => {window.location.href = "/?skipwarn=true";}, 1500);
}
function update2() {
    playSFX('returntomenu.mp3', userConfig.sfxVol);
    setTimeout(() => {document.body.classList.add("fadeOut");}, 1000);
    setTimeout(() => {window.location.href = "/reset.html";}, 1500);
}

function settingsIn() {
    playSFX('sidemenu.mp3', userConfig.sfxVol);
    setTimeout(() => {document.body.classList.add("fadeOut");}, 0);
    setTimeout(() => {window.location.href = "/settings";}, 1000);
}
const updatetitletext = "<span style='font-weight:bold;font-family:'Lucida Console';font-size:22px;'><span style='color:#FF0000;'>U</span><span style='color:#FFFF00;'>p</span><span style='color:#00FF00;'>d</span><span style='color:#00FEFF;'>a</span><span style='color:#0000FF;'>t</span><span style='color:#FF00FE;'>e</span></span>"
// Startup for loading & warning
function startup(params) {
    // Remove event listener
    document.querySelector('.splash .warning').removeEventListener('click', startup, true)
   
    // If the skip waring is in '?=' of the page, show loading instead.
    if (params == 'skipwarn') {
        setTimeout(() => {
            document.querySelector('.welcomeback').classList.remove('disabled');
            document.querySelector('.warning').classList.add('disabled');
        }, 10);
    // Else, show warning splash.
    } else {
        playSFX(`button-select.mp3`, userConfig.sfxVol)
        document.querySelector('.splash').style.opacity = '0';
    }

    // Wait three seconds & display everything.
    setTimeout(() => {
        // Disable all splashes
        document.querySelector('.splash').classList.add('disabled');
        document.querySelector('.main-menu').classList.remove('disabled');

        // Add fade in
        document.querySelector('.main-menu').style = 'animation: fadeIn .5s;';
        const currentver = localStorage.getItem("cver")
        const latestver = localStorage.getItem("lcver")
        if (currentver != latestver) {
        openPopup("<span style='font-weight:bold;font-family:'Lucida Console';font-size:22px;'><span style='color:#FF0000;'>U</span><span style='color:#FFFF00;'>p</span><span style='color:#00FF00;'>d</span><span style='color:#00FEFF;'>a</span><span style='color:#0000FF;'>t</span><span style='color:#FF00FE;'>e</span></span>","<span style='color:#FF0000;'>An Update has been detected! <br> Please update by going into the Settings and going to Update <br> This is to sync channels to get new ones</span>")

        }
        // Play sound
        playSFX('startup.mp3', userConfig.musicVol);
        bgMusicToggle();
        checkforupdate();
        // Remove animation from main menu
        setTimeout(() => {
            document.querySelector('.main-menu').style = '';
            
        }, 500);
    }, 3000);
}


/**
 * Checks if the current application is running as a Progressive Web App (PWA).
 *
 * @return {boolean} True if the application is running as a PWA, false otherwise.
 */
function ifPWA() {
    return window.matchMedia("(display-mode: standalone)").matches;
}