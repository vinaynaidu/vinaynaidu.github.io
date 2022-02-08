# vinaynaidu.github.io
experimental pages

	======================================================================
	____   ____.__                       _______         .__    .___
	\   \ /   /|__| ____ _____  ___.__.  \      \ _____  |__| __| _/_ __
	 \   Y   / |  |/    \\__  \<   |  |  /   |   \\__  \ |  |/ __ |  |  \
	  \     /  |  |   |  \/ __ \\___  | /    |    \/ __ \|  / /_/ |  |  /
	   \___/   |__|___|  (____  / ____| \____|__  (____  /__\____ |____/
	                   \/     \/\/              \/     \/        \/
	======================================================================

### Deploying locally

This is a barebones site and doesn't have any servers built in. Run it with:

		http-server -S -C cert.pem

This uses a locally produced ssl certificate. IF the certificate is lost, make a new one with:

		openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
