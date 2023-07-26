import * as vscode from "vscode";
import { TinyColor } from "@ctrl/tinycolor";

async function generateColors() {
	const editor = vscode.window.activeTextEditor;

	if (editor) {
		try {
			editor.edit((editBuilder) => {
				editor.selections.forEach((selection) => {
					const textSelected = editor.document.getText(selection);

					let colorName: string = "";
					let color: TinyColor;
					const match = textSelected.match(/--(\w*\-*)*:\s*#([A-Fa-f0-9]{3,6});/g);

					if (match && match.length >= 1) {
						colorName = textSelected.split(": ")[0];
						color = new TinyColor(textSelected.split(": ")[1].replace(";", ""));
					} else {
						color = new TinyColor(textSelected);
					}

					if (!color.isValid) {
						throw new Error("A cor selecionada não é válida");
					}

					const lighterColor = color.mix("#FFF", 35);
					const darkerColor = color.mix("#000", 35);

					let result = `${textSelected}${colorName ? `\n\t${colorName}-light` : ";\n\t--color-light"}: #${lighterColor.toHex()};\n\t${
						colorName ? `${colorName}-dark: #${darkerColor.toHex()};` : `--color-dark: #${darkerColor.toHex()}`
					}`;

					editBuilder.replace(selection, `${result}`);
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
}

export default generateColors;
