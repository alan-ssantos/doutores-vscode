import * as vscode from "vscode";
import { getVetKey, getPathnames } from "../utils/vetKeyHandler";

async function openMpis() {
  try {
    if (!vscode.workspace.workspaceFolders) {
      throw new Error("Pasta do projeto não encontrada.");
    }
    const rootUri = vscode.workspace.workspaceFolders[0].uri;

    const { content } = await getVetKey();
    const pathnames = getPathnames(content);

    for (const pathname of pathnames) {
      try {
        const doc = await vscode.workspace.openTextDocument(`${rootUri.fsPath}/${pathname}.php`);
        vscode.window.showTextDocument(doc, { preview: false });
      } catch (error) {
        vscode.window.showErrorMessage(`Não foi possível abrir o arquivo ${pathname}.php`);
      }
    }
  } catch (e) {
    if (typeof e === "string") {
      vscode.window.showErrorMessage(e);
    } else if (e instanceof Error) {
      vscode.window.showErrorMessage(e.message);
    }
  }
}

export default openMpis;