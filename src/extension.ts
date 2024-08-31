import * as fs from 'fs';
import path from 'path';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('extension.listDependencies', async () => {
			const workspaceFolder = vscode.workspace.workspaceFolders;
			if (!workspaceFolder) {
				vscode.window.showErrorMessage("No workspace folder is open");
				return;
			}

			const packageJsonPath = path.join(workspaceFolder[0].uri.fsPath,  'package.json');
			fs.readFile(packageJsonPath, 'utf-8', (err, data) => {
				if (err) {
					vscode.window.showErrorMessage("Could not find a package.json file. Please create one");
				}
				const packageJson = JSON.parse(data);
				const dependencies = packageJson.dependencies;

				if (!dependencies) {
					vscode.window.showErrorMessage("Could not find dependencies in the package.json");
				}
				const dependenciesListWithVersion = Object.entries(dependencies).map(([dep, version]) => `${dep} : ${version}`).join(`\n`);
				vscode.window.showInformationMessage(dependenciesListWithVersion);
			});
		}
	));

	context.subscriptions.push(
		vscode.commands.registerCommand('extension.listDevDependencies', async () => {
			const workspaceFolder = vscode.workspace.workspaceFolders;
			if (!workspaceFolder) {
				vscode.window.showErrorMessage("No workspace folder is open");
				return;
			}

			const packageJsonPath = path.join(workspaceFolder[0].uri.fsPath,  'package.json');
			fs.readFile(packageJsonPath, 'utf-8', (err, data) => {
				if (err) {
					vscode.window.showErrorMessage("Could not find a package.json file. Please create one");
				}
				const packageJson = JSON.parse(data);
				const devDependencies = packageJson.devDependencies;

				if (!devDependencies) {
					vscode.window.showErrorMessage("Could not find devDependencies in the package.json");
				}
				const devDependenciesListWithVersion = Object.entries(devDependencies).map(([dep, version]) => `${dep} : ${version}`).join(`\n`);
				vscode.window.showInformationMessage(devDependenciesListWithVersion);
			});
		}
	));
}

// This method is called when your extension is deactivated
export function deactivate() {}
