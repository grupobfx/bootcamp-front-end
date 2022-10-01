const btnMenu = () => {
  const $btn = document.querySelector('#menu-toggle');
  $btn.onclick = () => {
    const $wrapper = document.querySelector('#wrapper');
    $wrapper.classList.toggle('toggled');
  };
};

const btnMenu2 = () => {
  const $btn = document.querySelector('#menu-toggle-2');
  $btn.onclick = () => {
    subNivelOcultos();
    const $wrapper = document.querySelector('#wrapper');
    $wrapper.classList.toggle('toggled-2');
  };
};

const subNivelOcultos = () => {
  const $ul = [...document.querySelectorAll('#menu ul')];
  $ul.forEach((ul) => {
    ul.style.display = 'none';
  });
};

function toggleFullScreen() {
  if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
  } else if (document.cancelFullScreen) {
    document.cancelFullScreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

const init = () => {
  subNivelOcultos();
  btnMenu();
  btnMenu2();
};

export default {
  init,
};
