import * as vscode from "vscode";
import makeSlug from "../utils/makeSlug";

async function turnVet() {
	try {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			editor.edit((builder) => {
				editor.selections.forEach((selection, index) => {
					if (!selection.isEmpty) {
						let text = editor.document.getText(selection);

						let vetItems = text.split("\n");
						let vetContent = vetItems
							.map((i) => `\n\t["url" => "${makeSlug(i)}", "title" => "${i}", "cover" => null, "sub-menu" => null],`)
							.join("");

						builder.replace(selection, `<?php $vetName${editor.selections.length > 1 ? index : ""} = array(${vetContent}\n); ?>`);
					} else {
						throw new Error("Selecione o conteúdo que deve ser convertidos em vet");
					}
				});
			});
		}
	} catch (e) {
		if (typeof e === "string") {
			vscode.window.showErrorMessage(e);
		} else if (e instanceof Error) {
			vscode.window.showErrorMessage(e.message);
		}
	}
}

export default turnVet;
