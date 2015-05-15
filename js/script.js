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
    var ogTags = [],
        twTages =[];

    if (name.value) {
      ogTags.push(ogName({name: name.value}));
    }
    if (title.value) {
      ogTags.push(ogTitle({title: title.value}));
      twTages.push(twTitle({title: title.value}));
    }
    if (desc.value) {
      ogTags.push(ogDesc({desc: desc.value}));
      twTages.push(twDesc({desc: desc.value}));
    }
    if (url.value) {
      ogTags.push(ogUrl({url: url.value}));
      twTages.push(twUrl({url: url.value}));
    }
    if (image.value) {
      ogTags.push(ogImage({image: image.value}));
      twTages.push(twImage({image: image.value}));
    }
    // open graph only
    var ot = document.querySelector('.og-type:checked');
    if (ot && ot.value) {
      ogTags.push(ogType({ogtype: ot.value}));
    }
    // twitter card only
    var tc = document.querySelector('.tw-card:checked');
    if (tc && tc.value) {
      twTages.push(twCard({card: tc.value}));
    }
    if (twitterSite.value) {
      twTages.push(twSite({site: twitterSite.value}));
    }

    var tags = ogTags.concat(twTages);
    return tags.join('\n');
  }

})();
