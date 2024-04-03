import * as vscode from "vscode";
import * as fs from "fs";
import { getFile, getPathnames, getVetFiles, getVetTitles } from "../utils/fileHandler";
import defaultTemplateContent from "../utils/templates/default-template";

async function createFilesFromVet() {
	if (!vscode.workspace.workspaceFolders) {
		throw new Error("Pasta do projeto não encontrada.");
	}
	const rootUri = vscode.workspace.workspaceFolders[0].uri;

	const vetFilesList = await getVetFiles(true);
	const selectedVetFile = await vscode.window.showQuickPick(vetFilesList, {});

	if (!selectedVetFile) {
		return;
	}

	const { content } = await getFile(rootUri, selectedVetFile);

	const pathnames = getPathnames(content);
	const titles = getVetTitles(content);

	const templateList = pathnames.filter((path) => fs.existsSync(`${rootUri.fsPath}/${path}.php`));
	templateList.unshift("default");

	const selectedTemplateFile = await vscode.window.showQuickPick(templateList, {});

	if (!selectedTemplateFile) {
		return;
	}
  
	let createdFiles = 0;
	vscode.window
		.withProgress(
			{
				location: vscode.ProgressLocation.Notification,
				cancellable: true,
				title: `Criando arquivos da ${selectedVetFile}...`,
			},
			async (progress, token) => {
				let cancel = false;
				token.onCancellationRequested(() => {
					cancel = true;
				});

				const templateContent =
					selectedTemplateFile === "default"
						? defaultTemplateContent
						: fs.readFileSync(`${rootUri.fsPath}/${selectedTemplateFile}.php`).toString();

				for (let i = 0; i < pathnames.length; i++) {
					if (cancel) {
						break;
					}

					const uri = vscode.Uri.file(`${rootUri.fsPath}/${pathnames[i]}.php`);
					if (!fs.existsSync(uri.fsPath)) {
						let fileContent = templateContent;
						fileContent = fileContent
							.replace(/\$h1[^;]*;/, `$h1         = "${titles[i]}";`)
							.replace(/\$title[^;]*;/, `$title      = "${titles[i]}";`)
							.replace(/\$desc[^;]*;/, `$desc       = "${titles[i]} - ";`)
							.replace(/\$var[^;]*;/, `$var        = "${titles[i]}";`);

						fs.writeFileSync(uri.fsPath, fileContent, "utf-8");
						vscode.commands.executeCommand("vscode.open", uri, { preview: false, preserveFocus: false });
						createdFiles++;
					}
				}
			}
		)
		.then(() => {
			vscode.window.showInformationMessage(createdFiles > 0 ? `${createdFiles} arquivo(s) criado(s).` : "Nenhum arquivo foi criado.");
		});
}

export default createFilesFromVet;

