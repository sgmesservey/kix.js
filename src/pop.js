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

!function(A,B,C,D,E,F,G,H,I,J) {
	// IE DOM fix: define window.innerHeight and window.innerWidth
	!A[F+H] &&
	C[D](A,F+H, { get: function() { return B[E][G+H] } }) &&
	C[D](A,F+I, { get: function() { return B[E][G+I] } });

	$.popup = function(a) {
		if (!a.htm) return;
		var b = $.popup,w, o; // w = window, o = opaque
		if (!b.i) {
			o = $.elm('div').css({
				display:'none', position:'absolute', top:'0', left:'0', width:A[F+H]+A.pageXOffset||B[E].scrollLeft+'px',
				height:A[F+H]+A.pageYOffset||B[E].scrollTop+'px', background:'#001'
			});
			// IE-only css fix: check for ie, then set opacity/filter:alpha() as appropriate
			A[F+H] ? o.css('opacity','.7') : o.css('filter','alpha(opacity=70');
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
			w.css({backgroundColor:(a.hbg) ? a.hbg : '#FFF', width:(a.wid) ? a.wid : '200px'});
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
		t.css({width:'' + (w[0][G+H] - c[0][G+H]) + 'px'});
		w.css({top:(a.y) ? a.y : '' + ((A[F+I] / 2) + (A.pageYOffset||B[E].scrollTop)) - (w[0].offsetHeight / 2) + 'px',
			left:(a.x) ? a.x : ''+ ((A[F+H] / 2)+ (A.pageXOffset||B[E].scrollLeft)) - (w[0].offsetWidth / 2) + 'px'});
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

