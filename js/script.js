;(function() {
  'use strict';

  var body = document.body;
  var meta = document.querySelector('#meta');

  // inputs
  var name = document.querySelector('#name'),
      title = document.querySelector('#title'),
      desc = document.querySelector('#desc'),
      url = document.querySelector('#url'),
      image = document.querySelector('#image');

  hljs.highlightBlock(meta);
  body.addEventListener('submit', function(e) {
    e.preventDefault();
    var tags = generateMeta();

    meta.innerHTML = escapeHtml(tags);
    hljs.highlightBlock(meta);
  });

  function template(t) {
    return function(o) {
      return t.replace(/\{([^{}]*)\}/g, function(a, b) {
        var r = o[b];
        return typeof r === 'string' || typeof r === 'number' ? r : a;
      });
    };
  }

  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };
  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  var ogName = template('<meta property="og:site_name" content="{name}">'),
      ogTitle = template('<meta property="og:title" content="{title}">'),
      ogDesc = template('<meta property="og:description" content="{desc}">'),
      ogUrl = template('<meta property="og:url" content="{url}">'),
      ogImage = template('<meta property="og:image" content="{image}">');

  function generateMeta() {
    var tags = [];
    tags.push(ogName({name: name.value}));
    tags.push(ogTitle({title: title.value}));
    tags.push(ogDesc({desc: desc.value}));
    tags.push(ogUrl({url: url.value}));
    tags.push(ogImage({image: image.value}));
    return tags.join('\n');
  }

})();
