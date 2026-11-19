(function(){
  var grid = document.getElementById('calGrid');
  if (!grid) return;
  var WEEK = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var WEEK_FULL = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var FESTIVALS = [
    {date:'2026-08-15', name:'Independence Day'},
    {date:'2026-10-02', name:'Gandhi Jayanti'},
    {date:'2026-10-20', name:'Dussehra'},
    {date:'2026-11-08', name:'Diwali'},
    {date:'2026-11-09', name:'Govardhan Puja'},
    {date:'2026-11-11', name:'Bhai Dooj'},
    {date:'2026-11-24', name:'Guru Nanak Jayanti'},
    {date:'2026-12-14', name:'Gita Jayanti'},
    {date:'2026-12-25', name:'Christmas'},
    {date:'2026-12-31', name:"New Year's Eve"},
    {date:'2027-01-01', name:"New Year's Day"},
    {date:'2027-01-13', name:'Lohri'},
    {date:'2027-01-14', name:'Makar Sankranti / Pongal'},
    {date:'2027-01-23', name:'Vasant Panchami'},
    {date:'2027-01-26', name:'Republic Day'},
    {date:'2027-11-01', name:'Karnataka Rajyotsava'}
  ];
  var festMap = {};
  FESTIVALS.forEach(function(f){ festMap[f.date] = festMap[f.date] ? festMap[f.date] + ' / ' + f.name : f.name; });
  var today = new Date();
  var viewYear = today.getFullYear(), viewMonth = today.getMonth();
  function key(y, m, d){ return y + '-' + String(m+1).padStart(2,'0') + '-' + String(d).padStart(2,'0'); }
  function renderList(){
    var list = document.getElementById('calList');
    list.innerHTML = '';
    var items = FESTIVALS.filter(function(f){
      var p = f.date.split('-').map(Number);
      return p[0] === viewYear && p[1] - 1 === viewMonth;
    });
    if (items.length === 0){
      list.innerHTML = '<li class="cal-item">No holidays or festivals this month.</li>';
      return;
    }
    items.forEach(function(f){
      var p = f.date.split('-').map(Number);
      var dt = new Date(p[0], p[1]-1, p[2]);
      var li = document.createElement('li');
      li.className = 'cal-item';
      li.innerHTML = '<span class="cal-item-date">' + MONTHS[p[1]-1] + ' ' + p[2] + '</span><span class="cal-item-day">' + WEEK_FULL[dt.getDay()] + '</span><span class="cal-item-name">' + f.name + '</span>';
      list.appendChild(li);
    });
  }
  function render(){
    document.getElementById('calTitle').textContent = MONTHS[viewMonth] + ' ' + viewYear;
    grid.innerHTML = '';
    WEEK.forEach(function(w){ var h = document.createElement('div'); h.className = 'cal-head'; h.textContent = w; grid.appendChild(h); });
    var firstDay = new Date(viewYear, viewMonth, 1).getDay();
    var days = new Date(viewYear, viewMonth + 1, 0).getDate();
    for (var i = 0; i < firstDay; i++){ var e = document.createElement('div'); e.className = 'cal-cell cal-empty'; grid.appendChild(e); }
    for (var d = 1; d <= days; d++){
      var k = key(viewYear, viewMonth, d);
      var cell = document.createElement('div');
      cell.className = 'cal-cell';
      if (viewYear === today.getFullYear() && viewMonth === today.getMonth() && d === today.getDate()) cell.classList.add('cal-is-today');
      if (festMap[k]) { cell.classList.add('cal-has-fest'); cell.title = festMap[k]; }
      cell.innerHTML = '<span class="cal-num">' + d + '</span>';
      grid.appendChild(cell);
    }
    renderList();
  }
  document.getElementById('calPrev').addEventListener('click', function(){ viewMonth--; if (viewMonth < 0){ viewMonth = 11; viewYear--; } render(); });
  document.getElementById('calNext').addEventListener('click', function(){ viewMonth++; if (viewMonth > 11){ viewMonth = 0; viewYear++; } render(); });
  document.getElementById('calToday').addEventListener('click', function(){ viewYear = today.getFullYear(); viewMonth = today.getMonth(); render(); });
  render();
})();
