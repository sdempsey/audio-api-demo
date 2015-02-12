<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>

    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title><?php ( is_front_page() ? wp_title() : wp_title( '|', true, 'right' ) ) ?></title>

    <?php wp_head(); ?>

</head>

<body <?php body_class(); ?>>

    <script>
        // (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        // (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        // m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        // })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        // ga('create', 'UA-12345678-9', 'auto');
        // ga('send', 'pageview');
    </script>