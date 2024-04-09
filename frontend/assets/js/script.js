const modal = document.querySelector('.modal-container')
const sNome = document.querySelector('#nomeInterno')
const sCpf = document.querySelector('#cpfInterno')
const sIdade = document.querySelector('#idadeInterno')
const buttonSave = document.querySelector('#cadastratInterno')
const cadastrarInterno = document.querySelector('#cadastrarInterno')

let id
let itens = []
let mode
const container = document.querySelector(".container");

async function createInterno() {
    const url = "http://localhost:3333/interno"
    const nomeInterno = document.getElementById("nomeInterno").value
    const cpfInterno = document.getElementById("cpfInterno").value
    const idadeInterno = document.getElementById("idadeInterno").value

    const body = {
        "nomeInterno" : nomeInterno,
        "cpfInterno" : cpfInterno,
        "idadeInterno" : idadeInterno
    }

    const header = {
        "Content-Type": "application/json"
    }

    try {
        await axios.post(url, body, header)

        contentLoad()
    } catch(error) {
        alert(error)
    }
    
}

function post(url, body, header) {
    fetch(url,
        {
            method: "POST",
            headers: header,
            body: JSON.stringify(body)
        }
    )

    .then((response) => response.json())
    .then((body) => console.log("Success:", body))
    .catch((err) => console.log('Erro de solicitação', err))
}

function getInterno(item) {
    const tableContent = document.createElement('div')
    tableContent.classList.add('perfil')
    const table = document.querySelector(".container")
        tableContent.innerHTML = `<img src="./assets/images/Perfil.png" alt="Interno perfil">
                                    <div class="infos">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Nome:</th>
                                                    <th>CPF:</th>
                                                    <th>Idade:</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td id="nomeInterno">${item.nomeInterno}</td>
                                                    <td id="cpfInterno">${item.cpfInterno}</td>
                                                    <td id="idadeInterno">${item.idadeInterno}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="functions">
                                        <div class="excluir">
                                            <button onclick="deleteInterno(${item.idInterno})">Excluir</button>
                                        <img src="./assets/images/excluir.png" alt="Excluir">
                                        </div>
                                        <div class="editar" >
                                            <button onclick="editItem(${item.idInterno})">Editar</button>
                                            <img src="./assets/images/editar.png" alt="Editar">
                                        </div>
                                    </div>`;
            table.appendChild(tableContent)
}

async function get() {
    try {
        const response = await axios.get("http://localhost:3333/internos")
        return response.data
    } catch(error) {
        alert(error)
        return
    }
}

async function deleteInterno(itemIndex) {
    console.log(itemIndex)
    try {
        const response = await axios.delete(`http://localhost:3333/interno/${itemIndex}`);
        contentLoad()
    } catch (error) {
        alert(error)
    }
}

async function editInterno(bodyItem, itemIndex) {
    const body = {
        "idInterno": itemIndex,
        "nomeInterno": bodyItem.nomeInterno,
        "cpfInterno": bodyItem.cpfInterno,
        "idadeInterno": bodyItem.idadeInterno
    }
    console.log(body)
    try {
        const response = await axios.put(`http://localhost:3333/internos`, body);
        console.log('Item editado:', response.data);

        contentLoad();
    } catch (error) {
        alert(error);
    }
    sNome.value = '';
    sCpf.value = '';
    sIdade.value = '';
}

async function contentLoad() {
    
    try {
        itens = await get()
        container.innerHTML = "";
        itens.forEach((item) => {
            getInterno(item)
        })
    } catch(error) {
        console.log(error)
    }
    
}

function openModal(edit = false, index = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
        if(e.target.className.indexOf('modal-container') != -1){
            modal.classList.remove('ative')
        }
    }
    console.log(index)

    sNome.value = ""
    sCpf.value = ""
    sIdade.value = ""

    if(edit) {
        id = index
        mode = edit
    }
}

function editItem(itemIndex){
    openModal(true, itemIndex)
}

cadastrarInterno.onclick = e => {
    if (sNome.value == '' || sCpf.value == '' || sIdade.value == '') {
        return
      }
    
      e.preventDefault();

        const body = {
            "nomeInterno": sNome.value,
            "cpfInterno": sCpf.value,
            "idadeInterno": sIdade.value
        }

    
        console.log("mode: ",mode)
        
        if (mode == true)
        {
            editInterno(body, id)
            mode = false
        } else
        {
            createInterno(body)
            console.log('else')
        }

    modal.classList.remove('active')
    id = undefined
}

contentLoad()