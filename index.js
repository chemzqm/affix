var offset = require('offset')
var computedStyle = require('computed-style')

function scrollTop(){
  if (window.pageYOffset) return window.pageYOffset
  return document.documentElement.clientHeight
    ? document.documentElement.scrollTop
    : document.body.scrollTop
}

/**
 * Init affix with element and option
 * `el` is target element
 * `opt.top` is top number when scrolling
 * `opt.bottom` is bottom number when scrolling
 *
 * @param {Element} el
 * @param {Object} opt
 * @api public
 */
function affix(el, opt) {
  if (!(this instanceof affix)) return new affix(el, opt)
  this.el = el
  opt = opt || {}
  var p = offset(el)
  var top = p.top + document.body.scrollTop
  this.left = p.left
  this.origin = {}
  this.bottom = opt.bottom || 0
  this.start = opt.top ? top - opt.top : 0
  this.top = opt.top || top
  this.position = el.style.position
  this.setOrigin()

  var check = this.checkPosition.bind(this)
  window.addEventListener('scroll', check)
  setTimeout(check, 0)
}

affix.prototype.setOrigin = function () {
  var props = ['top', 'left', 'right', 'bottom']
  var origin = this.origin
  var el = this.el
  props.forEach(function (prop) {
    origin[prop] = computedStyle(el, prop)
  })
}

affix.prototype.checkPosition = function () {
  var top = scrollTop()
  var h = this.el.clientHeight
  var b = document.body.clientHeight - window.scrollY - h - this.top
  var styleObj = this.el.style
  if (b < this.bottom) {
    this.el.style.position = 'fixed'
    top = this.top - (this.bottom - b)
    styleObj.top = top + 'px'
    styleObj.left = this.left
    styleObj.right = ''
  }
  else if (top > this.start) {
    styleObj.position = 'fixed'
    styleObj.top = this.top + 'px'
    styleObj.left = this.left + 'px'
    styleObj.right = ''
  } else {
    styleObj.position = this.position
    styleObj.left = this.origin.left
    styleObj.top = this.origin.top
  }
}

module.exports = affix
