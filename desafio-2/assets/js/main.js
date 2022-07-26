const desafio = {
    "insurances": [{
        "id": 3322,
        "name": "Amil"
    }, {
        "id": 3293,
        "name": "Bradesco"
    }, {
        "id": 99231,
        "name": "Hapvida"
    }, {
        "id": 1322,
        "name": "CASSI"
    }, {
        "id": 23111,
        "name": "Sulamérica"
    }],
    "guides": [{
        "number": "3210998321",
        "start_date": "2021-04-23T19:18:47.210Z",
        "patient": {
            "id": 9321123,
            "name": "Augusto Ferreira",
            "thumb_url": "https://imgsapp2.correiobraziliense.com.br/app/noticia_127983242361/2019/10/04/794834/20191004154953157610i.jpg"
        },
        "insurance_id": 1322,
        "health_insurance": {
            "id": 1322,
            "name": "CASSI",
            "is_deleted": false
        },
        "price": 5567.2
    }, {
        "number": "287312832",
        "start_date": "2021-04-23T19:18:47.210Z",
        "patient": {
            "id": 93229123,
            "name": "Caio Carneiro",
            "thumb_url": "http://3.bp.blogspot.com/-XG5bGlqGnJw/T9lIcssnybI/AAAAAAAADTA/B23ezXOkx8Y/s1600/Aang.jpg"
        },
        "insurance_id": 1322,
        "health_insurance": {
            "id": 1322,
            "name": "CASSI",
            "is_deleted": false
        },
        "price": 213.3
    }, {
        "number": "283718273",
        "start_date": "2021-04-22T19:18:47.210Z",
        "patient": {
            "id": 213122388,
            "name": "Luciano José",
            "thumb_url": "https://shorturl.ae/YKOXC"
        },
        "insurance_id": 3293,
        "health_insurance": {
            "id": 3293,
            "name": "Bradesco",
            "is_deleted": true
        },
        "price": 88.99
    }, {
        "number": "009090321938",
        "start_date": "2021-04-20T19:18:47.210Z",
        "patient": {
            "id": 3367263,
            "name": "Felício Santos",
            "thumb_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPSxlYabmRlKk43uvsBMIqjA7Rw_YCwK4TyA&usqp=CAU"
        },
        "insurance_id": 3293,
        "health_insurance": {
            "id": 3293,
            "name": "Bradesco",
            "is_deleted": true
        },
        "price": 828.99
    }, {
        "number": "8787128731",
        "start_date": "2021-04-01T19:18:47.210Z",
        "patient": {
            "id": 777882,
            "name": "Fernando Raposo"
        },
        "insurance_id": 3322,
        "health_insurance": {
            "id": 3322,
            "name": "Amil",
            "is_deleted": false
        },
        "price": 772
    }, {
        "number": "12929321",
        "start_date": "2021-04-02T19:18:47.210Z",
        "patient": {
            "id": 221,
            "name": "Paciente com nome grante pra colocar text ellipsis testando nome com paciente grande"
        },
        "insurance_id": 3322,
        "health_insurance": {
            "id": 3322,
            "name": "Amil",
            "is_deleted": false
        },
        "price": 221
    }]
}
const { insurances, guides } = desafio;

const checked = {};
const selectCheck = (number) => (checked[number] = !checked[number])

let array = guides;
let items = [];

pagination(1);

function pagination(value) {
    let pageQuery = value;
    let page = parseInt(pageQuery) || 1;
    let limit = 2;
    let offset = (page - 1) * limit;
    let total = array.length;
    items = array.slice(offset, offset + limit);

    let pageSize = Math.ceil(total/limit);

    let _pagination = {
        page: page,
        total: total,
        limit: limit,
        pages: pageSize
    };

    const paginationResult = _pagination;
    let paginationItems = '';

    for (let i = 0; i < paginationResult.pages; i++) {
        let active = page === (i + 1) ? 'active' : '';
        paginationItems += `<button class="pagination_link ${active}" onclick="button(${i + 1})" style="margin:5px">${i + 1}</button>`
    };

    document.getElementById('pagination_link').innerHTML = paginationItems;
    preencherTabela(items);
};

