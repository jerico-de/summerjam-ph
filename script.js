// Per-year winner video carousel (mobile only)
(function(){
  var mq = window.matchMedia('(max-width:820px)');
  var blocks = document.querySelectorAll('.winner-block');

  blocks.forEach(function(block){
    var track = block.querySelector('.winner-cols');
    var items = track.children;
    var dots = block.querySelectorAll('.winner-dots .dot');
    var prevBtn = block.querySelector('.prev-vid');
    var nextBtn = block.querySelector('.next-vid');
    var idx = 0;

    function render(){
      if(mq.matches){
        track.style.transform = 'translateX(-' + (idx * 100) + '%)';
      } else {
        track.style.transform = 'none';
        idx = 0;
      }
      dots.forEach(function(d, i){ d.classList.toggle('active', i === idx); });
    }
    prevBtn.addEventListener('click', function(){
      idx = (idx - 1 + items.length) % items.length;
      render();
    });
    nextBtn.addEventListener('click', function(){
      idx = (idx + 1) % items.length;
      render();
    });
    mq.addEventListener('change', render);
    render();
  });
})();

// Partner CTA — reveal + pulse once scrolled into view
(function(){
  var cta = document.querySelector('.partner-cta');
  if(!cta) return;
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        cta.classList.add('in-view');
        io.unobserve(cta);
      }
    });
  }, {threshold:.3});
  io.observe(cta);
})();

// Mobile nav toggle
(function(){
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('mobileMenu');
  if(!toggle || !menu) return;

  function closeMenu(){
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  toggle.addEventListener('click', function(){
    var isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  menu.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click', closeMenu);
  });
})();

// Generic reveal — section heads, winner blocks, event cards, merch cards, faq, partner logos
(function(){
  var items = document.querySelectorAll('.reveal');
  if(!items.length) return;
  var io = new IntersectionObserver(function(list){
    list.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:.2});
  items.forEach(function(item){ io.observe(item); });
})();

// About entries — slide in from alternating sides as they scroll into view
(function(){
  var entries = document.querySelectorAll('.about-entry');
  if(!entries.length) return;
  var io = new IntersectionObserver(function(list){
    list.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:.25});
  entries.forEach(function(entry){ io.observe(entry); });
})();