;(function() {
  'use strict';

  var body = document.body;
  var meta = document.querySelector('#meta');
  hljs.highlightBlock(meta);
  body.addEventListener('submit', function(e) {
    e.preventDefault();
    var tags = generateMeta();

    meta.innerHTML = escapeHtml(tags);
    hljs.highlightBlock(meta);
  });

  function template(t) {
    return function(o) {
      var hasValue = true;
      Object.keys(o).forEach(function(k) { if (!o[k]) { hasValue = false; } });
      if (hasValue) {
        return t.replace(/\{([^{}]*)\}/g, function(a, b) {
          var r = o[b];
          return typeof r === 'string' || typeof r === 'number' ? r : a;
        });
      }
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

  // inputs
  var name = document.querySelector('#name'),
      title = document.querySelector('#title'),
      desc = document.querySelector('#desc'),
      url = document.querySelector('#url'),
      image = document.querySelector('#image'),
      twitterSite = document.querySelector('#tw-site');

  // templates
  var ogName = template('<meta property="og:site_name" content="{name}">'),
      ogTitle = template('<meta property="og:title" content="{title}">'),
      ogDesc = template('<meta property="og:description" content="{desc}">'),
      ogUrl = template('<meta property="og:url" content="{url}">'),
      ogImage = template('<meta property="og:image" content="{image}">'),
      ogType = template('<meta property="og:type" content="{ogtype}">');
  var twCard = template('<meta name="twitter:card" content="{card}">'),
      twUrl = template('<meta name="twitter:url" content="{url}">'),
      twTitle = template('<meta name="twitter:title" content="{title}">'),
      twDesc = template('<meta name="twitter:description" content="{desc}">'),
      twImage = template('<meta name="twitter:image" content="{image}">'),
      twSite = template('<meta name="twitter:site" content="{site}">');

  function generateMeta() {
    var tags = [];

    // open graph
    tags.push(ogName({name: name.value}));
    tags.push(ogTitle({title: title.value}));
    tags.push(ogDesc({desc: desc.value}));
    tags.push(ogUrl({url: url.value}));
    tags.push(ogImage({image: image.value}));
    var ot = document.querySelector('.og-type:checked');
    tags.push(ogType({ogtype: !!ot?ot.value:null}));

    // twitter card
    tags.push(twTitle({title: title.value}));
    tags.push(twDesc({desc: desc.value}));
    tags.push(twUrl({url: url.value}));
    tags.push(twImage({image: image.value}));
    var tc = document.querySelector('.tw-card:checked');
    tags.push(twCard({card: !!tc?tc.value:null}));
    tags.push(twSite({site: twitterSite.value}));

    tags = tags.filter(function(val) { return val !== null && val !== undefined; });
    return tags.join('\n');
  }

})();
