// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "explosion" is now active!');
  const explosionDecoration = vscode.window.createTextEditorDecorationType({
    after: {
      contentIconPath: vscode.Uri.file(context.asAbsolutePath('images/a.gif')), // Path to your image
      textDecoration: `none; position: absolute;`,
      margin: '-100px 0 0 -100px'
    },
  });
  vscode.workspace.onDidChangeTextDocument((event) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor || event.document !== editor.document) return;

    const changes = event.contentChanges;
    if (changes.length > 0) {
      const lastChange = changes[changes.length - 1];
      const startPos = lastChange.range.start;

      // Overlay the image on the text position
      const range = new vscode.Range(startPos, startPos.translate(0, lastChange.text.length));
      editor.setDecorations(explosionDecoration, [range]);

      // Clear the overlay after a short delay (if desired)
      setTimeout(() => {
        editor.setDecorations(explosionDecoration, []);
      }, 500); // Adjust duration as needed
    }
  });
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand('explosion.helloWorld', function () {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    vscode.window.showInformationMessage('Hello World from explosion!');
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
  activate,
  deactivate
}
