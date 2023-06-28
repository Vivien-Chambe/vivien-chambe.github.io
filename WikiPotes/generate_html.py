import os
import shutil

names = ["Luc Pain","Coralie Roux","Mathis Mazet","Dorian Benoit","Luka Larguier","Prescilia Halbot","Thibault Abry","Swan Auvergne","Enzo Deloye"]

# Generate the HTML file for each person
# Copy the template file

list_files = os.listdir()

with open("lambda_wiki.html","r") as f:
    template = f.read()


names.sort()
for name in names:
    
    first_name = name.split()[0]
    last = name.split()[1]
    template_here = template.replace("Personne",first_name)
    template_here = template_here.replace("Lambda",last)
    print(f'<li><a href="{first_name.lower()}_wiki.html">{name}</a></li>')
    if f"{first_name.lower()}_wiki.html" in list_files:
        print(f"{first_name.lower()}_wiki.html already exists")
        continue

    with open(f"{first_name.lower()}_wiki.html","w") as f:
        f.write(template_here)
        print(f"{first_name.lower()}_wiki.html created")


