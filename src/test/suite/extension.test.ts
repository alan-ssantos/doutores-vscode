import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
// import * as myExtension from "../../extension";

suite("Extension Test Suite", () => {
	vscode.window.showInformationMessage("Start all tests.");

	test("Extension should be present", () => {
		assert.ok(vscode.extensions.getExtension("alan-ssantos.doutores"));
	});

	test("should activate", function () {
		this.timeout(1 * 60 * 1000);

		const ext = vscode.extensions.getExtension("alan-ssantos.doutores");

		assert.ok(ext?.isActive);
	});

	test("should register all doutores commands", () => {
		vscode.commands.getCommands(true).then((commands) => {
			const COMMANDS = [
				"doutores.openFiles",
				"doutores.textToUrl",
				"doutores.formatOpenFiles",
				"doutores.closeWithoutSave",
				"doutores.generateColors",
				"doutores.replaceDescription",
				"doutores.addStrongTag",
				"doutores.runOnOpenFiles",
			];

			const foundedCommands = commands.filter((c) => {
				return COMMANDS.indexOf(c) >= 0 || c.startsWith("extension.doutores.");
			});

			assert.equal(foundedCommands.length, COMMANDS.length);
		});
	});
});

