# kix.js

Crossbrowser (including IE8+) javascript library with [MIT](https://opensource.org/licenses/MIT "Copyright &copy; 2016 Denis Ciccale, James Doyle, Henry Tang Kai, Tero Piirainen, Courtney Couch, Janne Lehtinen, Steven G. Messervey") license.

Features templating, AJAX, and an on-demand draggable modal popup window.


## Inspired by:
 - [ki.js](https://github.com/dciccale/ki.js) by Denis Ciccale
 - [ki.extend.js](https://github.com/james2doyle/ki.extend.js) by James Doyle
 - [YOU MIGHT NOT NEED JQUERY](http://youmightnotneedjquery.com) by Adam F. Schwartz and Zack Bloom
 - [jsmodal](http://jsmodal.com/index.php) by Henry Tang Kai
 - [riot.js 1.0.4](https://cdnjs.com/libraries/riot/1.0.4) by Tero Piirainen, Courtney Couch, and Janne Lehtinen
 - [Smallest DOMReady code, ever](http://www.dustindiaz.com/smallest-domready-ever) by Dustin Diaz


### Include it
```html
<script src="path/to/js/kix.min.js"></script>
```
It's been said before, but it bears repeating: _don't use github as a CDN_.


### Use it
```javascript
$("#mybutton").on("click",function() { alert("Hello, world!") });

var div = $.elm("div").html('<a href="example.com">' + foo.text + "</a>").addClass("hilite");
$("=body").append(div);

$.ajax("GET","http://example.com?foo=bar",function(r) { alert(r) });

$.popup({"ttl":"Hello There","htm":"<p>Lorem ipsum dolor sit amet</p>"});
```

### Build it
 `sh build`

The included build script expects a POSIX environment (Linux, BSD, OSX), and a wrapper script named `closure` available in $PATH.

The wrapper script should execute Googles Closure jar, passing arguments untouched. On my system, it is a one-line script:

`java -jar /opt/jars/closure.jar --warning_level QUIET $*`


### Caveats
 - No `noconflict`. If you want to use kix with some other libray that uses `$`, you have to juggle the objects manually.
 - Fails fast &amp; hard. Using the minified library during devlopment will give you strange, untraceable errors if you make a mistake
 - No fancy animations, tweens, or UI elements, aside from the `$.popup` function.


### IE8+
  In 2013, when I began assmebling kix, IE8 was still a viable, updatable browser. In 2016, this is no longer the case. Yet, I have a suspicion that Internet Explorer 8, 9, and 10 are still lurking in corprate environments, schools, and internet cafes. I used to regularly test kix against IE8, but lately the hardware to run it is on the way out. Please file an issue if you use Internet Explorer 8, 9, or 10, and something breaks.


### Manual
 - [Basics](#basics) `$` and utilities
 - [Extensions](#extensions) `$().fu`
 - [Modal Popup](#modal-popup) `$.popup(...)`
 - [Templating](#templating) `$.render(...)`
 - [AJAX](#ajax) `$.ajax(...)`


#### Basics
 `$` accepts one of: a _selector_, a _DOM node_, or a _function_.

Selectors:
 - `$("#foo")` is shorthand for `document.getElementById("foo")`
 - `$(".bar")` is shorthand for `document.getElementsByClassName("bar")`
 - `$("@baz")` is shorthand for `document.getElementsByName("baz")` (_useful for form elements_)
 - `$("=div")` is shorthand for `document.getElementsByTagName("div")`

`$`, when used with a selector, returns an array-like object whose items are the node(s) returned as result of the selection.
The object is decorated with many useful functions ([Extensions](#extensions)) that operate on the first or each item of the array.

When used with a DOM node, `$` turns the node into an object decorated with the functions referred to above.

And last, but not least, when `$` is passed a function, that function is exectuted when the DOM is ready to be manipulated, like jQuerys `$(document).ready()`

Utilities:
 - `$.elm(name)`        : shorthand for `document.createElement(name)`
 - `$.trim(string)`     : trims leading and trailing whitespace from `string`.
 - `$.map(arr,fn)`      : for each element of array `arr`, call function `fn(arr[index],index)`. Normalized for IE8+
 - `$.stop(e)`          : prevents `e` from bubbling. Normalized for IE8+.
 - `$.load(file)`       : injects a &lt;script&gt; tag with `src` attribute set to `file`. Appends a unique token to the uri to bypass the cache.
 - `$.style(css)`       : injects a or modifies the &lt;style&gt; tag, appending `css` to it.
 - `$.popup({..})`      : covered in its own section -  [Modal Popup](#modal-popup)
 - `$.render(tmpl,obj)` : covered in its own section - [Templating](#templating)
 - `$.ajax(...)`        : covered in its own section - [AJAX](#ajax)


#### Extensions
  ...are functions that decorate the object and may be chained for script-fu.

 - `on(event,fn)`       : attachs `fn` as `event`s handler.
 - `off(event,fn`       : removes `fn` as `event`s handler.
 - `each(fn,this)`      : for each element of the object, call `fn` with `this` as **this**.
 - `hasClass(class)`    : tests if first item has CSS class `class`. Normalized for IE8+. *****
 - `addClass(class)`    : adds CSS class `class` to each item. Normalized for IE8+.
 - `removeClass(class)` : removes CSS class `class` from each item. Normalized for IE8+.
 - `append(a)`          : for each item, append `a` (another kix object or DOM node)
 - `prepend(a)`         : for each item, prepnd `a` (another kix object or DOM node)
 - `attr(name,value)`   : if `value` is absent, return the attribute `name` of the first elment; if present, set each items attribute `name` to `value`
 - `removeAttr(name)`   : for each item, remove attribute `name`.
 - `before(a)`          : shorthand for `adjacentHTML("beforbegin",a)`
 - `after(a)`           : shorthand for `adjacentHTML("afterend",a)`
 - `css(a,b)`           : if `a` is an object, set each items CSS according the objects properties. If `a` and `b` are strings, set each items CSS propery `a` to `b`. Normalized for IE8 (float).
 - `first()`            : return the first item. **!**
 - `last()`             : return the last item.  **!**
 - `get(i)`             : return the i-th item.  **!**
 - `text(string)`       : gets / sets innerText. Normalized for IE8+ **?**
 - `html(string)`       : gets / sets innerHTML. **?**
 - `empty()`            : removes all children nodes (including text) of each item.
 - `value(string)`      : gets / sets values. Used for input elements (button,text,etc). **!**
 - `parent()`           : returns the first items parent node. (**returns a plain dom node**) **!**
 - `remove()`           : removes each item from the DOM.
 - `trigger(e)`         : for each item, trigger event `e`.
 - `is(a)`              : shorthand for `matches(a)` / `matchesSelector(a)`, normalized across browsers. **!**

**!** : not suitable for chaining.

**?** : may be chained when used as a setter.

#### Modal Popup
 `$.popup({...})` takes an object with any or all of the following parameters:
 - `htm` : string to set the innerHTML of the popup
 - `hbg` : background color of the content
 - `ttl` : the text to be used in the popups title bar
 - `tbg` : background color of the title bar
 - `wid` : width of the popup. String ending in `px`, i.e. `250px`. If not supplied, the default is `200px`.
 - `x`   : absolute x coordinate in the client area of the popup.
 - `y`   : absolute y coordinate in the client area of the popup.
 - `fn`  : callback to be executed when the popup closes.
 - `drg` : if truthy, popup can be dragged around the client area.
 - `tim` : if a positive number, close automatically after `tim` seconds.

If x and y are not provided, the popup is centered in the client area. 

The content is placed inside of a &lt;div&gt; tag with id `_POPH`.

The close button is contained within a &lt;div&gt; tage with id `_POPX`.

You can programmatically close the popup with `$.popup.close()`.

There is no provision for multiple concurrent windows.


#### Templating
 kix provides a micro templating system that is borrowed from riot.js version 1.

 First, stash your template html somewhere; abusing a script tag is valid html and works well:
```html
<script type="text/template" id="my_tmpl">
  <h3>{name}</h3>
	<p>Hello, {name}. You are {age} years old.</p>
</script>
```
 Notice the use of curly braces to indicate where `render` should interpolate values.

 Then, grab your html, render, and apply:
```javascript
// retrieve template
var template = $("#my_tmpl").html();

// render
var html = $.render(template,{ "name":"Jane", "age":33 });

// and apply
$("#some_div").html(html);
```
 `render` optionally takes an additional parameter:
 - if the parameter is boolean and `true`, &amp;, &lt;, and &gt; are converted into `&amp;`, `&lt;`, and `&gt;`, respectively.
 - if the paramter is a `function`, execute it on the rendered template string for custom escaping.


#### AJAX
 kix provides a simple XHR wrapper which provides some useful conviences.

 **$.ajax(`method`,`url`,`fn`,`data`,`json`,`async`,`timeout`)**

 - `method`  : Required. The http verb to be used; it is only semi-checked to see if it matches 'PO' or not. Invalid verbs will throw an exception!
 - `url`     : Required. The url string. If you do not plan on using the `data` parameter, you can embed an appropriately escaped query string in it.
 - `fn`      : Required. The callback to executed on success.
 - `data`    : A plain or formData object. Plain objects will encoded into a suitable querystring. formData objects are unmodified and trigger the addition of a content-type header with a value of `multipart/form-data`. GET requests will get the querystring appended to the url automatically.
 - `json`    : If this parameter is present and set to the string "JSON", the response type is overridden and forced to JSON.
 - `async`   : If present and set to boolean `false`, forces a synchronous request.
 - `timeout` : Sets the timeout to something other than the default of two seconds. Normalized for IE8.

 It should be noted there is no provision for a failure function; instead, kix will return the boolean `false` to the supplied success callback.

