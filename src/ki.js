/*
 * ki.js - jQuery-like API super-tiny JavaScript library
 * Copyright (c) 2014 Denis Ciccale (@tdecs)
 * https://github.com/dciccale/ki.js
 * @license MIT
 * selector code Copyright (c) 2013 James Doyle
 * @license MIT
 * modified by Steven G. Messervey
 * @license MIT
 */
!function (b, c, d, e, f, g, h) {

  // shim ie8 getElementsByClassname
	b[g]||(b[g] = function(a) { return b[f]('.'+a); })

	// improved selector (James Doyle)
	// fixed a bug which converted a <select> into an array of it's options,
	// instead of a decorated object (Steven G. Messervey) AUG-2016
	function j(a,i,k) {
		i = { '#': 'ById', '.': 'sByClassName', '@': 'sByName', '=': 'sByTagName'}[a[0]];
		k = b[i?'getElement'+i:f](i?a.slice(1):a);
		//k = k ? k.length ? k : [k] : [];
		k = k ? k.blur ? [k] : k : [];
		return k;
	}

	// addEventListener support?
  h = b['add' + e]

  /*
   * init function (internal use)
   * a = selector, dom element or function
   * d = placeholder for matched elements
   * i = placeholder for length of matched elements
   */
  function i(a, d, i) {
		if (!a) return null;
		for(d = (a && (a.nodeType || a.frames) ? [a] : '' + a === a ? j(a) : c), i = d.length; i--; c.unshift.call(this, d[i]));
  }

  /*
   * $ main function
   * a = css selector, dom object, or function
   * http://www.dustindiaz.com/smallest-domready-ever
   * returns instance or executes function on ready
   */
  $ = function (a) {
    return /^f/.test(typeof a) ? /in/.test(b.readyState) ? setTimeout('$('+a+')',9) : a() : new i(a)
  }

  // set ki prototype
  $[d] = i[d] = {

    // default length
    length: 0,

    /*
     * on method
     * a = string event type i.e 'click'
     * b = function
     * return this
     */
    on: function (a, b) {
      return this.each(function (c) {
        h ? c['add' + e](a, b, !1) : c.attachEvent('on' + a, b)
      })
    },

    /*
     * off method
     * a = string event type i.e 'click'
     * b = function
     * return this
     */
    off: function (a, b) {
      return this.each(function (c) {
        h ? c['remove' + e](a, b) : c.detachEvent('on' + a, b)
      })
    },

    /*
     * each method
     * a = the function to call on each iteration
     * b = the this value for that function (the current iterated native dom element by default)
     * return this
     */
    each: function (a, b) {
      for (var c = this, d = 0, e = c.length; d < e; ++d) {
        a.call(b || c[d], c[d], d, c)
      }
      return c
    },

    // for some reason is needed to get an array-like
    // representation instead of an object
    splice: c.splice
  }
}(document, [], 'prototype', 'EventListener', 'querySelectorAll','getElementsByClassname');

