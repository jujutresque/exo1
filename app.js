/*
Fonction qui nous permet de remplir le tableau des programmes automatiquement.
Entrée : Une URL qui est ici le lien du fichier JSON contenant les programmes/pièces et un tableau qui est 
celui que l'on va remplir. 
Sortie : Rien.
*/
async function remplirTable(url, table){
    const tableHead = table.querySelector("thead");
    const tableBody = table.querySelector("tbody");
    const res = await fetch(url);
    const { results } = await res.json();

    tableHead.innerHTML = "<tr></tr>";
    tableBody.innerHTML = "";

    for (const nomPrograme of results){
        const headerElement = document.createElement("th");
        headerElement.textContent = nomPrograme.sName;
        tableHead.querySelector("tr").appendChild(headerElement);
    }

    for (const collone of results){
        const rowElement = document.createElement("tr");
        for (const nomPiece of collone.ProgrammeListeDesPieces){
            const cellElement = document.createElement("td");
            cellElement.setAttribute("id", nomPiece.ID);
            cellElement.textContent = nomPiece.sName;
            rowElement.appendChild(cellElement);
        }
        tableBody.appendChild(rowElement);
    }
}

/*
Fonction qui permet de créer automatiquement un nouveau tableau rempli, lorsque l'utilisateur clique
sur l'une des pièces du tableau des programmes.
Entrée :  Une URL qui est ici le lien du fichier JSON contenant la liste de matériel, un string qui
est l'ID de la pièce sur laquelle l'utilisateur à cliquer et un Booléen qui nous permettra de savoir
si le tableau est déjà créé.
Sortie : Rien.
*/
async function creerTableMateriel(url, idProgram, bool){
    if(bool == false){
        const body = document.body;
        tbl = document.createElement('table');
        tbl.setAttribute("id","tabMat");

        const res = await fetch(url);
        const material = await res.json();
        
        for (let i = 0; i < 4; i++) {
            const tr = tbl.insertRow();
            for (let j = 0; j < 4; j++) {
                if (i == 0 && j == 2 || i == 0 && j == 3 ) {
                    break
                } else {
                    const td = tr.insertCell();
                    if (i === 0 && j === 1) {
                        td.setAttribute('colSpan', '3');
                        td.textContent = "data";
                    }
                    if (i === 0 && j === 0) {
                        td.textContent = material.name;
                    }
                    if (i === 1 && j === 0) {
                        td.textContent = "Temperature";
                    }
                    if (i === 2 && j === 0) {
                        td.textContent = "Densite";
                    }
                    if (i === 3 && j === 0) {
                        td.textContent = "nuX";
                    }
                    if(i === 1 && j > 0){
                        td.textContent = material.masseVolumique[0].data[0].Temperature[j-1];
                    }
                    if(i === 2 && j > 0){
                        td.textContent = material.masseVolumique[0].data[1].Densite[j-1];
                    }
                    if(i === 3 && j > 0){
                        td.textContent = material.coeffPoisson[0].data[1].nuX[j-1];
                    }
                }
            }
        }
        body.appendChild(tbl);
    }

}

/*
On initialise un booléen a faux afin d'éviter de créer le deuxième tableau à chaque clique.
Dès que le deuxième tableau est créé on passe sa valeur à vrai.
*/
var tableMatCreer = false;

/*
On vérifie si l'utilisateur clique sur l'une des pièces et s'il le fait on commence
 la fonction qui permet de créer le deuxième tableau.
*/
const colloneTable = document.getElementsByTagName("tbody");
const caseClicker = e => { 
  console.log(e.target.id);
  creerTableMateriel("./materials.json", e.target.id, tableMatCreer);
  tableMatCreer = true;
}
for (let test of colloneTable) {
    test.addEventListener("click", caseClicker);
}


/*
On créer le tableau de programme dès le lancement de la page.
*/
remplirTable("./program.json", document.querySelector("table"))