#!/bin/bash

# Create fonts directory if it doesn't exist
mkdir -p assets/fonts

# Download Fredoka fonts
curl -L "https://fonts.google.com/download?family=Fredoka" -o fredoka.zip
unzip -j fredoka.zip "static/*" -d assets/fonts/
mv assets/fonts/Fredoka-Light.ttf assets/fonts/
mv assets/fonts/Fredoka-Regular.ttf assets/fonts/
mv assets/fonts/Fredoka-Medium.ttf assets/fonts/
mv assets/fonts/Fredoka-SemiBold.ttf assets/fonts/
mv assets/fonts/Fredoka-Bold.ttf assets/fonts/

# Download Comic Neue fonts
curl -L "https://fonts.google.com/download?family=Comic+Neue" -o comic.zip
unzip -j comic.zip "static/*" -d assets/fonts/
mv assets/fonts/ComicNeue-Regular.ttf assets/fonts/
mv assets/fonts/ComicNeue-Bold.ttf assets/fonts/

# Clean up
rm fredoka.zip comic.zip

echo "Fonts downloaded successfully!" 