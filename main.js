const table = document.getElementById('table'),
    select = document.getElementById('cls-select');

function changeSchedule(cls) {
    table.children[1].innerHTML = '';
    table.children[2].innerText = '';
    if (schedule[cls] === undefined) {
        table.children[0].classList.add('visually-hidden');
        table.children[2].innerText = 'Not Found';
        return;
    }
    table.children[0].classList.remove('visually-hidden');
    table.children[2].innerText = `Class ${cls}`;
    for (let i = 0; i < schedule[cls].length; i++) {
        let tr = document.createElement('tr'),
            th = document.createElement('th');
        table.children[1].appendChild(tr);
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
// changeSchedule('306');