import * as vscode from "vscode";

type CommandList = {
	command: string;
	title: string;
};

async function runOnOpenFiles() {
	const editor = vscode.window.activeTextEditor;

	if (editor) {
		const documentos = vscode.workspace.textDocuments;
		const langs = ["php"];

		const commandList: CommandList[] = [
			{ command: "doutores.replaceDescription", title: "Substituir a descrição" },
			{ command: "doutores.addStrongTag", title: "Adicionar strong no texto" },
		];

		const result = await vscode.window.showQuickPick(
			commandList.map((c) => c.title),
			{ title: "Executar nos arquivos abertos:" }
		);

		if (!result) {
			return;
		}

		vscode.window.withProgress(
			{
				location: vscode.ProgressLocation.Notification,
				cancellable: true,
				title: "Executando comando nos arquivos abertos...",
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
						await vscode.window.showTextDocument(documentos[index], { preview: false, preserveFocus: false });
						await vscode.commands.executeCommand(`${commandList.find((e) => e.title === result)?.command}`);
					}

					progress.report({ increment: 100 / documentos.length, message: `${index} / ${documentos.length}` });
				}
			}
		);
	}
}

export default runOnOpenFiles;
