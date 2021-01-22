# WP Inline Cacher

Speed up your site for first-time visitors by inlining your resources.

The inline cache methodology emphasises fast first page loads. It acts on the basis that opening HTTP connections is slow, and that it is therefore faster for the resources to be inlined, but that we also want to cache those resources so they don't have to be re-downloaded.

That's what WP Inline Cacher does. It automatically renders your stylesheets inline on first page load, and caches them in the background. On subsequent page loads, the resources are no longer inlined - so your page weight is smaller - but are automatically retrieved from cache.

See https://github.com/ChrisBAshton/inline-cache for more details.