function button(value){
    pagination(value);
};

function preencherTabela(guias) {

    let tabela = guias.reduce((print, guide) => {
        let titulo = "";
        let risco = "";

        if (guide.health_insurance.is_deleted) {
            titulo = "Convênio apagado";
            risco = "item-riscado";
        }  

        print += `
            <tr>
                <td><input ${checked[guide.number] ? "checked" : "unchecked"} onchange="selectCheck('${guide.number}')" type="checkbox" id="checkbox"></td>
                <td>${new Date(guide.start_date).toLocaleDateString('pt-br')}</td>
                <td>${guide.number}</td>
                <td><img src="${guide.patient.thumb_url || "https://shorturl.ae/YKOXC"}">${guide.patient.name}</td>
                <td class="${risco}" title="${titulo}">${guide.health_insurance.name}</td>
                <td>${guide.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>         
            </tr>`

        return print
    }, '');

    if (!guias.length) {
        html = `<tr><td colspan="6" style="text-align: center">Nenhuma guia encontrada</td></tr>`
    }

    document.getElementById('main-tbl').innerHTML = tabela;
};
preencherTabela(items);

function nomeConvenios(convenios) {

    let html = '<option value="">Convênio</option>';

    convenios.forEach(insurance => {

        html += `<option value="${insurance.id}">${insurance.name}</option>`

    });

    document.getElementById('conv-btn').innerHTML = html;
};
nomeConvenios(insurances);


const startDate = document.getElementById('start-date');
const finalDate = document.getElementById('final-date');
const btnMes = document.getElementById('btn-mes');
const btnHoje = document.getElementById('btn-hoje');
const diaAtual = new Date().getDate();
const mesAtual = new Date().getMonth() + 1;
const anoAtual = new Date().getUTCFullYear();

btnMes.addEventListener('click', function () {
    startDate.value = `${anoAtual}-${mesAtual < 10 ? '0' + mesAtual : mesAtual}-01`;
    finalDate.value = `${anoAtual}-${mesAtual < 10 ? '0' + mesAtual : mesAtual}-30`;
    filter();
});

btnHoje.addEventListener('click', function () {
    startDate.value = `${anoAtual}-${mesAtual < 10 ? '0' + mesAtual : mesAtual}-${diaAtual < 10 ? '0' + diaAtual : diaAtual}`;
    finalDate.value = `${anoAtual}-${mesAtual < 10 ? '0' + mesAtual : mesAtual}-${diaAtual < 10 ? '0' + diaAtual : diaAtual}`;
    filter();
});

const filter = () => {

    const selectValue = ~~document.getElementById('conv-btn').value;
    const inputValue = document.getElementById('search-box').value;
    const inputNormalize = inputValue.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const normalizeStartDate = startDate.value;
    const normalizeFinalDate = finalDate.value;

    if (!selectValue && !inputNormalize && !startDate.value && !finalDate.value) {
        array = guides;
        pagination();
        return preencherTabela(items);
    }

    const guideFilter = guides.filter(guide => {
        
        let isValid = true;
        const num = guide.number;
        const id = guide.insurance_id;
        const nameNormalize = guide.patient.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const dataNormalize = new Date(guide.start_date).toISOString().slice(0, 10)
        
        if (selectValue && selectValue !== id) {
            isValid = false;
        }
        
        if (inputNormalize && !nameNormalize.includes(inputNormalize) && !num.includes(inputNormalize)) {
            isValid = false;
        }
        
        if (normalizeStartDate && normalizeStartDate !== dataNormalize && normalizeStartDate > dataNormalize) {
            isValid = false;
        }

        if (normalizeFinalDate && normalizeFinalDate !== dataNormalize && normalizeFinalDate < dataNormalize) {
            isValid = false;
        }

        if (checked[guide.number]) {
            isValid = true
        }
        
        return isValid;
    });
    
    array = guideFilter;
    pagination();
    preencherTabela(items);
};