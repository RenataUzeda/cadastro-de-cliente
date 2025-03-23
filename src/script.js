document.getElementById("cadastroForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const celular = document.getElementById("celular").value.trim();
    const mensagem = document.getElementById("mensagem");

    if (!nome || !email || !celular) {
        mensagem.textContent = "Preencha todos os campos!";
        mensagem.style.color = "red";
        return;
    }

    if (!/^\d{11}$/.test(celular)) {
        mensagem.textContent = "Celular deve ter 11 números!";
        mensagem.style.color = "red";
        return;
    }

    console.log("Cliente cadastrado:", { nome, email, celular });
    mensagem.textContent = "Cadastro realizado com sucesso!";
    mensagem.style.color = "green";

    // Limpar campos após cadastro
    document.getElementById("cadastroForm").reset();
});

