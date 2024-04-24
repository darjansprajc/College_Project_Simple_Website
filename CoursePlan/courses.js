if (sessionStorage.getItem("token")) {
    
    let courses = new Array();

    fetch("https://www.fulek.com/data/api/supit/curriculum-list/hr", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    })
    .then((response) => response.json())
    .then((result) => {
        courses = result.data
        autocompleteField();
    })
    .catch((error) => console.error(error));

    function autocompleteField(){
        const courseNames = new Array();
        let i = 0;
        courses.forEach(element => {
            courseNames[i] = element.kolegij;
            i++;
        });

        $('#courseName').autocomplete({
            source: courseNames,
            autoFocus: true,
            focus: (e, ui) =>{
                e.preventDefault();
            },
            select: function (e, ui){
            e.preventDefault();
            $(this).val(ui.item.value);
            }
        })
    }
    
    const input = document.getElementById("courseName");
    const table = document.getElementById("coursesTable");
    
    let sumEcts = 0;
    let sumSati = 0;
    let sumPredavanja = 0;
    let sumVjezbe = 0;

    const ects = document.getElementById("ectsUkupno");
    const sati = document.getElementById("satiUkupno");
    const predavanja = document.getElementById("predavanjaUkupno");
    const vjezbe = document.getElementById("vjezbeUkupno");

    function deleteRow(numbersData){
        sumEcts -= numbersData.ects;
        sumSati -= numbersData.sati;
        sumPredavanja -= numbersData.predavanja;
        sumVjezbe -= numbersData.vjezbe;

        ects.innerHTML = sumEcts;
        sati.innerHTML = sumSati;
        predavanja.innerHTML = sumPredavanja;
        vjezbe.innerHTML = sumVjezbe;

        const row = document.getElementById("button" + numbersData.id).parentNode.parentNode
        row.remove();
    }

    const tbody = document.getElementsByTagName("tbody")[0];

    input.addEventListener("keydown", (e) => {
        if(e.key === "Enter")
        {
            const inputValue = e.target.value;
            courses.forEach(element => {
                if(inputValue === element.kolegij)
                {
                    const id = element.id;         
                    fetch("https://www.fulek.com/data/api/supit/get-curriculum/" + id, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                        },
                    })
                    .then((response) => response.json())
                    .then((result) => {

                        var numbersData= {
                            id: id,
                            ects: result.data.ects,
                            sati: result.data.sati,
                            predavanja: result.data.predavanja,
                            vjezbe: result.data.vjezbe,
                        };

                        var row = tbody.insertRow(0);
                        cell1 = row.insertCell(0);
                        cell1.innerHTML = result.data.kolegij;
                        cell2 = row.insertCell(1);
                        cell2.innerHTML = result.data.ects;
                        cell3 = row.insertCell(2);
                        cell3.innerHTML = result.data.sati;
                        cell4 = row.insertCell(3);
                        cell4.innerHTML = result.data.predavanja;
                        cell5 = row.insertCell(4);
                        cell5.innerHTML = result.data.vjezbe;
                        cell6 = row.insertCell(5);
                        cell6.innerHTML = result.data.tip;
                        cell7 = row.insertCell(6);

                        var button = document.createElement('button');
                        button.id = 'button' + numbersData.id;
                        button.innerHTML = 'Delete';
                        button.onclick = function() {
                            deleteRow(numbersData);
                        };

                        cell7.appendChild(button);
                        
                        sumEcts += result.data.ects;
                        sumSati += result.data.sati;
                        sumPredavanja += result.data.predavanja;
                        sumVjezbe += result.data.vjezbe;

                        ects.innerHTML = sumEcts;
                        sati.innerHTML = sumSati;
                        predavanja.innerHTML = sumPredavanja;
                        vjezbe.innerHTML = sumVjezbe;
                    })
                    .catch((error) => console.error(error));            
                }
            })
        }
    })

}