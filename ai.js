const btn = document.getElementById("ask");
const result = document.getElementById("result");

btn.onclick = async () => {
  const prompt = document.getElementById("prompt").value.trim();

  if (!prompt) {
    result.textContent = "Digite algo primeiro.";
    return;
  }

  result.textContent = "Pensando...";

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/HuggingFaceTB/SmolLM3-3B",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer SUA_API_KEY_AQUI",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: prompt })
      }
    );

    if (!response.ok) {
      throw new Error("Erro HTTP " + response.status);
    }

    const data = await response.json();

    result.textContent =
      data?.[0]?.generated_text || "Sem resposta da IA.";
  } catch (err) {
    console.error(err);
    result.textContent = "Erro ao falar com a IA.";
  }
};
