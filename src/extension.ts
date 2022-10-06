import * as vscode from "vscode";
import { openMpis } from "./commands/openMpis";
import textToUrl from "./commands/textToUrl";

export function activate(context: vscode.ExtensionContext) {
  let openMpisDisposable = vscode.commands.registerCommand("doutores.abrirMpis", openMpis);
  let textToUrlDisposable = vscode.commands.registerCommand("doutores.textToUrl", textToUrl);

  context.subscriptions.push(openMpisDisposable);
  context.subscriptions.push(textToUrlDisposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
