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

