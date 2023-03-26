<h1><strong>DOUTORES TOOLKIT</strong></h1>

## 📖 Sobre o projeto

Esta extensão funciona como um kit de ferramentas, pois trás um compilado de funções para aumentar a produtividade e corrigir de erros em projetos da doutores. 🛠️👨🏽‍⚕️

## 📑 Lista de comandos

- [Abrir arquivos <kbd>ctrl+k a</kbd>](#abrir-arquivos-ctrlk-a)
- [Texto para URL <kbd>ctrl+k t</kbd>](#texto-para-url-ctrlk-t)
- [Formatar arquivos abertos <kbd>ctrl+k f</kbd>](#formatar-arquivos-abertos-ctrlk-f)
- [Descartar alterações e fechar <kbd>ctrl+k q</kbd>](#descartar-altera%C3%A7%C3%B5es-e-fechar-ctrlk-q)
- [Gerar cores <kbd>ctrl+k p</kbd>](#gerar-cores-ctrlk-p)
- [Substituir Description <kbd>ctrl+k d</kbd>](#substituir-description-ctrlk-d)
- [Adicionar strong no texto <kbd>ctrl+k o</kbd>](#adicionar-strong-no-texto-ctrlk-o)
- [Executar nos arquivos abertos <kbd>ctrl+k k</kbd>](#executar-nos-arquivos-abertos-ctrlk-k)

## 🛠️ Instalação e execução

## Como instalar
1. Faça o download do arquivo [`doutores-0.17.19.vsix`](https://github.com/alan-ssantos/doutores-vscode/releases) na sessão assets;
2. No VS Code, vá até a aba de extensões <kbd>ctrl+shift+x</kbd>;
3. Com a aba de extensões aberta, clique em mais opções (os três pontinhos ao lado do título da aba) e em seguida em "Instalar do VSIX...";
4. Selecione o arquivo da extensão baixado anteriormente e aguarde que a instalação seja concluída. 

## Descrição dos comandos

### Abrir arquivos <kbd>ctrl+k a</kbd>
Comando para abrir arquivos php contidos na raiz do projeto, há duas maneiras de usa-lo:
1. Execute o comando no teclado e em seguida selecione qual será a lista de arquivos a serem abertos;
2. Selecione um ou mais nomes de arquivos e em seguida execute o comando, assim será aberto apenas os arquivos selecionados. 

### Texto para URL <kbd>ctrl+k t</kbd>
Transforma um ou mais textos selecionados em uma url amigável.

### Formatar arquivos abertos <kbd>ctrl+k f</kbd>
Executa a formatação em todos os arquivos que estiverem abertos.
Ao executar este comando, será utilizado o formatador padrão ou o definido pelo usuário, para arquivos PHP é possível utilizar o [PHP Intelephense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client) ou similares.
  > Atente-se em fechar os arquivos que não devem ser alterados.

### Descartar alterações e fechar <kbd>ctrl+k q</kbd>
Comando para descartar as <strong>alterações não salvas</strong> de um arquivo e o fecha-lo logo em seguida.

### Gerar cores <kbd>ctrl+k p</kbd>
A partir de uma ou mais cores hexadecimais selecionadas, este comando gera uma cor mais clara e outra mais escura.

### Substituir Description <kbd>ctrl+k d</kbd>
Substitui a description de um arquivo de mpi, a nova description é retirada a partir de uma strong com a palavra-chave contida no texto.
  > Caso nenhuma strong seja encontrada no arquivo, a substituição falhará.

### Adicionar strong no texto <kbd>ctrl+k o</kbd>
Adiciona a tag strong em todas as ocorrências da palavra-chave em um arquivo de mpi.

### Executar nos arquivos abertos <kbd>ctrl+k k</kbd>
Permite executar os comandos (até o momento) de [Substituir Description <kbd>ctrl+k d</kbd>](#substituir-description-ctrlk-d) e [Adicionar strong no texto <kbd>ctrl+k o</kbd>](#adicionar-strong-no-texto-ctrlk-o) em todos os arquivos PHP abertos no editor.

