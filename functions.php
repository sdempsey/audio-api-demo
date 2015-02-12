<?php

/*  ==========================================================================
     SCRIPTS, STYLESHEETS, AND FAVICONS
    ========================================================================== */

/*   Frontend Enqueuer
    --------------------------------------------------------------------------  */

    function frontend_enqueuer() {

        wp_enqueue_style( 'fonts', 'http://fonts.googleapis.com/css?family=Source+Code+Pro:300,400,700', null, '1.0' );
        wp_enqueue_style( 'font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css', null, '1.0' );
        wp_enqueue_style( 'style', get_stylesheet_uri(), null, '1.0', 'all' );

        wp_enqueue_script( 'global', get_template_directory_uri() . '/scripts/site/global.js', array('jquery'), '1.0', true );

        /**
         * Localize site URLs for use in JavaScripts
         * Usage: SiteInfo.theme_directory + '/scripts/widget.js'
         */
        $site_info = array(
            'homeUrl'        => get_home_url(),
            'theme_directory' => get_template_directory_uri(),
            'the_title'       => get_the_title()
        );
        wp_localize_script( 'polyfills', 'SiteInfo', $site_info );
        wp_localize_script( 'global', 'SiteInfo', $site_info );
    }
    add_action( 'wp_enqueue_scripts', 'frontend_enqueuer' );
?>
