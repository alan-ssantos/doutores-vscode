import * as vscode from "vscode";
import { getPageTitle } from "../utils/mpiHelper";

async function addStrongTag() {
	const config = vscode.workspace.getConfiguration("drs.addStrongTag");

	const editor = vscode.window.activeTextEditor;

	if (editor) {
		const document = editor.document;
		const documentText = document.getText();
		try {
			const pageTitle = getPageTitle(documentText);
			const paragraphs = documentText.match(/<p[^>]*>(.|\n)*?<\/p>/g);

			if (paragraphs && paragraphs.length > 0) {
				editor.edit((builder) => {
					for (let index = 0; index < paragraphs.length; index++) {
						let paragraph = paragraphs[index];

						const position = document.positionAt(documentText.indexOf(paragraph));
						const range = document.getWordRangeAtPosition(position, /<p[^>]*>(.|\n)*?<\/p>/g);
						if (range) {
							const titleRegex = new RegExp("(<strong[^>]*>(" + pageTitle + ")</strong>)|(" + pageTitle + ")", "gi");
							const newParagraph = paragraph.replace(titleRegex, `<strong>${pageTitle.toLowerCase()}</strong>`);
							builder.replace(range, newParagraph);
						}
					}
				});
			}

			if (config.get("autoSave") === true) {
				await vscode.commands.executeCommand("workbench.action.files.save");
			}
		} catch (e) {
			if (typeof e === "string") {
				vscode.window.showErrorMessage(e);
			} else if (e instanceof Error) {
				vscode.window.showErrorMessage(`${e.message} [${document.fileName.replace(/.*(?<=\\)/g, "")}](${document.uri.toString()})`);
			}
		}
	}
}

export default addStrongTag;
