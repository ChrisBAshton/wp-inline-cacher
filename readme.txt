=== WP Inline Cacher ===
Contributors: ChrisBAshton
Donate link: http://twitter.com/ChrisBAshton
Tags: speed, caching, performance, inline, fast, service worker
Tested up to: 5.6
Stable tag: trunk
License: GPLv3
License URI: https://www.gnu.org/licenses/gpl-3.0.html

Speed up your site for first-time visitors by inlining your resources.

== Description ==

The inline cache methodology emphasises fast first page loads. It acts on the basis that opening HTTP connections is slow, and that it is therefore faster for the resources to be inlined, but that we also want to cache those resources so they don't have to be re-downloaded.

That's what WP Inline Cacher does. It automatically renders your stylesheets inline on first page load, and caches them in the background. On subsequent page loads, the resources are no longer inlined - so your page weight is smaller - but are automatically retrieved from cache.

See https://github.com/ChrisBAshton/inline-cache for more details.

== Installation ==

1. Install the plugin through the WordPress plugins screen directly
2. For now, you need to manually copy the 'js/sw.js' file to the root of your website directory, and name it 'sw-inline-cacher.js'. Or you can edit your .htaccess file:
`
RewriteRule ^inline-cache-sw\.js$ wp-content/plugins/wp-inline-cacher/js/sw.js
`
  We hope to automate this step in a future update.
3. Activate the plugin through the 'Plugins' screen in WordPress

== Frequently Asked Questions ==

= Which stylesheets does this apply to? =

WP Inline Cacher will style any stylesheets that have been enqueued using `wp_enqueue_style`.
If your theme has any hard-coded link rel stylesheet tags, or hard-coded inline styles, then this plugin is unable to intercept them.

= Does this work for JavaScript? =

Not yet, but in theory it could. Stay tuned for an updated plugin!

== Changelog ==

= 1.0 =
* Initial release

== Contact ==

If you spot any issues, or want to know how to contribute, please visit https://github.com/ChrisBAshton/wp-inline-Cacher.

Please note that I have open-sourced this plugin to give back to the community, and do not have much spare time to answer support queries, but I'll help where I can.
