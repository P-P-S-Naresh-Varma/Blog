# TiredRice

A personal food diary, mostly from Hyderabad.

## Edit from your phone

The site is a static site hosted on GitHub Pages. You can edit diary entries and set their photos using [Pages CMS](https://app.pagescms.org/) in your phone's browser.

1. Sign in to Pages CMS with the GitHub account that has access to this repository.
2. Open the **TiredRice** repository and choose **Food diary**.
3. Tap an entry to edit it, or add an entry. The short note is shown on the card; the extra story is optional.
4. In **Food photo URL or path**, paste a direct, publicly accessible image URL. It must point to the image itself, not a Google Images results page or a Google Maps page. Alternatively, enter a path to an image already stored in the repository, such as `images/cafe-niloufer-chai.png`.
5. Save the change to `main`. GitHub Pages will publish it automatically after a short wait.

The CMS photo field accepts URLs or existing repository paths instead of uploading files. This avoids the `413` error from oversized uploads. Links to images hosted elsewhere may stop working if the host removes the image or blocks embedding it.

Entries are stored in [`data/reviews.json`](./data/reviews.json). The Pages CMS setup is in [`.pages.yml`](./.pages.yml). The site deploys from the same repository, so there is no separate publishing step.
