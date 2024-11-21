const btnCriaUsuario = document.getElementById("btn-criar-usuario");

btnCriaUsuario.addEventListener("click", async () => {
    
    const reposta = await fetch('http://localhost:3000/usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            login: document.getElementById("login").value,
            senha: document.getElementById("senha").value
        })
    })
    .then(() => {
        console.log("Usuário criado com sucesso!");
    })
    .catch(error => {
        console.log(error);
    });
});