"use strict";
/*number of passengers*/
const info = () => {
    let active = document.querySelectorAll('.active');
    let info = document.querySelector('.info-text');
    info.innerHTML = active.length;
};

const request = new XMLHttpRequest();
const url = "http://artemknutov.tech/search/js/data.json";
request.open('GET', url);
request.setRequestHeader('Content-Type', 'application/x-www-form-url');
request.addEventListener("readystatechange", () => {
    if (request.readyState === 4 && request.status === 200) {

        const data = JSON.parse(request.responseText );
        let tbody = document.querySelector('tbody');

        data.forEach((elem) => {
            let tr = document.createElement('tr');
            tr.className = 'active';
            tr.innerHTML = `
                    <th>${elem.id}</th>
                    <th>${elem.name}</th>
                    <th>${elem.gender}</th>
                    <th>${elem.age}</th>
                    <th>${elem.class}</th>
                    <th>${elem.luggage}</th>
        `;
            tbody.appendChild(tr);
        });
        info();
    }
});

request.send();

/*Output data from json*/
/*    fetch('http://artemknutov.tech/js/data.json', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    }).then(data => data.json()).then(data => {
        let tbody = document.querySelector('tbody');

        data.forEach((elem) => {
            let tr = document.createElement('tr');
            tr.className = 'active';
            tr.innerHTML = `
                    <th>${elem.id}</th>
                    <th>${elem.name}</th>
                    <th>${elem.gender}</th>
                    <th>${elem.age}</th>
                    <th>${elem.class}</th>
                    <th>${elem.luggage}</th>
        `;
            tbody.appendChild(tr);
        });

        info();
    });*/

/*Search*/
let search = document.getElementById('search-text');
let table = document.getElementById('info-table');

search.addEventListener('keyup', () => {

    let regularSearch = new RegExp(search.value, 'i');
    let flag = false;

    for (let i = 1; i < table.rows.length; i++) {
        flag = false;

        for (let j = table.rows[i].cells.length - 1; j >= 0; j--) {
            flag = regularSearch.test(table.rows[i].cells[j].innerHTML);
            if (flag) {
                break;
            }
        }

        if (flag) {
            table.rows[i].style.display = "";
            table.rows[i].classList.add('active');
            info();

        } else {
            table.rows[i].style.display = "none";
            table.rows[i].classList.remove('active');
            info();

        }
    }

});


