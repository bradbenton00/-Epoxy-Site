Elizabethtown Epoxy Flooring — SiteGround Deployment Guide
===========================================================

WHAT'S IN THIS ZIP
------------------
All files in this ZIP belong in your SiteGround public_html folder.

  .htaccess          — URL rewrites, caching headers, and HTTPS redirect
  robots.txt         — Search engine crawl rules
  sitemap.xml        — XML sitemap for Google/Bing indexing
  styles.css         — Global stylesheet
  index.html         — Homepage
  404.html           — Custom "page not found" page
  garage-floor-epoxy/        — Service page
  basement-floor-coating/    — Service page
  commercial-epoxy-flooring/ — Service page
  polyaspartic-floor-coating/— Service page
  epoxy-flooring-hardin-county/ — Location page
  epoxy-flooring-radcliff/   — Location page
  epoxy-flooring-vine-grove/ — Location page
  epoxy-flooring-fort-knox/  — Location page
  blog/                      — Blog articles

HOW TO DEPLOY VIA SITEGROUND FILE MANAGER
------------------------------------------
1. Log in to SiteGround Site Tools.
2. Go to Site → File Manager.
3. Open the public_html folder.
4. Click Upload → select this ZIP file → wait for it to finish.
5. Right-click the ZIP in File Manager → Extract.
6. Make sure all files end up directly inside public_html (not in a subfolder).
   If extraction created a subfolder, move its contents up one level.
7. Delete this README.txt and the ZIP from the server — they don't need to be public.
8. Visit your domain to confirm the site loads correctly.

HOW TO DEPLOY VIA FTP/SFTP
----------------------------
1. Extract this ZIP locally on your computer.
2. Connect to SiteGround via FTP (use FileZilla or similar).
   - Host: your domain or SiteGround FTP hostname
   - Username/Password: from SiteGround Site Tools → FTP Accounts
3. Upload all extracted files into the public_html directory.
4. Verify .htaccess was uploaded (it starts with a dot — some FTP clients hide it;
   enable "show hidden files" in your FTP client settings).

NOTES
------
- The .htaccess file handles clean URLs (no .html extension needed).
- HTTPS redirect is already configured in .htaccess — no extra plugin needed.
- If you see a 404 on any page, confirm .htaccess uploaded correctly.

Questions? Contact your developer or SiteGround support.
