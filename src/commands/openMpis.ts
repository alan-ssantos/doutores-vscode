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

export default openMpis;
