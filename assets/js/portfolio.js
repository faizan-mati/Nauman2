/* Navbar pin */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => { 
  nav.classList.toggle('pinned', window.scrollY > 60); 
});

/* Scroll reveal */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) { 
      setTimeout(() => e.target.classList.add('visible'), i * 80); 
      io.unobserve(e.target); 
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* Filter */
document.querySelectorAll('.port-filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.port-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.port-card').forEach(card => {
      const show = f === 'all' || card.dataset.category === f;
      card.style.transition = 'opacity .3s ease, transform .3s ease';
      if (show) { 
        card.style.opacity='1'; 
        card.style.transform='scale(1)'; 
        card.style.display='flex'; 
      } else { 
        card.style.opacity='0'; 
        card.style.transform='scale(.96)'; 
        setTimeout(()=>{ 
          if(card.dataset.category!==f&&f!=='all') card.style.display='none'; 
        },300); 
      }
    });
  });
});

/* Project data */
const projects = [
  { 
    title:'NovaBrew — Brand Identity', 
    category:'Branding', 
    img:'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=1200', 
    desc:'Complete visual identity system for a premium coffee startup entering a competitive market. The project included logo design, color palette, typography selection, brand guidelines documentation, and packaging design that positioned NovaBrew as a premium, modern brand.', 
    meta:[{l:'Client',v:'NovaBrew Co.'},{l:'Timeline',v:'6 Weeks'},{l:'Industry',v:'F&B / Retail'}], 
    tags:['Logo Design','Brand Guide','Packaging','Typography','Color Strategy'], 
    results:[{n:'3x',l:'Brand Recall'},{n:'40%',l:'Sales Increase'},{n:'5★',l:'Client Rating'}] 
  },
  { 
    title:'Archon Consulting — Website', 
    category:'Web Design', 
    img:'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200', 
    desc:'A high-converting corporate website with custom scroll animations, integrated lead capture system and headless CMS for a B2B consulting firm. Designed for speed, clarity and conversion with a strong focus on trust signals and service clarity.', 
    meta:[{l:'Client',v:'Archon Group'},{l:'Timeline',v:'8 Weeks'},{l:'Industry',v:'B2B Consulting'}], 
    tags:['UI/UX Design','HTML/CSS','CMS Integration','Animations','Lead Capture'], 
    results:[{n:'210%',l:'More Leads'},{n:'1.8s',l:'Load Time'},{n:'68%',l:'Bounce Drop'}] 
  },
  { 
    title:'GreenLeaf — SEO Growth', 
    category:'SEO', 
    img:'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=1200', 
    desc:'Achieved 340% organic traffic increase in 6 months for an eco-product brand through a comprehensive SEO strategy including technical audit, on-page optimisation, content marketing and targeted link building campaigns.', 
    meta:[{l:'Client',v:'GreenLeaf Ltd.'},{l:'Timeline',v:'6 Months'},{l:'Industry',v:'Eco / Retail'}], 
    tags:['Technical SEO','Content Strategy','Link Building','Analytics','CRO'], 
    results:[{n:'340%',l:'Traffic Growth'},{n:'#1',l:'Google Ranking'},{n:'5x',l:'Organic Revenue'}] 
  },
  { 
    title:'PulseWear — Social Campaign', 
    category:'Marketing', 
    img:'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200', 
    desc:'Designed and fully managed a multi-platform social media launch campaign for a sportswear brand. From creative direction and ad copy to targeting strategy and daily optimisation, the campaign reached 2.4M impressions in the first 30 days.', 
    meta:[{l:'Client',v:'PulseWear Inc.'},{l:'Timeline',v:'3 Months'},{l:'Industry',v:'Fashion / Sport'}], 
    tags:['Instagram Ads','Paid Social','Creative Direction','Copywriting','Analytics'], 
    results:[{n:'2.4M',l:'Impressions'},{n:'4.2%',l:'CTR Rate'},{n:'180%',l:'ROAS'}] 
  },
  { 
    title:'Luxora — E-Commerce Store', 
    category:'Web Design', 
    img:'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1200', 
    desc:'Custom Shopify storefront with bespoke product pages, streamlined checkout flow and a mobile-first design for a luxury accessories brand. Every detail was crafted to reflect the premium nature of the products and convert high-intent shoppers.', 
    meta:[{l:'Client',v:'Luxora Studio'},{l:'Timeline',v:'10 Weeks'},{l:'Industry',v:'Luxury / Fashion'}], 
    tags:['Shopify','E-Commerce','Mobile-First','UX Design','Checkout CRO'], 
    results:[{n:'92%',l:'Mobile Score'},{n:'+55%',l:'Conversion Rate'},{n:'3x',l:'Average Order'}] 
  },
  { 
    title:'Vantara — Complete Rebrand', 
    category:'Branding', 
    img:'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1200', 
    desc:'Full rebranding project for a tech startup — new company name, complete identity system, redesigned website and full launch campaign. The rebrand repositioned them from a generic tech provider to a distinctive B2B SaaS brand, tripling investor interest.', 
    meta:[{l:'Client',v:'Vantara Tech'},{l:'Timeline',v:'12 Weeks'},{l:'Industry',v:'SaaS / B2B'}], 
    tags:['Brand Strategy','Identity Design','Web Redesign','Launch Campaign','Copywriting'], 
    results:[{n:'3x',l:'Investor Interest'},{n:'+120%',l:'Site Traffic'},{n:'8',l:'Awards Won'}] 
  },
  { 
    title:'FinEdge — Local SEO', 
    category:'SEO', 
    img:'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1200', 
    desc:'Dominated local search results for a financial advisory firm across three cities through focused local SEO: Google Business Profile optimisation, local citation building, review generation and geo-targeted content, driving 5x more qualified leads.', 
    meta:[{l:'Client',v:'FinEdge Advisors'},{l:'Timeline',v:'4 Months'},{l:'Industry',v:'Finance / Advisory'}], 
    tags:['Local SEO','Google My Business','Lead Generation','Citations','Reviews'], 
    results:[{n:'5x',l:'More Leads'},{n:'#1',l:'Maps Pack'},{n:'62%',l:'Call Increase'}] 
  },
  { 
    title:'Zenora — Email Marketing', 
    category:'Marketing', 
    img:'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200', 
    desc:'Built and managed full email marketing infrastructure for a wellness brand — automated welcome sequences, abandoned cart flows, loyalty nurture campaigns and a weekly newsletter, achieving 48% average open rate and doubling repeat purchase rate in 90 days.', 
    meta:[{l:'Client',v:'Zenora Wellness'},{l:'Timeline',v:'3 Months'},{l:'Industry',v:'Wellness / D2C'}], 
    tags:['Email Automation','Klaviyo','Copywriting','Segmentation','A/B Testing'], 
    results:[{n:'48%',l:'Open Rate'},{n:'2x',l:'Repeat Purchases'},{n:'380%',l:'Email ROI'}] 
  },
  { 
    title:'Orbita — SaaS Landing Page', 
    category:'Web Design', 
    img:'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1200', 
    desc:'Conversion-optimised landing page and onboarding flow for a SaaS analytics product. Through strategic copywriting, trust-building elements, social proof placement and a frictionless sign-up experience, trial sign-ups increased 210% within 60 days of launch.', 
    meta:[{l:'Client',v:'Orbita SaaS'},{l:'Timeline',v:'5 Weeks'},{l:'Industry',v:'SaaS / Analytics'}], 
    tags:['Landing Page','SaaS','CRO','Copywriting','UX Design'], 
    results:[{n:'210%',l:'Trial Sign-ups'},{n:'74%',l:'Form Completion'},{n:'2.1s',l:'Load Time'}] 
  }
];

