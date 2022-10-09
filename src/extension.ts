import * as vscode from "vscode";
import { openMpis } from "./commands/openMpis";
import textToUrl from "./commands/textToUrl";
import formatOpenFiles from "./commands/formatOpenFiles";

export function activate(context: vscode.ExtensionContext) {
  let openMpisDisposable = vscode.commands.registerCommand("doutores.abrirMpis", openMpis);
  let textToUrlDisposable = vscode.commands.registerCommand("doutores.textToUrl", textToUrl);
  let formatOpenFilesDisposable = vscode.commands.registerCommand(
    "doutores.formatOpenFiles",
    formatOpenFiles
  );

  context.subscriptions.push(openMpisDisposable);
  context.subscriptions.push(textToUrlDisposable);
  context.subscriptions.push(formatOpenFilesDisposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
