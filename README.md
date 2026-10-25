# TiredRice

A personal food diary, mostly from Hyderabad.

## Edit from your phone

The site is a static site hosted on GitHub Pages. You can edit diary entries and upload photos using [Pages CMS](https://app.pagescms.org/) in your phone's browser.

1. Sign in to Pages CMS with the GitHub account that has access to this repository.
2. Open the **TiredRice** repository and choose **Food diary**.
3. Tap an entry to edit it, or add an entry. The short note is shown on the card; the extra story is optional.
4. To add a photo, use the photo field to upload an image or choose one from the Images folder.
5. Save the change to `main`. GitHub Pages will publish it automatically after a short wait.

Entries are stored in [`data/reviews.json`](./data/reviews.json). The Pages CMS setup is in [`.pages.yml`](./.pages.yml). The site deploys from the same repository, so there is no separate publishing step.
