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

const finalistsList = document.getElementById("finalistsList");

if (finalistsList) {
  finalists.forEach((team, index) => {
    const finalist = document.createElement("div");

    finalist.className = "finalist";
    finalist.style.setProperty(
      "--delay",
      `${index * 60}ms`
    );

    finalist.innerHTML = `
      <span class="finalist-number">
        ${String(index + 1).padStart(2, "0")}
      </span>

      <span class="finalist-name">
        ${team}
      </span>
    `;

    finalistsList.appendChild(finalist);
  });

  var finalistsIO = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.querySelectorAll('.finalist').forEach(function(row){
          row.classList.add('in-view');
        });
        finalistsIO.unobserve(entry.target);
      }
    });
  }, {threshold:.2});
  finalistsIO.observe(finalistsList);
}