import * as vscode from "vscode";

interface VetKeyInterface {
  fileUri: vscode.Uri;
  content: string;
}

export async function getVetKey(rootUri: vscode.Uri): Promise<VetKeyInterface> {
	const filename: string = vscode.workspace.getConfiguration("doutores.openMpis").get("fileName") || "vetKey";
	const fileUri = vscode.Uri.file(`${rootUri.fsPath}/${filename}`);

	let content = (await vscode.workspace.fs.readFile(fileUri)).toString();

	return {
		fileUri,
		content
	};
}

export function getPathnames(vetKey: string): string[] {
	const urls = vetKey.match(/url"\s=>\s"((\w+-)+\w+)/g);
	if (!urls) {
		throw new Error("Nenhuma url encontrada na vetKey.");
	}

	const pathnames = urls?.map((url) => url.replace(/url"\s=>\s"/g, ""));

	return pathnames;
}
