import * as vscode from "vscode";
import makeSlug from "../utils/makeSlug";

async function turnVet() {
	try {
		const config = vscode.workspace.getConfiguration("drs.textToUrl");
		const removeHtmlTags: boolean = config.get("removeHtmlTags") ?? false;
		const prepositions: string[] = config.get("prepositions") ?? [];

		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			vscode.window.showErrorMessage("Nenhum editor de texto ativo.");
			return;
		}

		const vetName = await vscode.window.showInputBox({ title: "Digite o nome do vetor:", placeHolder: "Ex.: vetServicos" });

		if (!vetName) {
			vscode.window.showErrorMessage("É preciso definir um nome para o vetor");
			return;
		}

		editor.edit((builder) => {
			editor.selections.forEach((selection, index) => {
				if (!selection.isEmpty) {
					let text = editor.document.getText(selection);
					let vetContent = createVetContent(text, removeHtmlTags, prepositions);

					builder.replace(selection, `<?php $${vetName}${editor.selections.length > 1 ? index : ""} = array(${vetContent}\n); ?>`);
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

function createVetContent(text: string, removeHtmlTags: boolean, prepositions: string[]): string {
	let vetItems = text.split("\n");
	return vetItems
		.map((i) => {
			let item = i.trim();
			return `\n\t["url" => "${makeSlug(item, removeHtmlTags, prepositions)}", "title" => "${item}", "cover" => null, "sub-menu" => null],`;
		})
		.join("");
}

export default turnVet;
