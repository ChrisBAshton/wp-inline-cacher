<?php
add_filter('style_loader_tag',  'inline_cacher_logic', 10, 4);
function inline_cacher_logic( $html, $handle, $href, $media ) {
  $href = esc_url($href);
  preg_match('/\?ver=(.*)$/', $href, $matches);
  if ($matches[1]) {
    $version = esc_attr($matches[1]);
    if (InlineCacher::cached($href, $version)) {
      return '<link href="' . $href . '" rel="stylesheet" type="text/css" />';
    }
    else {
      // we need to retain ', ", & and > in CSS, but there's no need for a <
      // (which could otherwise open us up to attacks by putting `</style>...`
      // in the referenced CSS)
      $inline_css = str_replace("<", "", file_get_contents($href));
      return '<style data-src="' . $href . '" data-version="' . $version . '">' . $inline_css . '</style>';
    }
  }
  return $html;
}

function hook_inline_cacher() {
?>
<script>
<?php
ob_start();
include("js/client.js");
echo ob_get_clean();
?>
</script>
<?php
}
add_action('wp_head', 'hook_inline_cacher');
