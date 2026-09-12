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

// Finalists
const finalists = [
  "And Friends",
  "Autonomicass Crew",
  "Balinsasayaw Vibes",
  "Beyond the Box",
  "Bon Appétit",
  "CLA",
  "Chronophile",
  "D’Chimpz",
  "Euphrosyne",
  "EX-MOB",
  "Femme MNL",
  "Foot Forward",
  "INCOGNITO",
  "KOMPLEX",
  "Kreativ Koncept",
  "League of Monsters",
  "Legit Status",
  "Mendez Dance Company",
  "NEW GENERATION IMPACT",
  "Nomads",
  "NOCTURNAL DANCE COMPANY",
  "Oxycrew",
  "PRIDERISE",
  "Psycho",
  "STREET CREW 04",
  "STREET MOVERS",
  "The Hoodz",
  "Thy Kingdom",
  "UNISTARZ"
];

(function(){
  var finalistsList = document.getElementById('finalistsList');
  var toggleBtn = document.getElementById('finalistsToggle');
  if(!finalistsList || !toggleBtn) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mode = 'preview';
  var rotateTimer = null;

  function buildHTML(items){
    return items.map(function(item){
      return (
        '<div class="finalist in-view">' +
          '<span class="finalist-number">' + String(item.num).padStart(2, '0') + '</span>' +
          '<span class="finalist-name">' + item.name + '</span>' +
        '</div>'
      );
    }).join('');
  }

  function sample(n){
    var pool = finalists.map(function(name, i){ return { name: name, num: i + 1 }; });
    for(var i = pool.length - 1; i > 0; i--){
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
    }
    return pool.slice(0, n);
  }

  function crossfade(items){
    finalistsList.style.opacity = 0;
    setTimeout(function(){
      finalistsList.innerHTML = buildHTML(items);
      finalistsList.style.opacity = 1;
    }, 250);
  }

  function showPreview(initial){
    var picks = sample(4);
    if(initial){
      finalistsList.innerHTML = buildHTML(picks);
    } else {
      crossfade(picks);
    }
  }

  function showFull(){
    var all = finalists.map(function(name, i){ return { name: name, num: i + 1 }; });
    crossfade(all);
  }

  function startRotation(){
    if(reduceMotion) return;
    rotateTimer = setInterval(function(){ showPreview(false); }, 2600);
  }

  function stopRotation(){
    clearInterval(rotateTimer);
    rotateTimer = null;
  }

  // init
  finalistsList.classList.remove('is-full');
  showPreview(true);
  startRotation();

  toggleBtn.addEventListener('click', function(){
    if(mode === 'preview'){
      mode = 'full';
      stopRotation();
      finalistsList.classList.add('is-full');
      showFull();
      toggleBtn.textContent = 'Show less';
    } else {
      mode = 'preview';
      finalistsList.classList.remove('is-full');
      showPreview(false);
      startRotation();
      toggleBtn.textContent = 'View full list';
    }
  });
})();

// Hero countdown
(function(){
  var el = document.getElementById('heroCountdown');
  if(!el) return;

  var target = new Date(el.dataset.target).getTime();
  var daysEl = el.querySelector('[data-unit="days"]');
  var hoursEl = el.querySelector('[data-unit="hours"]');
  var minsEl = el.querySelector('[data-unit="minutes"]');
  var secsEl = el.querySelector('[data-unit="seconds"]');

  function pad(n){ return String(n).padStart(2, '0'); }

  function tick(){
    var diff = target - Date.now();

    if(diff <= 0){
      daysEl.textContent = hoursEl.textContent = minsEl.textContent = secsEl.textContent = '00';
      clearInterval(timer);
      return;
    }

    var days = Math.floor(diff / 86400000);
    var hours = Math.floor((diff % 86400000) / 3600000);
    var mins = Math.floor((diff % 3600000) / 60000);
    var secs = Math.floor((diff % 60000) / 1000);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minsEl.textContent = pad(mins);
    secsEl.textContent = pad(secs);
  }

  var timer = setInterval(tick, 1000);
  tick();
})();

// Sponsor highlights — count-up on scroll into view
(function(){
  var section = document.getElementById('sponsorHighlights');
  if(!section) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nums = section.querySelectorAll('.sf-num[data-count]');

  function animateCount(el){
    var target = parseInt(el.dataset.count, 10);
    var prefix = el.dataset.prefix || '';
    var suffix = el.dataset.suffix || '';

    if(reduceMotion){
      el.textContent = prefix + target.toLocaleString() + suffix;
      return;
    }

    var duration = 1400;
    var start = null;

    function step(ts){
      if(start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(eased * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if(progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        nums.forEach(animateCount);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  io.observe(section);
})();

// Nav scroll-spy — highlight current section's nav link (desktop + mobile menu)
(function(){
  var navLinks = document.querySelectorAll('.navlinks a, .mobile-menu a');
  if(!navLinks.length) return;

  var uniqueIds = [];
  navLinks.forEach(function(link){
    var id = link.getAttribute('href').slice(1);
    if(uniqueIds.indexOf(id) === -1) uniqueIds.push(id);
  });

  var sections = uniqueIds.map(function(id){
    return document.getElementById(id);
  }).filter(Boolean);

  if(!sections.length) return;

  function setActive(id){
    navLinks.forEach(function(link){
      link.classList.toggle('active', link.getAttribute('href') === '#' + id);
    });
  }

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        setActive(entry.target.id);
      }
    });
  }, {
    rootMargin: '-45% 0px -50% 0px',
    threshold: 0
  });

  sections.forEach(function(section){ io.observe(section); });
})();

// Hero flags — rotate through items with sideways swoosh (mobile only)
(function(){
  var container = document.querySelector('.hero-flags');
  if(!container) return;

  var items = container.querySelectorAll('b');
  if(items.length < 2) return;

  var mq = window.matchMedia('(max-width: 820px)');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var idx = 0;
  var timer = null;

  function clearStates(){
    items.forEach(function(item){
      item.classList.remove('active', 'exit');
    });
  }

  function resetToFirst(){
    clearStates();
    items[0].classList.add('active');
    idx = 0;
  }

  function rotate(){
    var current = items[idx];
    var nextIdx = (idx + 1) % items.length;
    var next = items[nextIdx];

    current.classList.remove('active');
    current.classList.add('exit');

    next.classList.remove('exit');
    void next.offsetWidth;
    next.classList.add('active');

    setTimeout(function(){
      current.classList.remove('exit');
    }, 450);

    idx = nextIdx;
  }

  function start(){
    if(timer) return;
    timer = setInterval(rotate, 3000);
  }

  function stop(){
    clearInterval(timer);
    timer = null;
  }

  function apply(){
    if(mq.matches && !reduceMotion){
      resetToFirst();
      start();
    } else {
      stop();
      clearStates();
    }
  }

  mq.addEventListener('change', apply);
  apply();
})();

// Back to top button
(function(){
  var btn = document.getElementById('backToTop');
  if(!btn) return;

  var hero = document.querySelector('header.hero');
  var threshold = hero ? hero.offsetHeight : 600;

  function toggle(){
    btn.classList.toggle('visible', window.scrollY > threshold);
  }

  btn.addEventListener('click', function(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
})();

// YouTube facade — only load iframe on click
document.querySelectorAll('.yt-facade').forEach(function(el){
  el.addEventListener('click', function(){
    var id = el.dataset.ytId;
    el.innerHTML = '<iframe src="https://www.youtube.com/embed/' + id + '?autoplay=1" ' +
      'allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>';
  }, { once: true });
});