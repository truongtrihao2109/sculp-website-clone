#!/bin/bash
mkdir -p public/assets/reviews

# List of review images
reviews=(
"//cdn.shopify.com/s/files/1/0917/5649/5191/files/Trustpilot_review_2.png?v=1752485383"
"//cdn.shopify.com/s/files/1/0917/5649/5191/files/Trustpilot_review.png?v=1752480694"
"//cdn.shopify.com/s/files/1/0917/5649/5191/files/Trustpilot_review_1.png?v=1752480694"
)

names=(
"trustpilot-2.png"
"trustpilot-desktop.png"
"trustpilot-mobile.png"
)

count=0
for url in "${reviews[@]}"; do
     # Remove leading // if present and add https:
    clean_url="https:${url#//}"
    filename="${names[$count]}"
    echo "Downloading $clean_url to $filename..."
    curl -s "$clean_url" -o "public/assets/reviews/$filename"
    ((count++))
done
