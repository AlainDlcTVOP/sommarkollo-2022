let intressenList = []
const HTML_ID_FORM_ANMALAN = 'anmalan-till-kollo'

function addInterestList() {
    const element = document.getElementById('intressen-input')
    if (element === null || element.value === null || element.value.trim().length === 0) return;
    intressenList.push(element.value)
    element.value = ''
    refreshInterestList()
    resetValidateAnmalan()
}

function removeIdInterestList(index) {
    intressenList.splice(index, 1);
    refreshInterestList()
}

function refreshInterestList() {
    let selectElement = document.getElementById('intressen-list')
    let selectElementTextarea = document.getElementById('intressen-list-text')
    selectElement.innerHTML = ''
    selectElementTextarea.value = ''
    let myText = ''
    intressenList.forEach((value, index) => {
        selectElement.appendChild(createRow(index, value))
        myText += value + '\r\n'
    })

    selectElementTextarea.value = myText
}

function createRow(index, intresse) {
    let row = document.createElement('div')
    row.setAttribute('class', 'intressen-row')
    const node = document.createTextNode(intresse)
    row.appendChild(node)
    row.appendChild(createDeleteButton(index))

    return row
}

function createDeleteButton(index) {
    let link = document.createElement('a')
    var img = document.createElement('img');
    link.setAttribute('href', 'javascript:removeIdInterestList(' + index + ')');
    link.setAttribute('title', 'Ta bort denna rad')
    img.setAttribute('class', 'intressen-delete-knapp-img')
    link.appendChild(img);
    return link
}

function resetKompis() {
    let selectElement = document.getElementById('kompis-yes')
    selectElement.style.display = 'none'
    selectElement.querySelectorAll('input[type=checkbox]').forEach((el) => {
        el.checked = false;
    })
}

function showKompis() {
    let selectElement = document.getElementById('kompis-yes')
    selectElement.style.display = 'block';
}

function sendAnmalan() {
    if (!validateAnmalan()) {
        return;
    }
    let form = document.forms[HTML_ID_FORM_ANMALAN];
    let formData = new FormData(form);
    let object = {};

    formData.forEach((value, key, fd) => {
        if (!Reflect.has(object, key)) {
            object[key] = value
            return
        }
        if (!Array.isArray(object[key])) {
            object[key] = [object[key]];
        }
        object[key].push(value)
    })
    object['intressen'] = intressenList // temp workaround pga textarean
    let json = JSON.stringify(object);

    let http = new XMLHttpRequest();

    // https://beeceptor.com/console/sommarkolloanmalan
    http.open('POST', 'https://sommarkolloanmalan.free.beeceptor.com/sendkolloanmalan', true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function () {
        if (http.readyState === XMLHttpRequest.DONE) {
            let sucessfulElement = document.getElementById('form-sucessful-anmalan-message')
            let errorElement = document.getElementById('form-error-message')
            if (http.status === 0 || (http.status >= 200 && http.status < 400)) {
                // SUCESS
                sucessfulElement.style.display = 'block'
                errorElement.style.display = 'none'
                sucessfulElement.scrollIntoView()
                setDatatoSent(json)
                form.style.display = 'none' // Dölj formuläret
            } else {
                // ERROR
                errorElement.style.display = 'block'
                errorElement.scrollIntoView()
                sucessfulElement.style.display = 'none'
            }
        }
    }
    http.send(json);
}

function validateAnmalan() {
    let failed = false;
    let intressenMessageElement = document.getElementById('intressen-input-validator')
    if (intressenList.length === 0) {
        intressenMessageElement.style.display = 'block'
        intressenMessageElement.scrollIntoView()
        failed |= true
    } else {
        intressenMessageElement.style.display = 'none'
    }
    return !failed
}

function resetValidateAnmalan() {
    let selectElement = document.getElementById('intressen-input-validator')
    selectElement.style.display = 'none'
}

function setDatatoSent(test) {
    const TAG = 'sent_'
    let json = JSON.parse(test)
    for (let key in json) {
        if (json.hasOwnProperty(key)) {
            let selectElement = document.getElementById(TAG + key)
            let object = json[key]
            if (object.constructor.name == 'Array') {
                selectElement.innerHTML = object.join(', ')
            } else {
                selectElement.innerHTML = object
            }
        }
    }
}