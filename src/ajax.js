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
