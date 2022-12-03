import * as vscode from "vscode";
import { TinyColor } from "@ctrl/tinycolor";

async function textToUrl() {
	// const config = vscode.workspace.getConfiguration("doutores.textToUrl");
	const editor = vscode.window.activeTextEditor;

	if (editor) {
		editor.edit((editBuilder) => {
			editor.selections.forEach((selection) => {
				const textSelected = editor.document.getText(selection);

				let colorName: string = "";
				let color: TinyColor;
        let selectedLine = false;
				const match = textSelected.match(/--(\w*\-*)*:\s*#([A-Fa-f0-9]{3,6});/g);

				if (match && match.length >= 1) {
          selectedLine = true;
					const nameMatch = textSelected.match(/(\-+(\w*\-?)*)/g);
					const colorMatch = textSelected.match(/#([A-Fa-f0-9]{3,6})/g);

					if (!colorMatch || !nameMatch) {
						console.log("Erro ao localizar a cor na linha selecionada.");
						return;
					} else {
						colorName = nameMatch[0];
						color = new TinyColor(colorMatch[0]);
					}
				} else {
					color = new TinyColor(textSelected);
				}

				if (!color.isValid) {
					console.log("A cor selecionada não é válida");
					return;
				}

				let colors: TinyColor[] = [];
				colors.push(color.tint(40));
				colors.push(color.shade(40));

				let result = "";
				for (let index = 0; index < colors.length; index++) {
          let name = colorName ? `${colorName}-${index}` : `--color-name-${index}`;
          if (selectedLine) {
            result = result.concat(`\n\t${name}: #${colors[index].toHex()};`);
          } else {
            result = result.concat(`;\n\t${name}: #${colors[index].toHex()}`);
          }
				}

				editBuilder.replace(selection, `${textSelected}${result}`);
			});
		});
	}
}

export default textToUrl;
