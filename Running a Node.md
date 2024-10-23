# Running a Bitcoin Betting Node

Running a Bitcoin Betting Node will help decentralize the network and make you independent of any third party. You will always keep a full copy of every transaction on your own server.  Each transaction that is processed by your node will generate mining fees. For a simple transaction these fees are around 1 satoshi.
To be able to mine and receive the mining fees you need to have an account / invite to the platform.  

## 1. Check requirements 

You need a server with Ubuntu 18.04 or higher, 16 GB of RAM and at least 2 vCPU cores.  Furthermore, if you like to connect to your node from the browser, it is required to register a domain and a SSL certificate. 

##  2. Install Tmux, Unzip, Dotnet and other depencencies.
```
wget -q https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb && sudo dpkg -i packages-microsoft-prod.deb && sudo apt-get -y update && sudo apt-get -y install software-properties-common 
&& sudo add-apt-repository universe && sudo apt-get -y update && sudo apt-get -y install apt-transport-https && sudo apt-get -y install dotnet-sdk-8.0 && sudo apt-get -y install unzip && sudo apt-get -y install tmux && sudo apt-get -y update 
&& sudo apt-get -y upgrade && mkdir bbet-node && cd bbet-node && echo "setw -g mouse on" >> /root/.tmux.conf && echo "set-option -g history-limit 50000" >> /root/.tmux.conf
```
## 3. Download and extract the latest version.
```
wget -O bbet-node.zip https://ipfs.io/ipfs/QmeQMLBrSSWaNrRdeaoEMcLueHJPAbB2Wfmf5S525rATSn && unzip bbet-node.zip
```

## 4. Register a domain  (optional)

### 4.1. Install Apache
```
sudo apt install apache2 && sudo ufw allow 'Apache' && sudo apt -y install certbot python3-certbot-apache
```
### 4.2. Register your domain name at your service provider

Now register the domainname and link it to the IP.

Namecheap for example add:

A Record  @  [YOUR IP]

CNAME Record  www  [DOMAINANME]

### 4.3. Use certbot to acquire a SSL certificate
```
sudo certbot --apache
```
Follow the process and enter your domain and further details for example:  mydomain.test

### 4.4. Restart apache and make some final checks
```
sudo systemctl restart apache2

sudo systemctl status certbot.timer

sudo certbot renew --dry-run
```
### 4.5. generate pfx file

Inside the bbet-node directory run, gnereate the pfx file.  Replace mydomain.test with your actualy domain. 
```
openssl pkcs12 -export -in /etc/letsencrypt/live/mydomain.test/cert.pem -inkey /etc/letsencrypt/live/mydomain.test/privkey.pem -out HHServer2.pfx
```
Enter some password. For example: somepassword

## 5. make an api key for etherscan.io  (optional)


## 6. Edit the config file
```
nano config.json
```
Update your private key, user id, password for the pfx file, api-key

## 7. Run the Node
```
tmux new-session -s bbet-node
```

inside the tmux session:

```
dotnet HHServer2.dll
```


//if there is no connection  check the firewall to allow traffic on port 81 and 82, for example try:
```
sudo ufw disable
```

