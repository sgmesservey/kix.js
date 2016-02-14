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
	function j(a,i,k) {
		i = { '#': 'ById', '.': 'sByClassName', '@': 'sByName', '=': 'sByTagName'}[a[0]];
		k = b[i?'getElement'+i:f](i?a.slice(1):a);
		k = k ? k.length ? k : [k] : [];
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

/*
 * ki.extend.js
 * extend ki.js with:
 *   - a few jQuery-style prototypes
 *   - some syntacical sugar
 *   - dynamic style and script injection
 *   - observable and render from riot.js 
 * Copyright (c) 2014 James Doyle (james2doyle)
 * @license MIT
 * for the original sources, see:
 * https://github.com/james2doyle/ki.extend.js
 * Resource for prototypes
 * http://youmightnotneedjquery.com/
 * render from riot.js
 * Copyright (c) 2014 Muut, Inc. and contributors
 * https://github.com/muut/riotjs
 * IE-ified and golfed by Steven G. Messervey
 */

!function(A,B,C,D,E,F,G,H,I,J,u) {

	// document.createElement
	$.elm = function(a) {
		return $(A.createElement(a))
	}

	// string trim
	$.trim = function(a) {
		return a.replace(/^\s+|\s+$/g, '')
	}

	// for each element of a, call function b with arguments(value,index) and return an array of the results
	$.map = function(a, b, c, d) {
		c = [];
		for(d=0;d < a.length; ++d) {
			c.push(b(a[d], d))
		}
		return c
	}

	// stop event bubbling
	$.stop = function(e) {
		if (!e.preventDefault) {
			e.returnValue = !1
		} else {
			e.preventDefault()
		}
	}

	// test if <this> has CSS class 'a' ; IE8,9-compatible
	$[B].hasClass = function(a,b,c) {
		b = this[0][C].split(' ');
		for (c = 0; c < b.length; c++) if (b[c]===a) return !0;
		return !1
	}

	// add CSS class 'a' to <this> ; IE8,9-compatible
	$[B].addClass = function(a) {
		return this.each(function(n) {
			n[C] += ' '+a
		})
	}

	// remove CSS class from <this> ; IE8,9-compatible
	$[B].removeClass = function(a) {
		return this.each(function(n,b,c) {
			b = n[C].split(' ');
			for (c = 0; c < b.length; c++) if (b[c]===a) b[c]='';
			n[C] = b.join(' ')
		})
	}

	// append kix object or DOM node to <this>
	$[B].append = function(a) {
		return this.each(function(b) {
			b.appendChild(a[0]||a)
		})
	}

	// prepend kix object or DOM node to <this>
	$[B].prepend = function(a) {
		return this.each(function(b) {
			b.insertBefore(a[0]||a, b.firstChild)
		})
	}

	// element(s) attribute get/set
	$[B].attr = function(a, b) {
		return b === u ? this[0]['get'+D](a) : this.each(function(c) {
			c['set'+D](a, b)
		})
	}

	// element(s) attribute removal
	$[B].removeAttr = function(a) {
		return this.each(function(b) {
			b['remove'+D](a)
		})
	}

	// test if first element of <this> has attribute
	$[B].hasAttr = function(a) {
		return this[0]['has'+D](a)
	}


	// wrapper for adajacentHTML
	$[B].before = function(a) {
		return this.each(function(b) {
			b[E]('beforebegin', a[0]||a)
		})
	};

	// wrapper for adjacentHTML
	$[B].after = function(a) {
		return this.each(function(b) {
			b[E]('afterend', a[0]||a);
		})
	}

	// css chaos magick
	// handle 'float' for IE & non-IE
	$[B].css = function(a, b, c, d) {
		d = this;
		if (typeof(a) === 'object') {
			for(c in a) {
				d.each(function(e) {
					e[F][c == G ? A.fileSize ? H : I : c] = a[c]
				})
			}
			return d
		} else {
			return b === u ? a === G ? d[0][F][H]||d[0][F][I] : d[0][F][a] : d.each(function(e) {
				a === G ? A.fileSize ? e[F][H] = b : e[F][I] = b : e[F][a] = b
			})
		}
	}

	// return first element of <this>
	$[B].first = function() {
		return $(this[0])
	}

	// return last element of <this>
	$[B].last = function() {
		return $(this[this.length - 1])
	}

	// return a'th element of <this>
	$[B].get = function(a) {
		return $(this[a])
	}

	// get/set element(s) text
	// ie8 needs innerText
	$[B].text = function(a) {
		if (A.fileSize) {
			return a === u ? this[0].innerText : this.each(function(b) {
				b.innerText = a
			})
		} else {
			return a === u ? this[0].textContent : this.each(function(b) {
				b.textContent = a
			})
		}
	}

	// for each element of <this>, remove all child nodes
	// empty added by SGM 2-AUG-2015
	$[B].empty = function() {
		this.each(function(a) { while (a.firstChild) a.removeChild(a.firstChild) })
	}

	// get/set element(s) html
	$[B].html = function(a) {
		return a === u ? this[0].innerHTML : this.each(function(b) {
			b.innerHTML = a
		})
	}

	// get/set element(s) value. Useful for <input> elements
	$[B].value = function(a,b) {
		b=this;
		return b.length > 1 ?
			a != []._ && a.big ? b.each(function(n,c){ c=n.value; c=c&&a }) : $.map(this,function(n) { return n.value })
			:
			a != []._ && a.big ? (b[0].value = a) && b : b[0].value
	}

	// return <this> first element's parent
	$[B].parent = function() {
		return (this.length < 2) ? $(this[0].parentNode) : []
	}

	// remove all elements of <this> from the DOM
	$[B].remove = function() {
		return this.each(function(b) {
			b.parentNode.removeChild(b)
		})
	}

	// trigger an event
	$[B].trigger = function(a,b) {
		if (A.createEvent) {
			b = A.createEvent('HTMLEvents');
			b.initEvent(a, !0, !1);
			this.each(function(c) {
				c.dispatchEvent(b)
			})
		} else {
			this.each(function(c) {
				c.fireEvent('on' + a)
			})
		}
		return this
	}

	// I don't remember
	$[B].is = function(a,b,c,d) {
		d = this[0]
		b = (d.matches || d.matchesSelector || d.msMatchesSelector || d.mozMatchesSelector || d.webkitMatchesSelector || d.oMatchesSelector);
		if (b) {
			return b.call(d, a)
		} else {
			for (b in d.parentNode.querySelectorAll(a)) { 
				if(b === d) {
					return !0
				}
			}
			return !1
		}
	}

	// script injection (SGM)
	$.load = function(s) {
		(s+''===s)&&$(A.body).append($.elm('script').attr('src',s+'?'+new Date().getTime()))
	}

	// style injection (SGM)
	$.style = function(t,e,d) {
		d = $(A.body);
		e = $('='+J)[0] || $.elm('style').attr('id',J)[0];
		if (A.fileSize) {
			d.append([e]);
			e.styleSheet.cssText += t;
		} else {
			e = $(e);
			e.text(e.text() + t);
			d.append(e);
		}
	}

	// render from riotjs. See readme.md
	$.F = {}
	$.T = {"\\": "\\\\", "\n": "\\n", "\r": "\\r", "'": "\\'"}
	$.E = {'&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;'}
	$.D = function(a) {
		return a == null ? '' : (a+'').replace(/[&\"<>]/g, function(b) { return $.E[b]; })
	}
	$.render = function(a, b, c) {
		if (c === true) c = $.D;
		a = a || '';
		return ($.F[a] = $.F[a] || new Function("_", "e", "return '" +
			a.replace(/[\\\n\r']/g, function(d) {
				return $.T[d];
			}).replace(/{\s*([\w\.]+)\s*}/g, "' + (e?e(_.$1,'$1'):_.$1||(_.$1==null?'':_.$1)) + '") + "'")
		)(b, c)
	}

	/* the following are remnants from riot.js 1.

	// arm (observable) from riot.js
	$.C = {}
	$.arm = function(a,b) {
		b = [].slice;

		a.on = function(c,d) {
			if (/^f/.test(typeof d)) {
				c.replace(/\S+/g,function(e,f) {
					($.C[e] = $.C[e] || []).push(d);
					d.t = f > 0
				})
			}
		}

		a.off = function(c,d,e,f,g) {
			if (c === '*') $.C = {};
			else if (d) {
				e = $.C[c];
				for (f = 0; (g = e && e[f]); ++f) {
					if (g === d) { e.splice(f,1); f-- }
				}
			} else {
				c.replace(/\S+/g,function(e) { $.C[e] = [] })
			}
			return a;
		}

		a.one = function(c,d) {
			if (d) d.one = !0;
			return a.on(c,d)
		}

		a.trigger = function(c,d,e,f,g) {
			d = b.call(arguments,1);
			e = $.C[c] || [];
			for (g = 0; (f = e[g]); ++g) {
				if (!f.busy) {
					f.busy = !0;
					f.apply(a,f.t ? [c].concat(d) : d);
					if (f.one) { e.splice(g,1); g-- }
					f.busy = !1
				}
			}
		}

		return a
	}
	*/

}(document,'prototype','className','Attribute','insertAdjacentHTML','style','float','styleFloat','cssFloat','_style_')

/* tiny xhr to my liking for ki (SGM)
 * @license MIT
 * Copyright 2016 Steven G. Messervey
 * m = method (only checks first letter is P or p), default GET
 * u = URL
 * f = callback function, gets response on success false on error
 * d = data, urlencoded-string or object, body of POST, querystring for GET
 * j = force json iff == 'J' or 'j'
 * a = async flag, default true
 * t = timeout, default 2000ms
 * no error checking for url!
 * param function Copyright (c) 2013 James Doyle (ki.extend.js)
 */

$.ajax = function(m,u,f,d,j,a,t,x,p) {
	p = function(A,B,C,D,E,F,G) {
		if (A && A.getAll) return A; // html5: bail if input is a formdata object
		G = encodeURIComponent;
		C = [];
		for(D in A) {
			E = B ? B + '[' + D + ']' : D;
			F = A[D];
			C.push(typeof F==='object' ? p(F, E) : G(E) + '=' + G(F));
		}
		return C.join('&')
	}
	x = new XMLHttpRequest();
	a = !(a === !1);
	x.onreadystatechange = function() { (this.readyState == 4)&& f(this.status == 200 ? this.response : !1) };
	if (d) d=p(d)||null;
	if (/^p/i.test(m)) {
		x.open("POST",u,a);
		x.setRequestHeader('Content-Type',d.getAll ? 'multipart/form-data' : 'application/x-www-form-urlencoded');
	} else {
		u = d ? u + '?' + d : u;
		d = null;
		x.open(m,u,a);
	}
	if (a) x.timeout = (+t===t) ? t : 2000; // ie8: timeout set only on opened requests
	j && /^j/i.test(j) && (x.responseType = "json");
	x.send(d);
	x = null
}

/* original param code by James Doyle
$.param = function(obj, prefix) {
	var str = [];
	for(var p in obj) {
		var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
		str.push(typeof v == "object" ? $.param(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
	}
	return str.join("&");
};
*/
/*
 * tiny js popup lib for use with kix.js
 * Started 08-NOV-2013 by Steven G. Messervey
 * @license MIT
 * Copyright 2016 Steven G. Messervey
 * takes an object with any of the folling properties:
 *  htm:  string to be used as content (use ajax to get the string separately)
 *  hbg:  background color for the content
 *  ttl:  text for a title bar, shown before the close button
 *  tbg:  background color for the title bar
 *  wid:  width in pixels. Defaults to 200.
 *  x:    absolute x position of the left-top corner, use with caution
 *  y:    absolute y position of the left-top corner, use with caution.
 *  fn:   function to be called when the popup is closed
 *  drg:  if truthy, make popup draggable
 *  tim:  if a positive number, close the window after number seconds
 * 'wid', 'x', or 'y', if specified, must be strings with 'px' appended.
 * If 'x' and 'y' are not specified, popup will be centered in the client area.
 * The content is placed inside a div with id '_POPH'.
 * The close button is contained within a div with id '_POPX'
 *
 * Draggability code inspired by jsmodal/Henry Tang Kai:
 * jsmodal.com/index.php
 */

// IE DOM fix: define window.innerHeight and window.innerWidth
!function(A,B,C,D,E,F,G,H,I,J) {
	!A[F+H] &&
	C[D](A,F+H, { get: function() { return B[E][G+H] } }) &&
	C[D](A,F+I, { get: function() { return B[E][G+I] } });

	$.popup = function(a) {
		if (!a.htm) return;
		var b = $.popup,w, o; // w = window, o = opaque
		if (!b.i) {
			o = $.elm('div').css({
				display:'none', position:'absolute', top:'0', left:'0', width:'100%', height:'100%', filter:'alpha(opacity=70)', opacity:'.7', background:'#001'
			});
			w = $.elm('div').css({
				display:'none', position:'absolute', border:'2px solid #111', zIndex:'1000', width:(a.wid) ? a.wid : '200px', overflow:'auto',
				backgroundColor:(a.hbg) ? a.hbg : '#FFF'
			});
			b.w = w;
			b.o = o;
			$('=body').append(o).append(w);
			b.i = !0;
		} else {
			w = b.w;
			o = b.o;
			w.html('');
		}
		$(B).on('keypress',b.k);
		b.f = /^f/.test(typeof a.fn) ? a.fn : null;
		a.tim && (+a.tim === a.tim) && setTimeout(b.close,a.tim * 1000);
		var
			tb = $.elm('div').css({borderBottom:'1px solid black', backgroundColor:(a.tbg) ? a.tbg : '#CCF'}), /* tb = title bar */
			t = $.elm('div').html((a.ttl) ? a.ttl : '&nbsp;').css({height:'1.5em', 'float':'left', textAlign:'center'}), /* t = title */
			c = $.elm('div').html('[&times;]').css({height:'1.5em', 'float':'right', cursor:'pointer'}).attr('id','_POPX'), /* c = close*/
			d = $.elm('div').css({clear:'both'}); /* d = div */
		tb.append(t).append(c).append(d);
		var wr = $.elm('div').css({padding:'5px'}).attr('id','_POPH').html(a.htm); // wr = wrap
		w.append(tb).append(wr);
		o.css({display:'block'});
		w.css({display:'block'});
		t.css({width:'' + (w[0].clientWidth - c[0].clientWidth) + 'px'});
		w.css({top:(a.y) ? a.y : '' + (A.innerHeight / 2) - (w[0].offsetHeight / 2) + 'px',
			left:(a.x) ? a.x : ''+ (A.innerWidth / 2) - (w[0].offsetWidth / 2) + 'px'});
		c.on('click',function() { $.popup.close(); });
		a.drg &&(a.drg === !0)&&tb.on('mousedown',function (a) { b.dragOn(a); return !1; }).css('cursor','move');
	}
	J = $.popup;
	J.close = function() {
		J.o.css({display:'none'});
		J.w.css({display:'none'});
		J.f&&J.f();
		$(B).off('keypress',J.k);
	}
	J.k = function(a) { a = a || A.event; if (a.keyCode == 27) J.close() } 
	J.dragOn = function(a) {
		a = a || A.event;
		J.oX = a.clientX - J.w[0].offsetLeft;
		J.oY = a.clientY - J.w[0].offsetTop;
		$(B).on('mouseup',function() { $(B).off('mousemove',J.drag); }).on('mousemove',J.drag);
	}
	J.drag = function(a,b) {
		a = a || A.event;
		b = a.clientX - J.oX;
		J.w[0].style.left = (b >= 0 ? b : 0) + 'px';
		b = a.clientY - J.oY;
		J.w[0].style.top = (b >= 0 ? b : 0) + 'px';
	}
}(window,document,Object,'defineProperty','documentElement','inner','client','Width','Height')

