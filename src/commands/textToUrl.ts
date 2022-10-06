import * as vscode from "vscode";
import * as removeAccents from "remove-accents";

const PREPOSITIONS_REGEX =
  /(\s)a(\s)|(\s)ante(\s)|(\s)até(\s)|(\s)após(\s)|(\s)de(\s)|(\s)desde(\s)|(\s)em(\s)|(\s)entre(\s)|(\s)com(\s)|(\s)para(\s)|(\s)por(\s)|(\s)perante(\s)|(\s)sem(\s)|(\s)sob(\s)|(\s)sobre(\s)|(\s)na(\s)|(\s)no(\s)|(\s)e(\s)|(\s)do(\s)|(\s)da(\s)|(\s)de(\s)/g;

async function textToUrl() {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const word = editor.document.getText(editor.selection);

    let slug: string;
    slug = removeAccents(word); // REMOVE OS ACENTOS DO TEXTO
    slug = slug
      .normalize("NFD")
      .toLowerCase()
      .replace(PREPOSITIONS_REGEX, " ") // SUBSTITUI AS PREPOSIÇÕES POR ESPAÇO
      .replace(/[!%.'$()*+/;=?\\,/:#@"\\[\]_“”÷°©®℗™ª]/gi, " ")
      .replace(/<[^>]*>/gi, " ")
      .trim()
      .replace(/(\s+)/g, "-");

    editor.edit((editBuilder) => {
      editBuilder.replace(editor.selection, slug);
    });
  }
}

export default textToUrl;
