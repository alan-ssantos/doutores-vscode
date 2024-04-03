import * as vscode from "vscode";

async function turnList() {
	try {
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			vscode.window.showErrorMessage("Nenhum editor de texto ativo.");
			return;
		}

		editor.edit((builder) => {
			editor.selections.forEach((selection, index) => {
				if (!selection.isEmpty) {
					let text = editor.document.getText(selection);
					let listContent = createListContent(text);

					builder.replace(selection, `<ul class="list">${listContent}\n</ul>`);
				} else {
					vscode.window.showErrorMessage("Selecione o conteúdo que deve ser convertido em vetor");
				}
			});
		});
	} catch (e) {
		if (typeof e === "string") {
			vscode.window.showErrorMessage(e);
		} else if (e instanceof Error) {
			vscode.window.showErrorMessage(e.message);
		}
	}
}

function createListContent(text: string): string {
	let listItems = text.split(/;\s+\n+|;\s+|\n+|;/gm);
	listItems = listItems.filter((item) => item.trim().length > 0);
	return listItems
		.map((item, index, arr) => {
			const punctuation = index === arr.length - 1 ? "." : ";";
			return `\n\t<li>${item.trim()}${punctuation}</li>`;
		})
		.join("")
		.replace(/\s*\n*<li>;<\/li>/g, "");
}

export default turnList;
