
#!/bin/bash
imageName=tmd-admin-react:1.0
containerName=tmdadmin

sudo docker build -t $imageName .

echo Delete old container...
sudo docker rm -f $containerName

echo Run new container...
sudo docker run -d -p 5000:5000 --name $containerName $imageName