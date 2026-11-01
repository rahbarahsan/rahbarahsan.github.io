// "Built with" lines become chips; a tool with a Simple Icons mark gets its icon, the rest stay plain text
(() => {
  const CDN = "https://cdn.jsdelivr.net/npm/simple-icons@16.35.0/icons/";
  const ICON = {"Python":"python","Python 3.13":"python","FastAPI":"fastapi","Postgres":"postgresql","ElevenLabs":"elevenlabs",
    "Streamlit":"streamlit","JavaScript":"javascript","three.js":"threedotjs","Blender":"blender","scikit-learn":"scikitlearn",
    "Keras":"keras","TensorFlow":"tensorflow","pandas":"pandas","LangGraph":"langgraph","SQLite":"sqlite","React":"react",
    "React Native with Expo":"expo","TypeScript":"typescript","Docker":"docker","Pydantic":"pydantic","Redis":"redis",
    "Databricks":"databricks","Spark":"apachespark"};
  document.querySelectorAll("p.stack").forEach(p => {
    const label = p.querySelector("b"); if (!label) return;
    const tools = p.textContent.replace(label.textContent, "").split("·").map(s => s.trim()).filter(Boolean);
    const ul = document.createElement("ul"); ul.className = "chips"; ul.setAttribute("aria-label", label.textContent);
    tools.forEach(t => {
      const li = document.createElement("li");
      const slug = ICON[t];
      if (slug) { const im = new Image(); im.src = CDN + slug + ".svg"; im.alt = ""; im.width = 14; im.height = 14; im.onerror = () => im.remove(); li.appendChild(im); }
      li.appendChild(document.createTextNode(t)); ul.appendChild(li);
    });
    const wrap = document.createElement("div"); wrap.className = "built";
    const lb = document.createElement("span"); lb.className = "built-lb"; lb.textContent = label.textContent;
    wrap.append(lb, ul); p.replaceWith(wrap);
  });
})();
