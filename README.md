# PWA_Template

Download the files to your server, and put them in a root folder of your web server, e.g., in the case of http-server, "public".

Then, serve them with a web server, such as:

```bash
npx http-server public -p 8085
```

where "public" is the name of the folder you downloaded the files to, and 8085 is the port you want to serve the files on.

You can access the site at http://server-address:8085

## Public & HTTPS Deployment
You may deploy your site to the web using a service like Netlify. This template is currently deployed at: 
https://pwa-3504.netlify.app/
(May not work if you are reading this in the future!)