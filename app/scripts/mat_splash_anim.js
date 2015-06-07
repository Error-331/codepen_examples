var icon1State = 0;
var icon2State = 0;
var icon2IsAnimRun = false;

var $icon1 = document.querySelector('#icon1');
var $icon1Child = $icon1.querySelector('.om-l-icon-inner');

var $icon2 = document.querySelector('#icon2');
var $icon2Child = $icon2.querySelector('.om-l-icon-inner');


function prefixedEvent(element, type, callback) {
  var pfx = ["webkit", "moz", "MS", "o", ""];

  for (var p = 0; p < pfx.length; p++) {
    if (!pfx[p]) {
      type = type.toLowerCase();
    }

    element.addEventListener(pfx[p]+type, callback, false);
  }
}

function icon1Toggle()
{
  if (icon1State === 0) {
    $icon1.classList.remove('om-c-splash-close-init');
    $icon1.classList.add('om-c-splash-open-init');

    $icon1Child.classList.remove('om-c-icon-show-init');
    $icon1Child.classList.add('om-c-icon-hide-init');

    icon1State = 1;
  } else {
    $icon1.classList.remove('om-c-splash-open-init');
    $icon1.classList.add('om-c-splash-close-init');

    $icon1Child.classList.remove('om-c-icon-hide-init');
    $icon1Child.classList.add('om-c-icon-show-init');

    icon1State = 0;
  }
}

prefixedEvent($icon1Child, 'AnimationEnd', function(event){
  event.preventDefault();
  event.stopPropagation();

  setTimeout(function(){
    icon1Toggle()
  }, 1000);
});

prefixedEvent($icon2Child, 'AnimationEnd', function(event){
  event.preventDefault();
  event.stopPropagation();

  icon2IsAnimRun = false;

  if (icon2State === 0) {
    $icon2.classList.add('om-c-icon-bell-shake');
    $icon2.classList.remove('om-c-splash-close-init');

    $icon2Child.classList.remove('om-c-icon-show-init');
  }
});

$icon2.addEventListener('click', function(event){
  event.preventDefault();

  if (icon2IsAnimRun === true) {
    return false;
  }

  if (icon2State === 0) {
    icon2IsAnimRun = true;
    icon2State = 1;

    $icon2.classList.remove('om-c-icon-bell-shake');

    $icon2.classList.remove('om-c-splash-close-init');
    $icon2.classList.add('om-c-splash-open-init');

    $icon2Child.classList.remove('om-c-icon-show-init');
    $icon2Child.classList.add('om-c-icon-hide-init');
  } else  {
    icon2IsAnimRun = true;
    icon2State = 0;

    $icon2.classList.remove('om-c-splash-open-init');
    $icon2.classList.add('om-c-splash-close-init');

    $icon2Child.classList.remove('om-c-icon-hide-init');
    $icon2Child.classList.add('om-c-icon-show-init');
  }
});


$icon2Child.addEventListener('animationend', function(event){
  event.preventDefault();
  event.stopPropagation();
});

setTimeout(function(){
  icon1Toggle()
}, 1000);
