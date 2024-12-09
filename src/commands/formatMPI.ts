import * as vscode from "vscode";
const { exec } = require("child_process");

async function formatMPI() {
  const config = vscode.workspace.getConfiguration("drs.formatMPI");
	const folders = vscode.workspace.workspaceFolders;

  
	if (!folders) {
    vscode.window.showErrorMessage("Nenhuma pasta está aberta no momento.");
		return;
	}
  
  // Caminho para o script Python
  const scriptPath = config.get('replaceScriptPath');
	if (!scriptPath) {
		vscode.window.showErrorMessage("O caminho para o script de substituição não foi definido");
		return;
	}

	// Extrai apenas o nome da pasta
	const folderName = folders[0].uri.fsPath.split(/[/\\]/).pop();

	vscode.window.showInformationMessage(`Pasta aberta: ${folderName}`);

  const options = [
    { label: "1.0", value: "1" },
    { label: "2.0", value: "2" }
  ];

	const selected = await vscode.window.showQuickPick(options.map(option => option.label), {});
  const mpiVersion = options.find(option => option.label === selected)?.value;

	// Executa o script
	exec(`python "${scriptPath}" ${folderName} ${mpiVersion}`, (err: any, stdout: any, stderr: any) => {
		if (err) {
			vscode.window.showErrorMessage(`Erro: ${stderr}`);
			return;
		}
		vscode.window.showInformationMessage(`Resultado: ${stdout}`);
	});
}

export default formatMPI;
