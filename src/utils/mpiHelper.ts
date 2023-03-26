import * as vscode from "vscode";

export function getPageDescription(document: vscode.TextDocument): { description: string; range: vscode.Range | undefined } {
	const documentText = document.getText();

	const regex = /\$desc[^;]*;/gm;
	const matches = regex.exec(documentText);

	if (!matches) {
		throw new Error(`A variável $desc não foi encontrada no documento. ${document.uri.path}`);
	}

	const positionStart = document.positionAt(matches.index);
	const positionEnd = document.positionAt(matches.index + matches[0].length);
	const range = new vscode.Range(positionStart, positionEnd);

	let description = matches[0];
	description = description.substring(description.indexOf('"') + 1, description.lastIndexOf('"'));

	return {
		description,
		range,
	};
}

export function getPageTitle(documentText: string): string {
	const regex = /\$h1\s*=\s*['"](.*?)['"];/gm;
	const match = regex.exec(documentText);

	if (!match) {
		throw new Error("A variável $h1 não foi encontrada no documento.");
	}

	return match[1].trim();
}

