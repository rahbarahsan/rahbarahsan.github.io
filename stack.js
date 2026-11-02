// "Built with" lines become chips. A tool gets its official colour logo from Devicon (MIT) when there is one,
// else its brand coloured mark from Simple Icons (CC0), else it stays plain text
(() => {
  const DEV = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/", SI = "https://cdn.simpleicons.org/";
  const ICON = {"Python":"d:python","Python 3.13":"d:python","FastAPI":"d:fastapi","Postgres":"d:postgresql",
    "ElevenLabs":"s:elevenlabs","Streamlit":"d:streamlit","JavaScript":"d:javascript","three.js":"d:threejs",
    "Blender":"d:blender","scikit-learn":"d:scikitlearn","Keras":"d:keras","TensorFlow":"d:tensorflow","pandas":"d:pandas",
    "LangGraph":"s:langgraph","SQLite":"d:sqlite","React":"d:react","React Native with Expo":"d:expo",
    "TypeScript":"d:typescript","Docker":"d:docker","Pydantic":"s:pydantic","Redis":"d:redis","Databricks":"s:databricks",
    "Spark":"d:apachespark","Azure":"d:azure","Azure Cosmos DB":"d:cosmosdb","Playwright":"d:playwright",
    "pytest":"d:pytest","Azure AI Foundry Agents":"d:azure","LangChain Deep Agents":"s:langchain"};
  document.querySelectorAll("p.stack").forEach(p => {
    const label = p.querySelector("b"); if (!label) return;
    const tools = p.textContent.replace(label.textContent, "").split("·").map(s => s.trim()).filter(Boolean);
    const ul = document.createElement("ul"); ul.className = "chips"; ul.setAttribute("aria-label", label.textContent);
    tools.forEach(t => {
      const li = document.createElement("li"), k = ICON[t];
      if (k) {
        const [src, slug] = k.split(":"), im = new Image();
        im.src = src === "d" ? `${DEV}${slug}/${slug}-original.svg` : SI + slug;
        im.alt = ""; im.width = 15; im.height = 15; im.onerror = () => im.remove(); li.appendChild(im);
      }
      li.appendChild(document.createTextNode(t)); ul.appendChild(li);
    });
    const wrap = document.createElement("div"); wrap.className = "built";
    const lb = document.createElement("span"); lb.className = "built-lb"; lb.textContent = label.textContent;
    wrap.append(lb, ul); p.replaceWith(wrap);
  });
})();
