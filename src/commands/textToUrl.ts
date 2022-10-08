import * as vscode from "vscode";
import * as removeAccents from "remove-accents";

const PREPOSITIONS_REGEX =
  /(\s)a(\s)|(\s)ante(\s)|(\s)até(\s)|(\s)após(\s)|(\s)de(\s)|(\s)desde(\s)|(\s)em(\s)|(\s)entre(\s)|(\s)com(\s)|(\s)para(\s)|(\s)por(\s)|(\s)perante(\s)|(\s)sem(\s)|(\s)sob(\s)|(\s)sobre(\s)|(\s)na(\s)|(\s)no(\s)|(\s)e(\s)|(\s)do(\s)|(\s)da(\s)|(\s)de(\s)/g;

async function textToUrl() {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    editor.edit((editBuilder) => {
      editor.selections.forEach((selection) => {
        const word = editor.document.getText(selection);

        let slug: string;
        slug = removeAccents(word);
        slug = slug
          .normalize("NFD")
          .toLowerCase()
          .replace(PREPOSITIONS_REGEX, " ")
          .replace(/[!%.'$()*+/;=?\\,/:#@"\\[\]_“”÷°©®℗™ª]/gi, " ")
          .replace(/<[^>]*>/gi, " ")
          .trim()
          .replace(/(\s+)/g, "-");

        editBuilder.replace(selection, slug);
      });
    });
  }
}

export default textToUrl;
