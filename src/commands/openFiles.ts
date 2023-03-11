import * as vscode from "vscode";
import { getFile, getPathnames, getVetFiles } from "../utils/fileHandler";

const REGEX_PATHNAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/gm;

async function openFiles() {
	const editor = vscode.window.activeTextEditor;
	let selectedPathnames: string[] = [];

	try {
		if (!vscode.workspace.workspaceFolders) {
			throw new Error("Pasta do projeto não encontrada.");
		}
		const rootUri = vscode.workspace.workspaceFolders[0].uri;

		if (editor) {
			if (editor.selections.length > 0) {
				if (editor.selections.length === 1) {
					const text = editor.document.getText(editor.selections[0]);
					const splittedPathnames = text.split("\n");

					for (let index = 0; index < splittedPathnames.length; index++) {
						if (splittedPathnames[index].match(REGEX_PATHNAME)) {
							selectedPathnames.push(splittedPathnames[index]);
						}
					}
				} else {
					for (let index = 0; index < editor.selections.length; index++) {
						const text = editor.document.getText(editor.selections[index]);
						if (text.match(REGEX_PATHNAME)) {
							selectedPathnames.push(text);
						}
					}
				}
			}
		}

		let pathnames: string[];
		if (selectedPathnames.length > 0) {
			pathnames = selectedPathnames;
		} else {
			const vetOptions = await getVetFiles();
			const result = await vscode.window.showQuickPick(vetOptions, {});
			
			if (!result) {
				return;
			}

			const { content } = await getFile(rootUri, result);
			pathnames = getPathnames(content);
			console.log(pathnames);
		}

		for (let index = 0; index < pathnames.length; index++) {
			const uri = vscode.Uri.file(`${rootUri.fsPath}/${pathnames[index]}.php`);
			vscode.commands.executeCommand("vscode.open", uri, { preview: false, preserveFocus: false });
		}
	} catch (e) {
		if (typeof e === "string") {
			vscode.window.showErrorMessage(e);
		} else if (e instanceof Error) {
			vscode.window.showErrorMessage(e.message);
		}
	}
}

export default openFiles;
