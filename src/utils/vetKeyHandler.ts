import * as vscode from "vscode";

interface VetKeyInterface {
  file: vscode.Uri;
  content: string;
}

export async function getVetKey(filename: string = "vetKey"): Promise<VetKeyInterface> {
  let { 0: file } = await vscode.workspace.findFiles(`**/${filename}.php`, "", 1);

  if (!file) {
    throw new Error("O arquivo da vetKey não foi encontrado.");
  }

  let content = (await vscode.workspace.fs.readFile(file)).toString();

  return {
    file,
    content,
  };
}

export function getPathnames(vetKey: string): string[] {
  const pathnames = vetKey.match(/((\w+-)+\w+)/g);
  if (!pathnames) {
    throw new Error("Nenhuma url encontrada na vetKey.");
  }

  return pathnames;
}
