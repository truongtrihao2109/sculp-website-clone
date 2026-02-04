#!/bin/bash
mkdir -p public/assets/icons/benefits

# List of benefit icons
icons=(
"//trysculptique.com/cdn/shop/files/population_12285628_1_e864791e-7a6d-4f08-9aea-3aeffba37cc7.png?v=1758713413"
"//trysculptique.com/cdn/shop/files/blood_13858030_1.png?v=1752064910"
"//trysculptique.com/cdn/shop/files/thigh_1431039_1_a75a1917-7cc8-40dc-923b-d09cece1d6e9.png?v=1758713413"
"//trysculptique.com/cdn/shop/files/smile_3318262_1_1da99ae9-5c63-4339-af75-d35f89cd1cbc.png?v=1758713414"
"//trysculptique.com/cdn/shop/files/blood_13858030_2_78da9178-9f3f-491e-a5f8-b4d69dd5b9cd.png?v=1758713414"
"//trysculptique.com/cdn/shop/files/ecology_18588873_1_dad420da-2490-4e30-828a-28b366974307.png?v=1758713413"
)

names=(
"icon-people.png"
"icon-cycle.png"
"icon-body.png"
"icon-sleep.png"
"icon-joint.png"
"icon-natural.png"
)

count=0
for url in "${icons[@]}"; do
    clean_url="https:${url#//}"
    filename="${names[$count]}"
    echo "Downloading $clean_url to $filename..."
    curl -s "$clean_url" -o "public/assets/icons/benefits/$filename"
    ((count++))
done
