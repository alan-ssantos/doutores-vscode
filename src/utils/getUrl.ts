export function getUrls(vetKey: string): string[] {
  let urls: string | string[];

  // Remove o texto antes e depois da url
  urls = vetKey.replace(/\$vetKey\[\d+\]\s+=\s+array\("url"\s+=>\s+"/g, "").replace(/"(.*)/g, "");
  // Transforma o texto em array a partir da quebra de linha
  urls = urls.split("\n");
  // Remove o primeiro item do array "<?php $vetKey = array();"
  urls.shift();
  // Remove o último item do array "?>"
  urls.pop();

  return urls;
}
