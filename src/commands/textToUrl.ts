import * as vscode from "vscode";
import * as removeAccents from "remove-accents";

async function textToUrl() {
	const config = vscode.workspace.getConfiguration("drs.textToUrl");
	const editor = vscode.window.activeTextEditor;

	if (editor) {
		const prepositions: string[] = config.get("prepositions") || [];
		const prepositionsRegex: RegExp = new RegExp(prepositions.map((p) => `(\\s)${p}(\\s)`).join("|"), "g");

		editor.edit((editBuilder) => {
			editor.selections.forEach((selection) => {
				const word = editor.document.getText(selection);

				let slug: string;
				slug = removeAccents(word);
				slug = slug
					.normalize("NFD")
					.toLowerCase()
					.replace(prepositionsRegex, " ")
					.replace(/[!%.'$()*+;=?\\,:#@"\\[\]_\/“”÷°©®℗™ªº–—©®℗¦|™‹›»«’]/g, " ");

				if (config.get("removeHtmlTags")) {
					slug = slug.replace(/<[^>]*>/g, " ");
				}
				slug = slug.trim().replace(/(\s+)/g, "-").replace(/\-+/g, "-");

				editBuilder.replace(selection, slug);
			});
		});
	}
}

export default textToUrl;
