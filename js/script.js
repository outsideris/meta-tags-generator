;(function() {
  'use strict';

  var meta$ = $('#meta');
  hljs.highlightBlock(meta);
  $(document.body).on('submit', function(e) {
    e.preventDefault();
    var tags = generateMeta();

    meta$.html(escapeHtml(tags));
    hljs.highlightBlock(meta$.get(0));
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
  var name$ = $('#name'),
      title$ = $('#title'),
      desc$ = $('#desc'),
      url$ = $('#url'),
      image$ = $('#image'),
      twitterSite$ = $('#tw-site');

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
    tags.push(ogName({name: name$.val()}));
    tags.push(ogTitle({title: title$.val()}));
    tags.push(ogDesc({desc: desc$.val()}));
    tags.push(ogUrl({url: url$.val()}));
    tags.push(ogImage({image: image$.val()}));
    var ot$ = $('.og-type:checked');
    tags.push(ogType({ogtype: ot$.length?ot$.val():null}));

    // twitter card
    tags.push(twTitle({title: title$.val()}));
    tags.push(twDesc({desc: desc$.val()}));
    tags.push(twUrl({url: url$.val()}));
    tags.push(twImage({image: image$.val()}));
    var tc$ = $('.tw-card:checked');
    tags.push(twCard({card: tc$.length?tc$.val():null}));
    tags.push(twSite({site: twitterSite$.val()}));

    tags = tags.filter(function(val) { return val !== null && val !== undefined; });
    return tags.join('\n');
  }

})();
