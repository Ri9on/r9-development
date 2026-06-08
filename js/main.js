/* Main JS: particles, nav, animations, filters, forms, theme toggle, performance */
document.addEventListener('DOMContentLoaded',()=>{
  // ===== Language Setup =====
  const savedLang=localStorage.getItem('language')||'en';
  translatePage(savedLang);
  
  const langBtns=document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
      const lang=btn.getAttribute('data-lang');
      translatePage(lang);
    });
  });

  // ===== Authentication State =====
  const getUser=()=>JSON.parse(localStorage.getItem('user'))||null;
  const setUser=(user)=>localStorage.setItem('user',JSON.stringify(user));
  const removeUser=()=>localStorage.removeItem('user');

  // Update account link based on login status
  const accountLink=document.getElementById('accountLink');
  const loginModal=document.getElementById('loginModal');
  if(accountLink){
    const user=getUser();
    if(user){
      accountLink.textContent='My Account';
      accountLink.href='account.html';
      accountLink.style.color='var(--accent)';
    }else{
      accountLink.addEventListener('click',(e)=>{
        e.preventDefault();
        if(loginModal) loginModal.classList.add('active');
      });
    }
  }
  
  // Close login modal
  const closeLoginBtn=document.getElementById('closeLogin');
  if(closeLoginBtn){
    closeLoginBtn.addEventListener('click',()=>{
      if(loginModal) loginModal.classList.remove('active');
    });
  }
  
  // Close modal on outside click
  if(loginModal){
    window.addEventListener('click',(e)=>{
      if(e.target===loginModal){
        loginModal.classList.remove('active');
      }
    });
  }

  // ===== Modal Tab Switching =====
  const tabBtns=document.querySelectorAll('.tab-btn');
  if(tabBtns.length>0){
    tabBtns.forEach(btn=>{
      btn.addEventListener('click',()=>{
        const tabName=btn.getAttribute('data-tab');
        tabBtns.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        
        document.querySelectorAll('.tab-content').forEach(content=>{
          content.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
      });
    });
  }

  // ===== Login Form Handler =====
  const loginForm=document.getElementById('loginForm');
  if(loginForm){
    loginForm.addEventListener('submit',(e)=>{
      e.preventDefault();
      const email=loginForm.querySelector('input[name="email"]').value;
      const password=loginForm.querySelector('input[name="password"]').value;
      const status=document.getElementById('loginStatus');

      if(!email.includes('@')||password.length<6){
        status.textContent='⚠ Invalid email or password';
        status.style.color='#ff4444';
        setTimeout(()=>{status.textContent=''},3000);
        return;
      }

      status.textContent='Signing in...';
      status.style.color='var(--accent)';
      
      setTimeout(()=>{
        const user={email,name:email.split('@')[0],joinDate:new Date().toLocaleDateString()};
        setUser(user);
        status.textContent='✓ Logged in! Redirecting...';
        setTimeout(()=>{
          window.location.href='account.html';
        },1000);
      },800);
    });
  }

  // ===== Register Form Handler =====
  const registerForm=document.getElementById('registerForm');
  if(registerForm){
    registerForm.addEventListener('submit',(e)=>{
      e.preventDefault();
      const fullname=registerForm.querySelector('input[name="fullname"]').value;
      const email=registerForm.querySelector('input[name="email"]').value;
      const password=registerForm.querySelector('input[name="password"]').value;
      const confirm=registerForm.querySelector('input[name="confirm"]').value;
      const status=document.getElementById('registerStatus');

      if(!email.includes('@')){
        status.textContent='⚠ Invalid email';
        status.style.color='#ff4444';
        return;
      }

      if(password!==confirm){
        status.textContent='⚠ Passwords do not match';
        status.style.color='#ff4444';
        return;
      }

      if(password.length<8){
        status.textContent='⚠ Password must be at least 8 characters';
        status.style.color='#ff4444';
        return;
      }

      status.textContent='Creating account...';
      status.style.color='var(--accent)';
      
      setTimeout(()=>{
        const user={email,name:fullname,firstName:fullname.split(' ')[0],lastName:fullname.split(' ')[1]||'',joinDate:new Date().toLocaleDateString()};
        setUser(user);
        status.textContent='✓ Account created! Redirecting...';
        setTimeout(()=>{
          window.location.href='account.html';
        },1000);
      },800);
    });
  }

  // ===== Forgot Password Form Handler =====
  const forgotModal=document.getElementById('forgotModal');
  const forgotForm=document.getElementById('forgotForm');
  const forgotPasswordBtn=document.getElementById('forgotPasswordBtn');
  const closeForgotBtn=document.getElementById('closeForgot');

  if(forgotPasswordBtn){
    forgotPasswordBtn.addEventListener('click',(e)=>{
      e.preventDefault();
      if(loginModal) loginModal.classList.remove('active');
      if(forgotModal) forgotModal.classList.add('active');
    });
  }

  if(closeForgotBtn){
    closeForgotBtn.addEventListener('click',()=>{
      if(forgotModal) forgotModal.classList.remove('active');
    });
  }

  if(forgotModal){
    window.addEventListener('click',(e)=>{
      if(e.target===forgotModal){
        forgotModal.classList.remove('active');
      }
    });
  }

  if(forgotForm){
    forgotForm.addEventListener('submit',(e)=>{
      e.preventDefault();
      const email=forgotForm.querySelector('input[name="email"]').value;
      const status=document.getElementById('forgotStatus');

      if(!email.includes('@')){
        status.textContent='⚠ Invalid email';
        status.style.color='#ff4444';
        return;
      }

      status.textContent='Sending reset link...';
      status.style.color='var(--accent)';
      
      setTimeout(()=>{
        status.textContent='✓ Reset link sent to your email. Check your inbox.';
        status.style.color='#00c864';
        forgotForm.reset();
        setTimeout(()=>{
          if(forgotModal) forgotModal.classList.remove('active');
          status.textContent='';
        },3000);
      },1000);
    });
  }

  // ===== Theme Toggle =====
  const themeToggle=document.getElementById('themeToggle');
  const htmlElem=document.documentElement;
  const isDark=localStorage.getItem('theme')==='dark';
  if(isDark) htmlElem.classList.add('dark-mode');
  if(themeToggle){
    themeToggle.addEventListener('click',()=>{
      htmlElem.classList.toggle('dark-mode');
      const isDarkNow=htmlElem.classList.contains('dark-mode');
      localStorage.setItem('theme',isDarkNow?'dark':'light');
      themeToggle.innerHTML=isDarkNow?'<i class="fa-solid fa-sun"></i>':'<i class="fa-solid fa-moon"></i>';
    });
  }

  // ===== Particles =====
  const canvas=document.getElementById('particles');
  const ctx=canvas.getContext('2d');
  let w=canvas.width=innerWidth;
  let h=canvas.height=innerHeight;
  window.addEventListener('resize',()=>{w=canvas.width=innerWidth;h=canvas.height=innerHeight});
  const particles=[];
  for(let i=0;i<90;i++){particles.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.6+0.4,v:Math.random()*0.3+0.05,alpha:Math.random()*0.6+0.1})}
  function draw(){ctx.clearRect(0,0,w,h);for(const p of particles){p.x+=p.v;p.y+=Math.sin((p.x+p.y)/120)*0.2; if(p.x>w+10)p.x=-10; ctx.beginPath();ctx.fillStyle=`rgba(10,180,255,${p.alpha})`;ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();}requestAnimationFrame(draw)}
  draw();

  // ===== Mobile Nav =====
  const navToggle=document.getElementById('navToggle');
  const navLinks=document.getElementById('navLinks');
  navToggle.addEventListener('click',()=>{navLinks.classList.toggle('open')});
  navLinks.querySelectorAll('a').forEach(link=>{link.addEventListener('click',()=>{navLinks.classList.remove('open')})});

  // ===== Scroll Animations (Intersection Observer) =====
  const observer=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.1});
  document.querySelectorAll('.service-card,.feature,.project,.stat-card').forEach(el=>{observer.observe(el)});

  // ===== Testimonials Slider =====
  const slides=document.querySelectorAll('.testimonial');
  let si=0;
  setInterval(()=>{
    if(slides.length>0){
      slides[si].classList.remove('active');
      si=(si+1)%slides.length;
      slides[si].classList.add('active');
    }
  },5000);

  // ===== Portfolio Filter =====
  const filterBtns=document.querySelectorAll('.filter-btn');
  const projects=document.querySelectorAll('.project');
  filterBtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
      filterBtns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const filter=btn.getAttribute('data-filter');
      projects.forEach(proj=>{
        if(filter==='all'||proj.getAttribute('data-category')===filter){
          proj.classList.remove('hidden');
          setTimeout(()=>proj.classList.add('fade-in'),10);
        }else{
          proj.classList.add('hidden');
          proj.classList.remove('fade-in');
        }
      });
    });
  });

  // ===== Form Validation =====
  const contactForm=document.getElementById('contactForm');
  if(contactForm){
    // Initialize EmailJS (replace USER_ID with your EmailJS user ID)
    if(window.emailjs){
      emailjs.init('xsjeZQf3af-GkRIdg');
    }

    // track page load time to block extremely fast submissions (simple bot check)
    const _pageLoadTs = Date.now();
    const MIN_TIME_MS = 3000; // require at least 3s on page before submit
    const RATE_LIMIT_MS = 30000; // 30s between submissions per browser

    contactForm.addEventListener('submit',(e)=>{
      e.preventDefault();
      // Honeypot check
      const hp = contactForm.querySelector('input[name="website"]')?.value || '';
      if(hp.trim()!==''){
        // silently drop spammy submissions
        return;
      }

      // Minimum time since page load
      if(Date.now() - _pageLoadTs < MIN_TIME_MS){
        const statusFast=document.getElementById('formStatus');
        if(statusFast) statusFast.textContent='✖ Please wait a moment before submitting.';
        return;
      }

      // Rate limit per browser
      try{
        const last = parseInt(localStorage.getItem('lastContactSubmit')||'0',10);
        if(Date.now() - last < RATE_LIMIT_MS){
          const statusRL=document.getElementById('formStatus');
          if(statusRL) statusRL.textContent='✖ Please wait before sending another message.';
          return;
        }
      }catch(_){ }
      const inputs=contactForm.querySelectorAll('input[required],textarea[required]');
      let isValid=true;
      inputs.forEach(input=>{
        if(!input.value.trim()){
          input.style.borderColor='#ff4444';
          isValid=false;
        }else{
          input.style.borderColor='';
        }
      });
      const emailInput=contactForm.querySelector('input[type="email"]');
      if(!isValid||!emailInput.value.includes('@')){
        alert('Please fill all fields correctly');
        return;
      }

      const status=document.getElementById('formStatus');
      status.textContent='Sending…';

      // Prepare template parameters — match these to your EmailJS template variables
      const templateParams = {
        from_name: contactForm.querySelector('input[name="name"]').value,
        from_email: contactForm.querySelector('input[name="email"]').value,
        discord: contactForm.querySelector('input[name="discord"]').value,
        message: contactForm.querySelector('textarea[name="message"]').value,
      };

      // Replace SERVICE_ID and TEMPLATE_ID with your EmailJS values
      emailjs.send('service_kijbp43','template_moo90wj', templateParams)
        .then(()=>{
          status.textContent='✓ Message sent! We will reply on Discord.';
          contactForm.reset();
          try{ localStorage.setItem('lastContactSubmit', Date.now().toString()); }catch(_){ }
          setTimeout(()=>{status.textContent=''},3000);
        },(err)=>{
          console.error('EmailJS error:', err);
          status.textContent='✖ Sending failed. Try again later.';
          setTimeout(()=>{status.textContent=''},4000);
        });
    });
  }

  // ===== Newsletter Signup =====
  const newsletterForm=document.getElementById('newsletterForm');
  if(newsletterForm){
    newsletterForm.addEventListener('submit',(e)=>{
      e.preventDefault();
      const email=newsletterForm.querySelector('input[type="email"]').value;
      const status=document.getElementById('newsletterStatus');
      if(!email.includes('@')){
        status.textContent='⚠ Invalid email';
        setTimeout(()=>{status.textContent=''},3000);
        return;
      }
      status.textContent='Subscribing…';
      setTimeout(()=>{
        status.textContent='✓ Subscribed! Check your email.';
        newsletterForm.reset();
        setTimeout(()=>{status.textContent=''},3000);
      },800);
    });
  }

  // ===== Lazy Loading Images =====
  if('IntersectionObserver' in window){
    const lazyImages=document.querySelectorAll('img[data-src]');
    const imgObserver=new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const img=entry.target;
          img.src=img.getAttribute('data-src');
          img.removeAttribute('data-src');
          imgObserver.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img=>imgObserver.observe(img));
  }

  // ===== Set Year =====
  const year=document.getElementById('year');
  if(year)year.textContent=new Date().getFullYear();
});
