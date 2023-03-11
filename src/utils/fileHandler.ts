import * as vscode from "vscode";

interface VetKeyInterface {
	fileUri: vscode.Uri;
	content: string;
}

export async function getFile(rootUri: vscode.Uri): Promise<VetKeyInterface> {
	const filePath: string = vscode.workspace.getConfiguration("doutores.openFiles").get("filePath") || "";
	const fileUri = vscode.Uri.file(`${rootUri.fsPath}/${filePath}`);

	let content = (await vscode.workspace.fs.readFile(fileUri)).toString();

	return {
		fileUri,
		content,
	};
}

export function getPathnames(vetKey: string): string[] {
	const urls = [...vetKey.matchAll(/"url"\s*=>\s*"([a-z0-9-]+)"/g)];

	if (!urls) {
		throw new Error("Nenhum caminho foi encontrado no arquivo encontrada na vetKey.");
	}

	const pathnames = urls.map(([match, slug]) => slug);

	return pathnames;
}
