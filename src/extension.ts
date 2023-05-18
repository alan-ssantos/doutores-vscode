import * as vscode from "vscode";

export async function activate(context: vscode.ExtensionContext) {
	const commands: vscode.Command[] = context.extension.packageJSON.contributes.commands;

	for (const { command } of commands) {
		const commandName: string = command.replace("drs.", "");
		const commandFn = await import(`./commands/${commandName}`);

		const disposable = vscode.commands.registerCommand(command, commandFn.default);

		context.subscriptions.push(disposable);
	}
}

// this method is called when your extension is deactivated
export function deactivate() {}
