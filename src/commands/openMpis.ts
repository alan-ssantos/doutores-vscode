import * as vscode from "vscode";
import { getUrls } from "../utils/getUrls";

export async function openMpis() {
  // Busca o arquivo vetKey na pasta do projeto
  let { 0: vetKey } = await vscode.workspace.findFiles("**/vetKey.php", "", 1);
  // Guarda a pasta local, baseado no local da vetKey
  const local = vscode.workspace.getWorkspaceFolder(vetKey);

  // Lê o arquivo da vetKey e transforma em string;
  let vetKeyFile = await vscode.workspace.fs.readFile(vetKey);
  let vetKeyContent = vetKeyFile.toString();

  // Recebe um array com as urls das mpis
  const vetArray = getUrls(vetKeyContent);

  vetArray.forEach((vet) => {
    // Caminho do arquivo da mpi
    const uri = vscode.Uri.parse(`${local?.uri.path}/${vet}.php`);

    // Abre o arquivo
    vscode.workspace.openTextDocument(uri).then(
      (document: vscode.TextDocument) => {
        vscode.window.showTextDocument(document, { preview: false }).then(() => {});
      },
      (err) => {
        console.error(err);
      }
    );
  });
}
