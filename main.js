const table = document.getElementById('table'),
    select = document.getElementById('select');

function changeSchedule(cls) {
    table.children[2].innerHTML = '';
    if (schedule[cls] === undefined) {
        table.children[1].classList.add('visually-hidden');
        table.children[0].innerText = 'Not Found';
        return;
    }
    table.children[0].innerText = `Class ${cls}`;
    table.children[1].classList.remove('visually-hidden');
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
            if (c.length) {
                td.innerHTML = `<div class="fs-4">${c[0]}</div><div>${c[1]}</div>`;
            }
        }
    }
}

select.onchange = () => {
    changeSchedule(select.selectedOptions[0].value)
};

(() => {
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
    changeSchedule('306');
})();