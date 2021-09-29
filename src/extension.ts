// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as child_process from 'child_process';
import { resolveCliPathFromVSCodeExecutablePath } from '@vscode/test-electron';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	const conf = vscode.workspace.getConfiguration('autocommit');
	const commitMessage = conf.get('commit-message') === '' ?
							conf.get('commit-message') : 
							`commit from AutoCommit - ${new Date().toString()}`;
	const commitInterval = conf.get<int>('commit-interval');
	const enabled = conf.get('enabled') ?? false;

	console.log('==================================================================');
	console.log(commitMessage);
	console.log(commitInterval);
	console.log('==================================================================');

	while (true){
	// while (enabled){
		console.log('while looop!');
		child_process.exec('git init', (err, stdout ,stderr)=>{
			if (err){
				console.error(stderr);
			}
			console.log(stdout);
		});
		await (new Promise(r => setTimeout(r, 1000 * 60 * commitInterval)));
	}

}


// this method is called when your extension is deactivated
export function deactivate() {}
