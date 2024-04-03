import * as vscode from "vscode";

interface VetKeyInterface {
	fileUri: vscode.Uri;
	content: string;
}

export async function getVetFiles(ignoreVetKey?: boolean): Promise<string[]> {
	const files = await vscode.workspace.findFiles("inc/vet*php", ignoreVetKey ? "inc/vet[Kk][Ee][Yy].php" : null);
	const pathnames = files
		.map((file) => {
			const fileName = file.path.split("inc/");
			return `inc/${fileName[1]}`;
		})
		.sort();

	return pathnames;
}

export async function getFile(rootUri: vscode.Uri, filePath: string): Promise<VetKeyInterface> {
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

	return urls.map(([m, slug]) => slug);
}

export function getVetTitles(vetKey: string): string[] {
	const titles = [...vetKey.matchAll(/"(key|title)"\s?=>\s?"(.*?)"/g)];

	if (!titles) {
		throw new Error("Nenhum caminho foi encontrado no arquivo encontrada na vetKey.");
	}

	return titles.map(([m, k, title]) => title);
}
