from tqdm import tqdm
import codecs
import re
import os
import sys

pattern_mpi_10 = [
    (r'<br class="clear"\s*\/?>', '<div class="clear"></div>', "Clear tags"),
    (r"<\? include\(\'inc/social-media\.php\'\); \?>", "", "Include social-media"),
    (r"\$quantia = \d+;\s*\n*", "", "Quantia na galeria"),
    (
        r"<[hp]\d?>\n*\s*<(h\d+)>(.*?)<\/h\d+>\n*\s*<\/[hp]\d?>",
        r"<\g<1>>\g<2></\g<1>>",
        "Titulo dentro de paragrafo ou titulo",
    ),
    (r"<li>\s*\n*(.)", r"<li>\g<1>", "Espaçamento no inicio das <li>"),
    (r"(<h\d>)(.*?)<strong>(.*?)</strong>(.*?)(</h\d>)", r"\g<1>\g<2>\g<3>\g<4>\g<5>", "Strong dentro de títulos"),
    (r"(<h\d>)\s*\n*(.)", r"\g<1>\g<2>", "Espaçamento no inicio dos títulos"),
    (
        r"<div class=\"wrapper\">\s*\n*<main>\s*\n*<div class=\"content\"[^>]*>\s*\n*<section>\s*\n*<\?= \$caminho2 \?>\s*\n*<h1><\?= \$h1 \?></h1>",
        f"""<main>
    <div class="content" itemscope itemtype="https://schema.org/Product">
      <section>
        <?php include("inc/bread-mpi.php"); ?>
        <div class="container">
          <div class="wrapper">""",
        "Inicio da página / breadcrumb",
    ),
    (
        r"</section>\s*</div>\s*</main>\s*</div><!-- \.wrapper -->",
        f"""        </div>
        </div>
      </section>
    </div>
  </main>""",
        "Final da página",
    ),
]

pattern_mpi_20 = [
    (r"<([a-z0-9]+)\s*>\s*</\1>", r"", "Remove tags vazias"),
    (r"<[hp]\d?>\n*\s*<(h\d)>(.*?)<\/h\d>\n*\s*<\/[hp]\d?>", r"<\g<1>>\g<2></\g<1>>", "Remove strong dos títulos"),
    (r"(<h\d>)(.*?)<strong>(.*?)</strong>(.*?)(</h\d>)", r"\g<1>\g<2>\g<3>\g<4>\g<5>", "Remove strong dos títulos"),
    (r"<li>\s*\n*(.)", r"<li>\g<1>", "Formata as li's"),
    (
        r'<div class="wrapper">\s*\n*<\?= \$caminho2 \?>\s*\n*<h1><\?= \$h1; \?></h1>\s*\n*</div> <!-- \.wrapper -->',
        '<?php include("inc/bread-mpi.php"); ?>',
        "Altera a breadcrumb",
    ),
    (r"(<h\d>)(.*?)<strong>(.*?)</strong>(.*?)(</h\d>)", r"\g<1>\g<2>\g<3>\g<4>\g<5>", ""),
    (r"(<h\d>)\s*\n*(.)", r"\g<1>\g<2>", ""),
    (
        r"</article>\s*\n*<\? include\('inc/mpi-post-content\.php'\); \?>\s*\n*</div><!-- \.wrapper -->\s*\n*</section>",
        f"""</article>
          <? include('inc/coluna-lateral-icm.php'); ?>
          <div class="clear"></div>
        </div>
        <? include('inc/mpi-post-content.php'); ?>
      </section>""",
        "",
    ),
]


def clear_tags(content: str, patterns) -> str:
    output = content
    for item in patterns:
        pattern, replace, desc = item
        output = re.sub(pattern, replace, output)
        print(desc)
    return output


def processar_arquivo(caminho_arquivo):
    with codecs.open(caminho_arquivo, "r+", encoding="utf-8") as f:
        content = f.read()

        # Substituições específicas do segundo código
        # Atualizando o conteúdo alterado
        content = clear_tags(content, pattern_mpi_10)

        f.seek(0)
        f.write(content)
        f.truncate()


def percorrer_pasta(folder):
    # Abre o arquivo vetKey.php e lê o conteúdo
    with open(f"C:\\xampp\\htdocs\\{folder}\\inc\\vetKey.php", "r") as file:
        file_content = file.read()

    # Utiliza expressão regular para extrair as URLs
    urls = re.findall(r'"url" => "(.*?)"', file_content)

    for url in tqdm(urls):
        processar_arquivo(f"C:\\xampp\\htdocs\\{folder}\\{url}.php")

    print("Substituição concluída.")


# Exemplo de uso
if len(sys.argv) > 1:
    current_directory = os.path.abspath(sys.argv[1])
else:
    # Solicita o caminho se não houver argumento
    current_directory = input("Digite o caminho da pasta do usuário: ")

percorrer_pasta(current_directory)
