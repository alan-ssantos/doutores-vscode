import * as vscode from "vscode";
import { openMpis } from "./commands/openMpis";

export function activate(context: vscode.ExtensionContext) {
  let openMpisDisposable = vscode.commands.registerCommand("doutores.abrirMpis", openMpis);

  context.subscriptions.push(openMpisDisposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
