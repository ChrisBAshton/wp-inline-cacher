<?php
class InlineCacher {
  public static function cached($url, $hash) {
    $cached = json_decode(stripslashes($_COOKIE["inline-cacher"]));
    if (!$cached) {
      // anything that isn't valid JSON will be decoded as null
      return false;
    }
    $sanitized_cache = array();
    foreach ($cached as $resource_url => $version) {
      $sanitized_cache[esc_url_raw($resource_url)] = strip_tags($version);
    }
    return $sanitized_cache[$url] == $hash;
  }
}
