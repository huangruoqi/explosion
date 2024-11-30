// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const player = require('play-sound')();
const path = require('path');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

function activate(context) {
  console.log("Xplosion Activated!")

  // const soundUri = vscode.Uri.file(context.asAbsolutePath('media/explosion.mp3'));
  // const soundPath = soundUri.toString();
  const soundPath = path.join(__dirname, 'media', 'explosion_10.mp3');

  let audioCounter = 0;
  const alwaysPlayCount = 5;
  const resetInterval = 500; // ms
  let lastPlayTime = Date.now();

  function playSound() {
    const now = Date.now();
    if (now - lastPlayTime > resetInterval) {
      audioCounter = 0;
    }
    lastPlayTime = now;
    if (audioCounter > alwaysPlayCount && Math.random() > 1/Math.sqrt(audioCounter-alwaysPlayCount)) {
      return;
    }
    audioCounter++;
    console.log(audioCounter);
    player.play(soundPath, (err) => {
      if (err) console.error('Error playing audio 1:', err);
      else {
        audioCounter--;
      }
    });
  }


  const frames = [
    '01.gif',
    '02.gif',
    '03.gif',
    '04.gif',
    '05.gif',
    '06.gif',
    '07.gif',
    '08.gif',
    '09.gif',
    '10.gif',
    '11.gif',
    '12.gif',
  ];
  const maxFrame = frames.length - 1;
  const frameDuration = 80; // Duration per frame in milliseconds


  function playAnimation(editor, range) {
    playSound();
    const frame2Decorations = frames.map(fileName => vscode.window.createTextEditorDecorationType({
      after: {
        contentIconPath: vscode.Uri.file(context.asAbsolutePath(`images/${fileName}`)),
        textDecoration: 'none; position: absolute;',
        margin: '0 0 0 -15px'
      },
    }));
    let currentFrame = 0;
    function updateFrame() {
      if (currentFrame !== 0) {
        editor.setDecorations(frame2Decorations[currentFrame - 1], []);
      }
      if (currentFrame !== maxFrame) {
        editor.setDecorations(frame2Decorations[currentFrame], [range]);
        setTimeout(updateFrame, frameDuration);
      }
      currentFrame++;
    }
    updateFrame();
  }
  vscode.workspace.onDidChangeTextDocument((event) => {
    const editor = vscode.window.activeTextEditor;
    editor.setDecorations
    if (!editor) return;

    const changes = event.contentChanges;
    if (changes.length > 0) {
      const lastChange = changes[changes.length - 1];
      const startPos = lastChange.range.start;
      const range = new vscode.Range(startPos, startPos.translate(0, lastChange.text.length));
      // Start the frame-by-frame animation
      playAnimation(editor, range);
    }
  });
}



// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
  activate,
  deactivate
}
