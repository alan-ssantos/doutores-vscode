import * as vscode from "vscode";

function getDescriptionPosition(
	document: vscode.TextDocument,
	documentText: string
): { position: vscode.Position; range: vscode.Range | undefined } {
	const descriptionText = documentText.match(/\$desc.*;/gi);

	if (!descriptionText) {
		throw new Error("A variável $desc não foi encontrada no documento.");
	}

	const position = document.positionAt(documentText.indexOf(descriptionText[0]));
	const range = document.getWordRangeAtPosition(position, /\$.*;/gi);

	return {
		position,
		range,
	};
}

function getNewDescription(documentText: string): string {
	const matchList = documentText.match(/<strong>(.*)<\/p>/gi);

	if (!matchList) {
		throw new Error("Nenhuma <strong> foi encontrada no documento");
	}

	const filteredList = matchList.filter((desc) => {
		const cleanedDesc = desc.replace(/<[^>]*>/g, "");
		if (cleanedDesc.length >= 150) {
			return true;
		} else {
			return false;
		}
	});

	if (filteredList.length <= 0) {
		throw new Error("Não há texto com caracteres suficientes para a descrição.");
	}

	if (filteredList.length >= 2) {
		return filteredList[1];
	} else {
		return filteredList[0];
	}
}

async function replaceDescription() {
	const config = vscode.workspace.getConfiguration("doutores.replaceDescription");

	try {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;

			const documentText = document.getText();
			const description = getDescriptionPosition(document, documentText);

			let newDescription: string;
			const selection = document.getText(editor.selection);
			if (selection.length >= 1) {
				console.log("texto selecionado: ", selection);
				if (selection.length < 145) {
					throw new Error("O texto selecionado não tem caracteres suficientes para a descrição.");
				} else {
					newDescription = document.getText(editor.selection);
				}
			} else {
				newDescription = getNewDescription(documentText);
			}

			if (config.get("cleanDescription") === true) {
				newDescription = newDescription
					.replace(/<[^>]*>/g, "")
					.replace("  ", " ")
					.replace("  ", " ")
					.replace(" ,", ",")
					.replace(" .", ".")
					.replace(" ?", "?")
					.trim();
			}

			editor.edit((builder) => {
				if (description.range) {
					builder.replace(description.range, `$desc = "${newDescription}";`);
				}
			});

			if (config.get("autoSave") === true) {
				await vscode.commands.executeCommand("workbench.action.files.save");
			}
		}
	} catch (e) {
		if (typeof e === "string") {
			vscode.window.showErrorMessage(e);
		} else if (e instanceof Error) {
			vscode.window.showErrorMessage(e.message);
		}
	}
}

export default replaceDescription;