/* Modal */
const backdrop = document.getElementById('portModalBackdrop');
document.getElementById('modalClose').addEventListener('click', closeModal);
backdrop.addEventListener('click', e => { if(e.target===backdrop) closeModal(); });
document.addEventListener('keydown', e => { if(e.key==='Escape') closeModal(); });

function openModal(i) {
  const d = projects[i]; 
  if(!d) return;
  document.getElementById('modalImg').src = d.img;
  document.getElementById('modalImg').alt = d.title;
  document.getElementById('modalCat').textContent = d.category;
  document.getElementById('modalTitle').textContent = d.title;
  document.getElementById('modalDesc').textContent = d.desc;
  document.getElementById('modalMeta').innerHTML = d.meta.map(m=>`<div class="modal-meta-item"><span class="modal-meta-label">${m.l}</span><span class="modal-meta-val">${m.v}</span></div>`).join('');
  document.getElementById('modalTags').innerHTML = d.tags.map(t=>`<span class="port-tag">${t}</span>`).join('');
  document.getElementById('modalResults').innerHTML = d.results.map(r=>`<div class="modal-result-item"><span class="modal-result-num">${r.n}</span><span class="modal-result-lbl">${r.l}</span></div>`).join('');
  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() { 
  backdrop.classList.remove('open'); 
  document.body.style.overflow = ''; 
}

document.querySelectorAll('.port-ovr-btn[data-action="preview"]').forEach((btn, i) => {
  btn.addEventListener('click', e => { 
    e.preventDefault(); 
    openModal(i); 
  });
});
