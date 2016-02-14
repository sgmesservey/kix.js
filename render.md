# how to use `$.render`

Here is an example of template html embedded in a script tag
```html
<script type="text/template" id="my_tmpl">
  <h3>{name}</h3>
  <p>Hello, {name}, you are {age} years old!</p>
</script>
```

Here is how you could use kix to populate the template and inject the result into a `<div>`
```javascript
// grab the html:
var template = $("#my_tmpl").html();

// render the template:
var html = $.render(template,,{"name":"Hovis","age":13});

// inject the result: 
$("#some_div").html(html);
```

`$.render` always returns a string.
Here are the flavors:
```javascript
$.render(template,data);
$.render(template,data,true); // transform &,",<,and > into html entities
$.render(template,data,fn);  // use custom function 'fn' to transform the data
```

