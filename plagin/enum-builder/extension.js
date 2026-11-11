'use strict';
const vscode = require('vscode');
const { randomBytes } = require('crypto');
const { generate } = require('./core');
/** Регистрирует команду и кнопку; освобождение ресурсов выполняет VS Code. */
function activate(context) {
  const command = vscode.commands.registerCommand('enumBuilder.open', () => {
    const panel = vscode.window.createWebviewPanel('enumBuilder', 'Enum Builder', vscode.ViewColumn.One, { enableScripts: true });
    const nonce = randomBytes(16).toString('hex');
    let result = '';
    panel.webview.html = html(nonce);
    const subscription = panel.webview.onDidReceiveMessage(async message => {
      if (!message || typeof message.type !== 'string') return;
      try {
        if (message.type === 'generate') {
          result = ''; // Не позволяем скопировать старый код после ошибки.
          result = generate(message.input);
          await panel.webview.postMessage({ code: result, error: '' });
        } else if (message.type === 'copy') {
          if (!result) throw new Error('Сначала успешно сгенерируйте код.');
          await vscode.env.clipboard.writeText(result);
          vscode.window.showInformationMessage('Код скопирован.');
        } else if (message.type === 'open') {
          if (!result) throw new Error('Сначала успешно сгенерируйте код.');
          const doc = await vscode.workspace.openTextDocument({ language: 'cpp', content: result });
          await vscode.window.showTextDocument(doc, vscode.ViewColumn.Beside);
        }
      } catch (error) {
        await panel.webview.postMessage({ code: '', error: error.message });
      }
    });
    panel.onDidDispose(() => subscription.dispose());
    context.subscriptions.push(panel);
  });
  const button = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  button.text = '$(symbol-enum) Enum Builder'; button.command = 'enumBuilder.open'; button.show();
  context.subscriptions.push(command, button);
}
/** Форма Webview; пользовательские строки выводятся через textContent. */
function html(nonce) {
  return `<!doctype html><html lang="ru"><head><meta charset="UTF-8">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'nonce-${nonce}'; script-src 'nonce-${nonce}';">
  <style nonce="${nonce}">body{font-family:var(--vscode-font-family);padding:24px;max-width:950px}textarea{box-sizing:border-box;width:100%;padding:12px;background:var(--vscode-input-background);color:var(--vscode-input-foreground);border:1px solid var(--vscode-input-border);font:16px monospace}button{padding:10px 16px;margin:12px 8px 12px 0;background:var(--vscode-button-background);color:var(--vscode-button-foreground);border:0;cursor:pointer}button:disabled{opacity:.45;cursor:default}pre{white-space:pre-wrap;padding:16px;background:var(--vscode-textCodeBlock-background)}#error{color:var(--vscode-errorForeground)}</style></head>
  <body><h1>Enum Builder для C++</h1><p>Формат: Имя: Элемент, Элемент=число, Элемент</p>
  <textarea id="input" rows="3">Status: New, Active=5, Done</textarea>
  <button id="generate">Сгенерировать</button><p id="error" role="alert"></p>
  <pre id="code"></pre><button id="copy" disabled>Скопировать</button><button id="open" disabled>Открыть C++ файл</button>
  <script nonce="${nonce}">
  const api = acquireVsCodeApi();
  const input = document.getElementById('input'), code = document.getElementById('code');
  const error = document.getElementById('error'), copy = document.getElementById('copy'), open = document.getElementById('open');
  function clear(){code.textContent='';error.textContent='';copy.disabled=true;open.disabled=true;}
  input.addEventListener('input', clear);
  document.getElementById('generate').onclick=()=>{clear();api.postMessage({type:'generate',input:input.value});};
  copy.onclick=()=>api.postMessage({type:'copy'});open.onclick=()=>api.postMessage({type:'open'});
  window.addEventListener('message',event=>{code.textContent=event.data.code;error.textContent=event.data.error;copy.disabled=!event.data.code;open.disabled=!event.data.code;});
  </script></body></html>`;
}
module.exports = { activate };
