const change = cls => {
    if (Math.random() < 0.09487) {
        setTimeout(() => {
            let a = document.createElement('a');
            a.href = 'https://youtu.be/jNQXAC9IVRw';
            a.click();
        }, 1487);
    }
    const table = document.getElementById('table');
    table.children[2].innerHTML = '';
    if (sc[cls] === undefined) {
        table.children[0].innerText = 'Not Found';
        table.children[1].setAttribute('hidden', '');
        return;
    }
    table.children[0].innerText = `Class ${cls}`;
    table.children[1].removeAttribute('hidden');
    for (let i = 0; i < sc[cls].length; i++) {
        let tr = document.createElement('tr'),
            th = document.createElement('th');
        table.children[2].appendChild(tr);
        tr.appendChild(th);
        th.innerText = i + 1;
        th.classList.add('fs-4');
        for (let j = 0; j < sc[cls][i].length; j++) {
            let td = document.createElement('td');
            tr.appendChild(td);
            if (sc[cls][i][j])
                td.innerHTML = `<div class="fs-4">${cs[sc[cls][i][j] >> 8]}</div><div>${cs[sc[cls][i][j] & 255]}</div>`;
        }
    }
};

(() => {
    const selected = '306',
        select = document.getElementById('select');
    for (const cls in sc) {
        let opt = document.createElement('option');
        select.appendChild(opt);
        opt.value = cls;
        opt.innerText = cls;
        if (cls == selected) {
            opt.selected = true;
            change(cls);
        }
    }
    let opt = document.createElement('option');
    opt.value = 'TST';
    opt.innerText = 'Test';
    select.appendChild(opt);
    select.onchange = () => {
        change(select.selectedOptions[0].value)
    };
})();