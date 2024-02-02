function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("desktop-nav").style.top = "0";
    document.getElementById("hamburger-nav").style.top = "0";
  } else {
    document.getElementById("desktop-nav").style.top = "-200px";
    document.getElementById("hamburger-nav").style.top = "-200px";
  }
  prevScrollpos = currentScrollPos;
}

var theme = document.getElementById("theme")
var theme_ham = document.getElementById("theme-ham")
var x = document.getElementById('x')
theme.onclick = function(){
  document.body.classList.toggle("dark-theme");
  if(document.body.classList.contains("dark-theme")){

    theme.classList.remove("uil-moon");
    theme.classList.add("uil-sun");
    x.src = "./assets/logo-white.png"
  }else{
    theme.classList.remove("uil-sun");
    theme.classList.add("uil-moon");
    x.src = "./assets/logo-black.png"
  }
}
theme_ham.onclick = function(){
  document.body.classList.toggle("dark-theme");
  if(document.body.classList.contains("dark-theme")){

    theme_ham.classList.remove("uil-moon");
    theme_ham.classList.add("uil-sun");
    x.src = "./assets/logo-white.png"
  }else{
    theme_ham.classList.remove("uil-sun");
    theme_ham.classList.add("uil-moon");
    x.src = "./assets/logo-black.png"
  }
}




// Type Animation

var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
  this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
  this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
  delta = this.period;
  this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
  this.isDeleting = false;
  this.loopNum++;
  delta = 500;
  }

  setTimeout(function() {
  that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
  }
  
};
