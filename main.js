function changeSchedule(cls) {
  const table = document.getElementById('table');
  table.children[2].innerHTML = '';
  if (schedule[cls] === undefined) {
    table.children[0].innerText = 'Not Found';
    table.children[1].setAttribute('hidden', '');
    return;
  }
  table.children[0].innerText = `Class ${cls}`;
  table.children[1].removeAttribute('hidden');
  for (let i = 0; i < schedule[cls].length; i++) {
    let tr = document.createElement('tr'),
      th = document.createElement('th');
    table.children[2].appendChild(tr);
    tr.appendChild(th);
    th.innerText = i + 1;
    th.classList.add('fs-4');
    for (let j = 0; j < 5; j++) {
      let c = schedule[cls][i][j];
      let td = document.createElement('td');
      tr.appendChild(td);
      if (c.length)
        td.innerHTML = `<div class="fs-4">${c[0]}</div><div>${c[1]}</div>`;
    }
  }
}

(() => {
  const select = document.getElementById('select');
  for (const key in schedule) {
    let opt = document.createElement('option');
    opt.value = key;
    opt.innerText = key;
    if (key == '306') opt.selected = true;
    select.appendChild(opt);
  }
  let opt = document.createElement('option');
  opt.value = 'TST';
  opt.innerText = 'Test';
  select.appendChild(opt);
  select.onchange = () => {
    changeSchedule(select.selectedOptions[0].value)
  };
  changeSchedule('306');
})();