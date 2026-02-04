#!/bin/bash
mkdir -p public/assets/product

# List of images
images=(
"//trysculptique.com/cdn/shop/files/LymoPDPImagesArtboard1_8e287aa1-576e-42b1-9a87-ce2fcdaded3a.jpg"
"//trysculptique.com/cdn/shop/files/LymphDrainageREWAMPEDvisualsArtboard2.jpg"
"//trysculptique.com/cdn/shop/files/LymphDrainageREWAMPEDvisualsArtboard3copy.jpg"
"//trysculptique.com/cdn/shop/files/LymphDrainageREWAMPEDvisualsArtboard4.jpg"
"//trysculptique.com/cdn/shop/files/LymphDrainageREWAMPEDvisualsArtboard5_1.jpg"
"//trysculptique.com/cdn/shop/files/LymphDrainageREWAMPEDvisualsArtboard5_2.jpg"
"//trysculptique.com/cdn/shop/files/LymphDrainageREWAMPEDvisualsArtboard6.jpg"
"//trysculptique.com/cdn/shop/files/LymphDrainageREWAMPEDvisualsArtboard8.jpg"
"//trysculptique.com/cdn/shop/files/LymphDrainageREWAMPEDvisualsArtboard9.jpg"
"//trysculptique.com/cdn/shop/files/LymphDrainageREWAMPEDvisualsArtboard10.jpg"
"//trysculptique.com/cdn/shop/files/LymphDrainageREWAMPEDvisualsArtboard11.jpg"
"//trysculptique.com/cdn/shop/files/LymphDrainageREWAMPEDvisualsArtboard12.jpg"
"//trysculptique.com/cdn/shop/files/LymphDrainageREWAMPEDvisualsArtboard13.jpg"
)

count=1
for url in "${images[@]}"; do
    # Remove leading // if present and add https:
    clean_url="https:${url#//}"
    filename="product-${count}.jpg"
    echo "Downloading $clean_url to $filename..."
    curl -s "$clean_url" -o "public/assets/product/$filename"
    ((count++))
done
