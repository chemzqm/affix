var affix = require('..');
var el = document.getElementById('nav');
affix(el, {
  top: 80,
  bottom: 200
})
affix(document.getElementById('nav1'), {
  top: 80,
  bottom: 200
})

