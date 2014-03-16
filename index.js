var offset = require('offset');
var scrollTop = require('scrolltop');

function affix(el, opt) {
  if (!(this instanceof affix)) return new affix(el, opt);
  this.el = el;
  opt = opt || {};
  var p = offset(el);
  var top = p.top + document.body.scrollTop;
  this.left = p.left;
  this.bottom = opt.bottom || 0;
  this.start = opt.top ? top - opt.top : 0;
  this.top = opt.top || top;
  this.position = el.style.position;
  var check = this.checkPosition.bind(this);
  window.addEventListener('scroll', check);
  setTimeout(check, 0);
}

affix.prototype.checkPosition = function () {
  var top = scrollTop();
  var h = this.el.clientHeight;
  var b = document.body.clientHeight - window.scrollY - h - this.top;
  if (b < this.bottom) {
    this.el.style.position = 'fixed';
    var top = this.top - (this.bottom - b);
    this.el.style.top = top + 'px';
  }
  else if (top > this.start) {
    this.el.style.position = 'fixed';
    this.el.style.top = this.top + 'px';
  } else {
    this.el.style.position = this.position;
  }
}

module.exports = affix;
