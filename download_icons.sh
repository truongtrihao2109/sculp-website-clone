#!/bin/bash
mkdir -p public/assets/icons

# List of icons
icons=(
"//trysculptique.com/cdn/shop/files/delivery-truck_181581.png"
"//trysculptique.com/cdn/shop/files/download_5307610.png"
"//trysculptique.com/cdn/shop/files/Kaching-Bundles-Kaching-Bundles-Kaching-Bundles-gift-card_18054896_300x300_300x300_72117561-797d-4e48-9491-3bc1748ce974.png"
)

names=(
"delivery-truck.png"
"ebook.png"
"gift-card.png"
)

count=0
for url in "${icons[@]}"; do
    # Remove leading // if present and add https:
    clean_url="https:${url#//}"
    filename="${names[$count]}"
    echo "Downloading $clean_url to $filename..."
    curl -s "$clean_url" -o "public/assets/icons/$filename"
    ((count++))
done
