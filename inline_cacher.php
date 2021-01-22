<?php
class InlineCacher {
  public static function cached($url, $hash) {
    $cached = json_decode(stripslashes($_COOKIE["inline-cacher"]));
    return $cached->$url == $hash;
  }
}
