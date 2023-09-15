awk 'BEGIN { FS = t }; { if (  == NOM ) print /bin/bash }' Lexique383.tsv | sort -t$'\t' -k10 -nr > sorted_lexique.tsv
awk -F t '{print } NR==10{exit}' sorted_lexique.tsv
