// samples.json url path
const url = 'samples.json';

// fetch json with d3
d3.json(url).then(function(data){
    console.log(data);
    console.log(data.samples);
    console.log(data.samples[0].sample_values);
    console.log(data.samples[44].sample_values);
    console.log(data.samples[0].otu_ids)
    // sort samples_values ascending
    var sortedBySampleValues = data.samples.sort((a,b)=>a.sample_values-b.sample_values);
    // slice top ten
    slicedData = sortedBySampleValues.slice(0,10);
    // reverse data to match rubric
    reversedData = slicedData.reverse();
    console.log(reversedData);
    console.log(reversedData[0].sample_values);
    console.log(reversedData[0].sample_values.slice(0,10));
    console.log(reversedData[0].otu_ids.slice(0,10).toString());
    console.log(sortedBySampleValues[0].otu_ids.map(String).slice(0,10).reverse());
    var yVal = sortedBySampleValues[0].otu_ids.map(String).slice(0,10).reverse();
    var xVal = sortedBySampleValues[0].sample_values.slice(0,10).reverse();
    console.log(yVal);
    // populate test subject ID no. dropdown
    for(i=0;i<sortedBySampleValues.length;i++){
        d3.select('#selDataset')
            .append('option').text(sortedBySampleValues[i].id)
            .attr('value',i);
    };

    console.log(data.metadata[0].id)
    console.log(data.metadata[0].ethnicity)
    console.log(data.metadata[0].id)
    console.log(data.metadata[0].id)
    console.log(data.metadata[0].id)

    //var tbody = d3.select('tbody');
    d3.select('#metaId').append('td').text('ID: '+data.metadata[0].id);
    d3.select('#ethnicity').append('td').text('Ethnicity: '+data.metadata[0].ethnicity);
    d3.select('#gender').append('td').text('Gender: '+data.metadata[0].gender);
    d3.select('#age').append('td').text('Age: '+data.metadata[0].age);
    d3.select('#location').append('td').text('Location: '+data.metadata[0].location);
    d3.select('#bbtype').append('td').text('BBType: '+data.metadata[0].bbtype);
    d3.select('#wfreq').append('td').text('WFreq: ' +data.metadata[0].wfreq);
    

    // concat. 'OTU' + otu_ids
    var otuStringArr = [];
    function convertToString(arr){
        for (i=0;i<arr.length;i++){
            console.log(arr[i]);
            console.log('OTU '+arr[i]);
            otuStringArr.push('OTU '+arr[i]);
        }; 
    };

    convertToString(yVal);
    console.log(otuStringArr);

    console.log(sortedBySampleValues[0].id);
    console.log(data.metadata[0]);

    // chart stuff

    var trace1 = {
        x: xVal,
        y: otuStringArr,
        text: yVal,
        name:'something',
        type:'bar',
        orientation:'h'
    };
    // data
    var bar_data = [trace1];

    // apply layout 
    var layout = {
        title:'something',

    }

    Plotly.newPlot('bar',bar_data,layout);

    var trace2 = {
        y: sortedBySampleValues[0].sample_values,
        x: sortedBySampleValues[0].otu_ids,
        mode: 'markers',
        marker: {
            size: [0,20,40,60,80,100,120,140,160,180]
        }
    };

    var bubble_data = [trace2];

    var bubble_layout = {
        title: 'title',
        showlegend: false,
        height: 600,
        width: 1000
    };

    Plotly.newPlot('bubble',bubble_data,bubble_layout);
    //console.log(bubbleYVal);

});

function optionChanged(){
    // fetch id menu dropdown selection with d3
    var idDropdownMenu = d3.select('#selDataset');
    var idData = idDropdownMenu.property('value');
    console.log(idData);

    // grab samples.json data with d3
    d3.json(url).then(function(data){
        // sort sample_values
        var sortedBySampleValues = data.samples.sort((a,b)=>a.sample_values-b.sample_values);
        console.log(sortedBySampleValues[idData].sample_values.slice(0,10));

        // grabs id data based on idx value of names
        var yVal = sortedBySampleValues[idData].otu_ids.map(String).slice(0,10).reverse();
        var bubbleYVal = sortedBySampleValues[idData].otu_ids.slice(0,10).reverse();
        console.log(yVal);
        console.log(bubbleYVal);
        var xVal = sortedBySampleValues[idData].sample_values.slice(0,10).reverse();
        console.log(xVal);

        // clear default metadata table
        var tbody = d3.select('tbody');
        var row = tbody.append('tr');
        var cell = row.append('td')

        tbody.html('');

        // create append metadata table
        cell.text('ID: '+data.metadata[idData].id);
        cell.text('Ethnicity: '+data.metadata[idData].ethnicity);
        cell.text('Gender: '+data.metadata[idData].gender);
        cell.text('Age: '+data.metadata[idData].age);
        cell.text('Location: '+data.metadata[idData].location);
        cell.text('BBType: '+data.metadata[idData].bbtype);
        cell.text('WFreq: ' +data.metadata[idData].wfreq);

        // concat. 'OTU' + otu_ids
        var otuStringArr = [];
        function convertToString(arr){
            for (i=0;i<arr.length;i++){
                //console.log(arr[idData]);
                //console.log('OTU '+arr[idData]);
                otuStringArr.push('OTU '+arr[i]);
            }; 
        };

        convertToString(yVal);
        console.log(otuStringArr);

        //console.log(sortedBySampleValues[0].id);
        //console.log(data.metadata[0]);

        // chart stuff

        var trace1 = {
            x: xVal,
            y: otuStringArr,
            text: yVal,
            name:'something',
            type:'bar',
            orientation:'h'
        };
        // data
        var bar_data = [trace1];

        // apply layout 
        var layout = {
            title:'something',

        }

        Plotly.newPlot('bar',bar_data,layout);
        // Plotly.restyle('bar','x',[x]);
        // Plotly.restyle('bar','y',[y]);
        });

        //console.log(data.metadata[idData].id);
        var trace2 = {
            x: sortedBySampleValues[idData].sample_values.slice(0,10).reverse(),
            y: sortedBySampleValues[idData].otu_ids.slice(0,10).reverse(),
            mode: 'markers',
            marker: {
                size: [40,60,80,100]
            }
        };

        var bubble_data = [trace2];

        var bubble_layout = {
            title: 'title',
            showlegend: false,
            height: 600,
            width: 600
        };

        Plotly.newPlot('bubble',bubble_data,bubble_layout);
        console.log(bubbleYVal);

    
};