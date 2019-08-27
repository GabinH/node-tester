#!/usr/bin/env bash
set -e

echo 'Generating SSL certificate'

SUBJ="
C=FR
ST=
O=UsersAI
localityName=Montpellier
commonName=users-dev.com
organizationalUnitName=
emailAddress=ops@users.ai
"

  openssl genrsa 4096 > ./dev/ssl/users-dev.com.key

  openssl req -new \
      -subj "$(echo -n "$SUBJ" | tr "\n" "/")" \
      -key ./dev/ssl/"users-dev.com.key" > ./dev/ssl/users-dev.com.csr

  openssl x509 -req -days 3650 -CAcreateserial \
      -signkey ./dev/ssl/users-dev.com.key \
      -in ./dev/ssl/users-dev.com.csr \
      -extfile ./dev/ssl/users-dev.com.extensions \
      -extensions usersai_dev_com > ./dev/ssl/users-dev.com.crt

  if [[ "$(uname -s)" == "Darwin" ]]; then
    echo 'Delete previous trusted certificates'
    security find-certificate -c "users-dev.com" -a -Z | \
        grep 'SHA-1 hash' | \
        cut -f 3 -d ' ' | \
        xargs -I % bash -c "echo 'Removing %' && sudo security delete-certificate -Z %"

    echo 'Add certificate to trusted certificates'
    sudo security add-trusted-cert -d \
        -r trustRoot \
        -k /Library/Keychains/System.keychain \
        ./dev/ssl/users-dev.com.crt

  else
    echo 'Add certificate to trusted certificates'
    sudo cp ./dev/ssl/users-dev.com.crt /usr/local/share/ca-certificates/
    sudo update-ca-certificates

  fi

  echo 'Export certificates for nginx'
  mv ./dev/ssl/users-dev.com.{crt,key} ./dev/nginx/etc/nginx/
}
