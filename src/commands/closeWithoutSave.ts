import * as vscode from "vscode";

async function closeWithoutSave() {
	const editor = vscode.window.activeTextEditor;

	if (editor) {
		if (editor.document.isDirty) {
			await vscode.commands.executeCommand("workbench.action.files.revert");
		}

		await vscode.commands.executeCommand("workbench.action.closeActiveEditor");
	}
}

export default closeWithoutSave;
