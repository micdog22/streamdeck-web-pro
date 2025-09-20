
# Web Stream Deck PRO for OBS (HTML + JS, PWA)

Painel web avançado para controlar o **OBS Studio** via **obs-websocket v5**. Sem servidor, ideal para **GitHub Pages** ou uso local. Inclui **layout arrastável**, **macros** (várias ações em sequência), **perfis**, **atalhos de teclado**, **PWA offline** e **modo demo** para testar sem o OBS.

## Principais recursos
- Conexão ao OBS por WebSocket (v5) com autenticação por desafio.
- Deck com **arrastar e soltar** para reordenar, **redimensionar** tile (colspan/rowspan) e **edição por clique longo**.
- **Botões com ações**: trocar cena, alternar mute de input, mostrar/ocultar item de cena, iniciar/parar stream, gravação e câmera virtual, salvar replay buffer, **request custom** e **macro** (lista de requests).
- **Perfis**: crie vários layouts nomeados, ative, exporte/importa como JSON e compartilhe por **link** (query `?s=` com JSON Base64URL).
- **Atalhos de teclado**: atribua uma tecla por botão.
- **PWA**: adicionável à tela inicial e funcional offline (UI). O controle do OBS requer rede local com o OBS aberto.
- **Modo Demo**: simula respostas do OBS para você montar e validar o deck antes de conectar.

## Requisitos
- OBS 28+ com **obs-websocket v5** habilitado. Defina uma senha em Tools → WebSocket Server Settings.
- Para GitHub Pages (HTTPS), é preciso usar **WSS** via proxy TLS ou abrir a página via **HTTP local** (ex.: `python -m http.server`).

## Uso rápido
1. Abra `index.html` servindo via HTTP local ou publique no Pages.
2. Informe `URL` (ex.: `ws://127.0.0.1:4455`) e senha; clique **Conectar**.
3. Clique em **Editar** para organizar o grid, **+ Novo** para criar botões.
4. Para macro, selecione tipo **Macro** e adicione passos (requests) que executam em sequência.
5. Salve como **Perfil** (menu perfis). Exporte para JSON quando quiser.
6. Para testar sem OBS, habilite **Modo Demo** no topo; os botões funcionam e atualizam indicadores.

## HTTPS x ws://
- Em HTTPS, o navegador bloqueia `ws://`. Para contornar:
  - Rode a página localmente via HTTP (apenas para uso pessoal na rede).
  - Configure um proxy reverso TLS que exponha `wss://...` encaminhando para `ws://127.0.0.1:4455`.

## Segurança
- Use senha forte no WebSocket, restrinja acesso a IPs confiáveis e prefira WSS quando exposto.
- Por padrão a senha **não é salva**. Você pode marcar “Lembrar senha” se for uso pessoal e local.

## Estrutura
- `index.html` — app completo (UI + lógica).
- `manifest.webmanifest` — manifesto PWA.
- `sw.js` — service worker com cache estático.
- `README.md` — este arquivo.
- `LICENSE` — MIT.

## Export/Import/Link
- **Exportar** baixa um `.json` com o layout do perfil atual.
- **Importar** carrega um `.json` e substitui o layout do perfil ativo.
- **Compartilhar Link** gera URL com `?s=...` contendo o layout Base64URL; ao abrir, você pode mesclar ao perfil.

## Tipos de ação (requests v5)
- Cenas: `SetCurrentProgramScene`, `GetSceneItemList`, `SetSceneItemEnabled`.
- Inputs: `GetInputMute`, `SetInputMute`.
- Saídas: `Start/StopStream`, `Start/StopRecording`, `Start/StopVirtualCam`, `SaveReplayBuffer`.
- Custom: envie `requestType` e `requestData` (JSON).
- Macro: sequência de ações acima, executadas com pequena espera entre elas.

## Licença
MIT.
