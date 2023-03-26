import * as vscode from "vscode";
import { getPageDescription, getPageTitle } from "../utils/mpiHelper";

function getNewDescription(documentText: string): string {
	const pageTitle = getPageTitle(documentText);

	const titleOccurrencesRegex = new RegExp("(<strong[^>]*>" + pageTitle + "</strong>|" + pageTitle + ").*</p>", "gi");
	const titleOccurrences = documentText.match(titleOccurrencesRegex);

	if (!titleOccurrences) {
		throw new Error("Nenhuma ocorrência da palavra-chave foi encontrada no texto do documento");
	}

	const filteredOccurrences = titleOccurrences.filter((occ) => occ.replace(/<[^>]*>/g, "").length >= 150);

	if (filteredOccurrences.length <= 0) {
		throw new Error("Não há texto com caracteres suficientes para a descrição.");
	}

	if (filteredOccurrences.length >= 2) {
		return filteredOccurrences[1];
	} else {
		return filteredOccurrences[0];
	}
}

async function replaceDescription() {
	const config = vscode.workspace.getConfiguration("doutores.replaceDescription");

	try {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			const documentText = document.getText();

			const pageDescription = getPageDescription(document);
			let newDescription = getNewDescription(documentText);

			if (config.get("cleanDescription") === true) {
				newDescription = newDescription
					.replace(/<[^>]*>/g, "")
					.replace("  ", " ")
					.replace("  ", " ")
					.replace(" ,", ",")
					.replace(" .", ".")
					.replace(" ?", "?")
					.trim();

				newDescription = newDescription.charAt(0).toUpperCase() + newDescription.slice(1);

				if (newDescription.length > 157) {
					newDescription = newDescription.substring(0, 157);
					const lastSpace = newDescription.lastIndexOf(" ");
					newDescription = newDescription.substring(0, lastSpace);
				}

				if (newDescription.length > 130 && newDescription.length <= 145) {
					newDescription = newDescription + "... Saiba mais.";
				} else if (newDescription.length > 145 && newDescription.length < 157) {
					newDescription = newDescription + "...";
				}
			}

			editor.edit((builder) => {
				if (pageDescription.range) {
					builder.replace(pageDescription.range, `$desc = "${newDescription}";`);
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
