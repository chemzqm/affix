var event = require('event')
var offset = require('page-offset')
var computedStyle = require('computed-style')
var assign = require('object-assign')
var body = document.body
var doc = document.documentElement

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
  this.opt = opt = opt || {}
  opt.scrollable = opt.scrollable || window
  var rect = el.getBoundingClientRect()
  var top = rect.top + offset().y
  var vw = document.compatMode === 'BackCompat' ? body.clientWidth : doc.clientWidth
  if (rect.left > vw/2) {
    this.right = (vw - rect.right) + 'px'
    this.left = ''
  } else {
    this.right = ''
    this.left = rect.left + 'px'
  }
  if (opt.right === false) this.right = ''
  if (opt.left === false) this.left = ''
  this.origin = {}
  this.bottom = opt.bottom || 0
  this.start = opt.top ? top - opt.top : null
  this.top = opt.top || top
  this.setOrigin()

  var check = this._check = this.checkPosition.bind(this)
  event.bind(opt.scrollable, 'scroll', check)
  setTimeout(check, 20)
}

affix.prototype.setHolder = function () {
  if (!this.opt.holder || this.holder) return
  var el = this.holder = document.createElement('div')
  el.style.height = this.el.clientHeight + 'px'
  el.style.width = this.el.clientWidth + 'px'
  this.el.parentNode.insertBefore(el, this.el)
}

affix.prototype.setOrigin = function () {
  var props = ['top', 'left', 'right', 'bottom', 'position']
  var origin = this.origin
  var el = this.el
  props.forEach(function (prop) {
    origin[prop] = computedStyle(el, prop)
  })
}

affix.prototype.checkPosition = function () {
  var h = this.el.clientHeight
  var vh = Math.max(doc.clientHeight, window.innerHeight || 0)
  var y = offset().y
  var b = Math.max(vh, body.clientHeight) - y - h - this.top
  var styleObj = this.el.style
  if (this.bottom && b < this.bottom) {
    var top = this.top - (this.bottom - b)
    this.setHolder()
    assign(styleObj, {
      position: 'fixed',
      top: top + 'px',
      left: this.left,
      right: this.right,
    })
  }
  else if (this.start != null && y > this.start) {
    this.setHolder()
    assign(styleObj, {
      position: 'fixed',
      top: this.top + 'px',
      left: this.left,
      right: this.right,
    })
  } else {
    assign(styleObj, this.origin)
    this.removeHolder()
  }
}

affix.prototype.removeHolder = function () {
  if (this.holder && this.holder.parentNode) this.holder.parentNode.removeChild(this.holder)
  this.holder = null
}

affix.prototype.unbind = function () {
  this.removeHolder()
  event.unbind(this.opt.scrollable, 'scroll', this._check)
}

module.exports = affix
