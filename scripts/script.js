(function(){
  // Tab switching
  var tabs = document.querySelectorAll('.tab');
  var panels = document.querySelectorAll('.panel');
  tabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      tabs.forEach(function(t){ t.setAttribute('aria-selected','false'); });
      panels.forEach(function(p){ p.classList.remove('active'); });
      tab.setAttribute('aria-selected','true');
      document.getElementById('panel-' + tab.dataset.tab).classList.add('active');
    });
  });

  // Terminal boot sequence
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var termBody = document.getElementById('termBody');

  var lines = [
    {text: '<span class="prompt">$</span> npm create resume', cls: 'ln'},
    {text: '<span class="muted">resolving dependencies...</span>', cls: 'ln'},
    {text: '<span class="ok">✓</span> name: <strong style="color:#fff">Gavin Trowles</strong>', cls: 'ln'},
    {text: '<span class="ok">✓</span> role: <span style="color:#8B5CF6">Frontend Engineer</span>', cls: 'ln'},
    {text: '<span class="ok">✓</span> build complete <span class="muted">in 0.42s</span>', cls: 'ln'}
  ];

  function renderStatic(){
    termBody.innerHTML = lines.map(function(l){ return '<span class="' + l.cls + '">' + l.text + '</span>'; }).join('');
    var nameDiv = document.createElement('div');
    nameDiv.className = 'hero-name';
    nameDiv.textContent = 'Gavin Trowles';
    var roleDiv = document.createElement('div');
    roleDiv.className = 'hero-role';
    roleDiv.innerHTML = 'Frontend Engineer <span class="cursor"></span>';
    termBody.appendChild(nameDiv);
    termBody.appendChild(roleDiv);
  }

  if(reduceMotion){
    renderStatic();
    return;
  }

  var i = 0;
  function typeLine(){
    if(i >= lines.length){
      var nameDiv = document.createElement('div');
      nameDiv.className = 'hero-name';
      nameDiv.style.opacity = 0;
      nameDiv.textContent = 'Gavin Trowles';
      var roleDiv = document.createElement('div');
      roleDiv.className = 'hero-role';
      roleDiv.style.opacity = 0;
      roleDiv.innerHTML = 'Frontend Engineer <span class="cursor"></span>';
      termBody.appendChild(nameDiv);
      termBody.appendChild(roleDiv);
      setTimeout(function(){
        nameDiv.style.transition = 'opacity .4s ease';
        roleDiv.style.transition = 'opacity .4s ease';
        nameDiv.style.opacity = 1;
        roleDiv.style.opacity = 1;
      }, 60);
      return;
    }
    var div = document.createElement('div');
    div.className = 'ln';
    div.innerHTML = lines[i].text;
    div.style.opacity = 0;
    termBody.appendChild(div);
    setTimeout(function(){
      div.style.transition = 'opacity .25s ease';
      div.style.opacity = 1;
    }, 20);
    i++;
    setTimeout(typeLine, 260);
  }
  typeLine();
})();
