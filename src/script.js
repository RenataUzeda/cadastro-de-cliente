document.getElementById("cadastroForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const celular = document.getElementById("celular").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const mensagem = document.getElementById("mensagem");

    if (!nome || !email || !celular || !senha) {
        mensagem.textContent = "Preencha todos os campos!";
        mensagem.style.color = "red";
        return;
    }

    if (!/^\d{11}$/.test(celular)) {
        mensagem.textContent = "Celular deve ter 11 números!";
        mensagem.style.color = "red";
        return;
    }

    try {
        const response = await axios.post("https://cadastro-de-cliente-server.vercel.app/cadastro", {
            nome,
            email,
            celular,
            senha
        });

        mensagem.textContent = response.data.mensagem || "Cadastro realizado com sucesso!";
        mensagem.style.color = "green";

        document.getElementById("cadastroForm").reset();
    } catch (error) {
        mensagem.textContent = error.response?.data?.message || "Erro ao cadastrar cliente!";
        mensagem.style.color = "red";
        document.getElementById("cadastroForm").elements["email"].value = "";
    }
});
