import * as fs from 'fs';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('extension.listDependencies', async () => {
			const packageJsonPath = vscode.workspace.rootPath + "/package.json";
			fs.readFile(packageJsonPath, 'utf-8' ,(err, data) => {
				if (err) {
					vscode.window.showErrorMessage("Error reading package.json");
				}
				const packageJson = JSON.parse(data);
				const dependencies = packageJson.dependencies;
				vscode.window.showInformationMessage(`Here is ${JSON.stringify(dependencies, null, 2)}`);
			});
		}
	));

	context.subscriptions.push(
		vscode.commands.registerCommand('extension.listDevDependencies', async () => {
			const packageJsonPath = vscode.workspace.rootPath + "/package.json";
			fs.readFile(packageJsonPath, 'utf-8' ,(err, data) => {
				if (err) {
					vscode.window.showErrorMessage("Error reading package.json");
				}
				const packageJson = JSON.parse(data);
				const devDependencies = packageJson.devDependencies;
				vscode.window.showInformationMessage(`Here is ${JSON.stringify(devDependencies, null, 2)}`);
			});
		}
	));
}

// This method is called when your extension is deactivated
export function deactivate() {}
