source "https://rubygems.org"

# Local preview uses modern Jekyll (Ruby 3.2+ compatible).
# GitHub Pages builds the site with its own github-pages gem on the server,
# so this Gemfile only affects local development.
gem "jekyll", "~> 4.3"

group :jekyll_plugins do
  gem "jekyll-paginate"
  gem "jekyll-sitemap"
  gem "jekyll-gist"
  gem "jekyll-feed"
  gem "jekyll-redirect-from"
  gem "jemoji"
end

# Ruby >= 3.4 no longer bundles these by default
gem "csv"
gem "base64"
gem "bigdecimal"
gem "logger"
gem "webrick"

# Pin Dart Sass before the "mixed-decls" behaviour change so local CSS matches
# the Ruby Sass output that GitHub Pages produces (declarations after nested
# rules are hoisted instead of emitted in source order).
gem "sass-embedded", "~> 1.77.0"
