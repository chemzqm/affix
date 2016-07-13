# affix

  Fix an element in the viewport but not overlap the header and footer as much as possible.

  Just like what [bootstrap/affix](http://getbootstrap.com/javascript/#affix) did, but only simple javascript API.

  [demo](http://chemzqm.github.io/affix/).

## Installation

  Install with npm:

    $ npm install affix-component

## Example

``` js
  var affix = require('affix-component');
  var el = document.getElementById('nav');
  affix(el, {
    //minimal margin to the body top
    top: 80,
    //minimal margin to the body bottom
    bottom: 200
  })
```
## API

### affix(el, [option])

* `el` is target element
* `option.top` is top number when scrolling
* `option.bottom` is bottom number when scrolling

## License

  The MIT License (MIT)

  Copyright (c) 2016 <copyright chemzqm@gmail.com>

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
