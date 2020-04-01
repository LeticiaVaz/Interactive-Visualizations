//1. Use the D3 library to read in `samples.json`.

function buildingCharts (sample) {
    d3.json('samples.json').then((json_data) => {
      
  ///  var plotData = `/samples/${sample}`; 
        var samples = json_data.samples;
        console.log(samples)

        var filterResult = samples.filter(sampleObj=> sampleObj.id == sample);
        var result = filterResult[0];
///-----------------------

        var x_axis = result.otu_ids;
        var y_axis = result.sample_values;
        var size = result.sample_values;
        var color = result.otu_ids;
        var texts = result.otu_labels;

        var bubbleLayout = [{
          title: "Bacteria cultura",
          hovermode: "closest"
        }];


        var bubbleData = [{
          x: x_axis,
          y: y_axis,
          text: texts,
          mode: `markers`,
          marker: {

            size: size,
            color: color
        }}
        
        ];
        Plotly.newPlot("bubble",bubbleData,bubbleLayout);

        ///-----------------------

       });
 }

function init() {

    var selectId = d3.select("#selDataset") 

    d3.json("samples.json").then((json_data)=>{
        var idNumber = json_data.names;

        idNumber.forEach((selectedValues) => {
            selectId
                .append("option")
                .text(selectedValues)
                .property("value",selectedValues);     
        });
buildingCharts(idNumber[0]);  
    });
}

function optionChanged (sampleID) {
  buildingCharts(sampleID);

}
init();
