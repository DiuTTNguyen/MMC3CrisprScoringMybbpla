$(document).on("click", "#run", function () {
    run();
}).on("click", "#clear", function () {
    genes = [];
    results = [];
    cellLines = [];
    targetGeneName = "MYBBP1A";
    targetGene = {};
});


$(document).ready(function(){
    
    $('#upload').click(function(){

        var csv = $('#filename');
        var csvFile = csv[0].files[0];
        var ext = csv.val().split(".").pop().toLowerCase();

        if($.inArray(ext, ["csv"]) === -1){
            alert('upload csv');
            return false;
        }

        if(csvFile != undefined){
            reader = new FileReader();
            reader.onload = function(e) {
                csvResult = e.target.result.split(/\r|\n|\r\n/);
                //$('.csv').append(csvResult);
                analyseResult(csvResult);
            }
            reader.readAsText(csvFile);
        }
    });
});

var genes = [];
var results = [];
var cellLines = [];
var targetGeneName = "MYBBP1A";
var targetGene = {};

function analyseResult(csvResult) {
    var allRows = csvResult;
    for (var rowNumber = 0, l = csvResult.length; rowNumber < l; rowNumber++) {

        //skip first two header rows
        if (rowNumber <= 1) continue;

        var columns = allRows[rowNumber].split(",");

        if (rowNumber === 2)
        {
            for (var colNumber = 0; colNumber < columns.length; colNumber++) {
               // this is the header
                cellLines.push({
                    colNumber: colNumber,
                    value: columns[colNumber]
                });
            }

            console.log(cellLines);
            continue;
        }

        var cellLineValues = [];
        for (var colNumber = 1; colNumber < columns.length; colNumber++) {
            var cellLine = cellLines.find((cl) => cl.colNumber === colNumber);
            
            cellLineValues.push({
                key: cellLine.value,
                value: columns[colNumber]
            })
            
        }

        if (columns[0] === targetGeneName) {
            targetGene = {
                value: rowNumber - 1,
                label: columns[0],
                cellLinesValues: cellLineValues
            }
            continue;
        }
        
        if (!cellLineValues || cellLineValues.length === 0)
            continue;


        genes.push({
            value: rowNumber - 1,
            label: columns[0],
            cellLinesValues: cellLineValues
        });
        
    }

    $("#loadComplete").show();
    $("#upload").attr("disabled", "disabled");
}

function run() {
    if (genes.length == 0) 
        alert("no data!!");

    
    targetGeneValues = targetGene.cellLinesValues.map((val) => {
        return val.value;
    });

    for (var gene of genes) {

        comparisonGeneValues = gene.cellLinesValues.map((val) => {
            return val.value;
        });

        var result = pearsonCorrelation(targetGeneValues, comparisonGeneValues);

        if (result > 0.25) {
            results.push({
                        "gene": gene.label,
                        "pearsonCorrelation": result
                    });
        }
    }

    populateControls();
}

var geneOptions = "<table><thead>";

function populateControls() {

    geneOptions += "<th>Gene</th><th>Coefficient</th></thead>";
    geneOptions += "<tbody>";

    
    for (var result of results) {
        geneOptions += "<tr><td>" + result.gene + "</td>";
        geneOptions += "<td>" + result.pearsonCorrelation + "</td></tr>";
    }

    geneOptions += "</tbody></table>";
    debugger;
    $("#result").html(geneOptions);
}