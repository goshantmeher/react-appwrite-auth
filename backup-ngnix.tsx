sudo nano /etc/nginx/sites-available/appwrite.shopme.blog


server {
    server_name appwrite.shopme.blog;

    location / {
        proxy_pass https://localhost:7071;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/appwrite.shopme.blog/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/appwrite.shopme.blog/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot




}
server {
    if ($host = appwrite.shopme.blog) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    server_name appwrite.shopme.blog;
    return 404; # managed by Certbot


}


