# 🛠️ Documentação & Workflow: Padrão de Engenharia Renato Filho

Este guia define os padrões de manutenção e expansão da documentação deste projeto. Seguir este fluxo garante que a **Originalidade**, a **Tecnologia** e os **Negócios** estejam sempre alinhados.

---

## 1. O Padrão de Escrita (Tone of Voice)
- **Impacto Profissional**: Use termos técnicos precisos (ex: *Asynchronous Fetching*, *State Hydration*).
- **Analítico**: Sempre explique o **"Porquê"** de uma decisão, não apenas o "O quê".
- **Artístico**: Mantenha a narrativa de inspiração clássica e modernismo brasileiro.

## 2. Atualizando o `PANORAMA.md`
Sempre que um novo componente core ou hook for criado:
1. **Nome do Componente**: Identifique o arquivo.
2. **O Que Foi Feito**: Descrição funcional curta.
3. **Porquê & Para Quê**: Explique a decisão de UX ou de Negócio (ex: "Criamos este modal para aumentar a taxa de conversão em 20%").
4. **Termos Técnicos**: Liste as bibliotecas e padrões usados.

## 3. Gestão de Receita (Revenue Engineering)
Ao adicionar novos produtos ou parceiros:
- Garanta que as tags de **"Oferta"** ou **"Patrocínio"** sigam a estética premium da aplicação.
- Atualize os arquivos de dados em `src/data` (JSON-based data) para manter a modularidade.

## 4. Workflow de Documentação (Sprints)
1. **Desenvolvimento**: Codifique a feature.
2. **Review Técnico**: Verifique performance (Lighthouse).
3. **Sincronização de Docs**: Atualize o `README.md` (se houver mudança visual) e o `PANORAMA.md` (detalhes técnicos).
4. **Licenciamento**: Verifique se novos libs ferem a licença MIT do projeto.

---
"Documentar é a prova de que você não apenas sabe construir, você sabe liderar."
