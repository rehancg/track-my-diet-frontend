
#!/bin/bash
imageName=track-my-diet-admin:1.0
containerName=tmdadmin

sudo docker build -t $imageName -f Dockerfile  .

echo Delete old container...
sudo docker rm -f $containerName

echo Run new container...
sudo docker run -d -p 5000:5000 --name $containerName $imageName