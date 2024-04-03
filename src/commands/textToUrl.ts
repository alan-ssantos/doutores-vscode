import * as vscode from "vscode";
import makeSlug from "../utils/makeSlug";

const config = vscode.workspace.getConfiguration("drs.textToUrl");

async function textToUrl() {
	const editor = vscode.window.activeTextEditor;

	if (editor) {
		editor.edit((editBuilder) => {
			const removeHtmlTags: boolean = config.get("removeHtmlTags") ?? false;
			const prepositions: string[] = config.get("prepositions") ?? [];

			editor.selections.forEach((selection) => {
				const text = editor.document.getText(selection);
				editBuilder.replace(selection, makeSlug(text, removeHtmlTags, prepositions));
			});
		});
	}
}

export default textToUrl;
