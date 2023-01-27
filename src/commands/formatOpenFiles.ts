import * as vscode from "vscode";

async function formatOpenFiles() {
	const config = vscode.workspace.getConfiguration("doutores.formatOpenFiles");
	const editor = vscode.window.activeTextEditor;

	if (editor) {
		const documentos = vscode.workspace.textDocuments;
		const langs = ["php", "json", "js", "ts", "html", "css"];

		vscode.window.withProgress(
			{
				location: vscode.ProgressLocation.Notification,
				cancellable: true,
				title: "Formatando arquivos abertos...",
			},
			async (progress, token) => {
				let cancel = false;
				token.onCancellationRequested(() => {
					cancel = true;
				});

				progress.report({ increment: 0 });

				for (let index = 0; index < documentos.length; index++) {
					if (cancel) {
						break;
					}

					if (langs.includes(documentos[index].languageId)) {
						await vscode.commands.executeCommand("editor.action.formatDocument");
						await vscode.window.showTextDocument(documentos[index], { preview: false, preserveFocus: false });
					}

					progress.report({ increment: 100 / documentos.length, message: `${index} / ${documentos.length}` });
				}

				if (config.get("autoSave") === true) {
					await vscode.commands.executeCommand("workbench.action.files.saveAll");
				}
			}
		);
	}
}

export default formatOpenFiles;
