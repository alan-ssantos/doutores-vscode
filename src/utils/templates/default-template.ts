const defaultTemplateContent = `<?
$h1         = "Title";
$title      = "Title";
$desc       = "Title - ";
$key        = "uuuuuuuuuu, jjjjjjjjjjjj, lllllllllll";
$var        = "Title";
include("inc/head.php");
?>
<!-- START SCRIPTS HEADER -->
<!-- END SCRIPTS HEADER -->
</head>

<body>
  <?php include("inc/topo.php"); ?>
  <main>
    <div class="content">
      <section>
        <?php include("inc/auto-breadcrumb.php"); ?>
        <!-- START COMPONENTS -->
        <div class="container">
          <div class="wrapper">
            <h2>Saiba mais sobre <?= $h1 ?></h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
          </div>
          <div class="clear"></div>
        </div>
        <!-- END COMPONENTS -->
      </section>
    </div>
  </main>
  <?php include("inc/footer.php"); ?>
  <!-- START SCRIPTS FOOTER -->
  <!-- END SCRIPTS FOOTER -->
</body>

</html>`;

export default defaultTemplateContent;
