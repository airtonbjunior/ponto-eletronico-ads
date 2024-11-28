// TO-DO:
// Organizar código

const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");
const arrayDayWeek = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sabado"]

const dialogPonto = document.getElementById("dialog-ponto");



function getUserLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            let userLocation = {
                "latitude": position.coords.latitude,
                "longitude": position.coords.longitude
            }
            resolve(userLocation);
        },
        (error) => {
            reject(error);
        })
    })
}


let proxPonto = {
    "entrada": "intervalo",
    "intervalo": "volta-intervalo",
    "volta-intervalo": "saida",
    "saida": "entrada"
}


let dialogHora = document.getElementById("dialog-hora");
let dialogData = document.getElementById("dialog-data");

dialogData.textContent = "Data: " + dataCompleta();

// TO-DO:
// apresentar para o usuário a data e hora atualizados
// atualizar a data todos os dias 00:00
// atualizar a hora todo segundo
const btnRegistrarPonto = document.getElementById("btn-registrar-ponto");
btnRegistrarPonto.addEventListener("click", () => {
    let dialogSelect = document.getElementById("select-tipos-ponto");
    let ultimoPonto = localStorage.getItem("tipoUltimoPonto");
    dialogSelect.value = proxPonto[ultimoPonto];
    
    
    //dialogHora.textContent = horaCompleta();

    dialogPonto.showModal();
});


const btnDialogFechar = document.getElementById("btn-dialog-fechar");
btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
});


function recuperaPontosLocalStorage() {
    let todosOsPontos = localStorage.getItem("registro");

    if(!todosOsPontos) {
        return [];
    }

    return JSON.parse(todosOsPontos);
}



function salvarRegistroLocalStorage(ponto) {
    let pontos = recuperaPontosLocalStorage();
    
    pontos.push(ponto);
    // 1 - recuperar os registros anteriores
    // 2 - adicionar o novo registro (ponto) no final do array de registros

    localStorage.setItem("registro", JSON.stringify(pontos));
}

const divAlerta = document.getElementById("div-alerta");

const btnDialogRegistrarPonto = document.getElementById("btn-dialog-registrar-ponto");
btnDialogRegistrarPonto.addEventListener("click", async () => {
    // chamar o endpoint de criação de ponto (/ponto) com os dados no body
    
    
    let data = dataCompleta();
    let hora = horaCompleta();
    let tipoPonto = document.getElementById("select-tipos-ponto").value;

    let location = await getUserLocation();

    let ponto = {
        "data": data,
        "hora": hora,
        "tipo": tipoPonto,
        "location": location,
        "id": 1
    }

    // TO-DO:
    // Somente o ultimo registro está sendo salvo
    // Garantir que o código persista sempre o histórico todo
    // Salvar os registros em um array de objetos de registro
    salvarRegistroLocalStorage(ponto);
    
    localStorage.setItem("tipoUltimoPonto", tipoPonto);

    // TO-DO:
    // salvar o útimo tipo do ponto registrado pelo usuário
    // fazer o select considerar esse último ponto e selecionar, por padrão
    // o próximo possível ponto do usuário
    // Exemplo: usuário registrou "entrada", determinar que o select apresente "intervalo" como valor padrão

    console.log(ponto);
    dialogPonto.close();

    divAlerta.classList.remove("hidden");
    divAlerta.classList.add("show");

    setTimeout(() => {
        divAlerta.classList.remove("show");
        divAlerta.classList.add("hidden");
    }, 5000);
});

function daySemana() {
    const date = new Date();
    return arrayDayWeek[date.getDay()];
}

function dataCompleta() {
    const date = new Date();
    return String(date.getDate()).padStart(2, '0') + "/" + String(date.getMonth() + 1).padStart(2, '0') + "/" + date.getFullYear();
}

function horaCompleta() {
    const date = new Date();
    return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
}

function atualizaHora() {
    horaMinSeg.textContent = horaCompleta();
}

function atualizaHoraDialog() {
    dialogHora.textContent = "Hora: " + horaCompleta();
}

atualizaHora();
setInterval(atualizaHora, 1000);

atualizaHoraDialog()
setInterval(atualizaHoraDialog, 1000);

diaSemana.textContent = daySemana();
diaMesAno.textContent = dataCompleta();
