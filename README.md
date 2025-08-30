# disable_autotranslations_googlelinks
A Chrome extension that automatically removes translated versions of Google Search results. Whenever the message “Translated by Google · View original (English)” appears, the extension clicks “View original” so you always see the original content instead of Google’s translated version.

🔎 Example of a translated result

Google sometimes shows search results already translated, with the banner:
“Translated by Google · View original (English)”
![Example of translated page](https://res.cloudinary.com/dvootznkb/image/upload/v1756552718/41476dd3-0d27-4aca-a68f-51021489802c.png)

# Configuration checklist (required for Google)

1. Install in developer mode
 - Open chrome://extensions/
 - Enable Developer mode 
 - Click Load unpacked and select the project folder
2. Allow access to search results (**IMPORTANT**)
 - In chrome://extensions/ → Extension details
 - Check the box: Allow access to search page results

Without this, Chrome does not inject content.js into https://www.google.com/search, and the extension does nothing.

3. Permissions/Domains
    - Verify that manifest.json includes the Google domains you use (e.g., .com, .com.mx, .es, etc.).

If you change the manifest, reload the extension (Refresh button in chrome://extensions/).

4. Test
 - Open a Google search that displays “Translated by Google · View original (English).”
 - You should see the extension automatically click on “View original.”
## Screenshots

🔴 Before

Google Search shows translated snippets with the banner:
“Translated by Google · View original (English)”

![Before extension](https://res.cloudinary.com/dvootznkb/image/upload/v1756552549/015d9ec7-d3d2-4bff-807e-b6f5eb16274b.png)

🟢 After
The extension automatically clicks “View original”, so results are always displayed in their original language without extra clicks.

![After extension installed](https://res.cloudinary.com/dvootznkb/image/upload/v1756552551/d885eadf-84c0-4018-9c13-e9173f8b7d33.png)


## Authors
- [@ivan-acosta08](https://www.github.com/ivan-acosta08)


## License

[MIT](https://choosealicense.com/licenses/mit/)

