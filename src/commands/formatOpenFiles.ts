import * as vscode from "vscode";

async function formatOpenFiles() {
  const config = vscode.workspace.getConfiguration('doutores.formatOpenFiles');
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const documentos = vscode.workspace.textDocuments;
    console.log(documentos.length);

    const langs = ["php", "json", "js", "ts", "html", "css"];
    for (const documento of documentos) {
      console.log(documento.languageId);
      if (langs.includes(documento.languageId)) {
        await vscode.window.showTextDocument(documento, { preview: false });
        await vscode.commands.executeCommand("editor.action.format");

        if (config.get('autoSave') === true) {
          await vscode.commands.executeCommand("workbench.action.files.save");
        }

        if (config.get('closeAfterFormat') === true) {
          await vscode.commands.executeCommand("workbench.action.closeActiveEditor");
        }
      }
    }
  }
}

export default formatOpenFiles;
