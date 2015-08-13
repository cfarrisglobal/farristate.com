var xmlhttp = new XMLHttpRequest();
var url = "/WebsiteChart/myTutorials.txt";
var overallArr;
var timeArr = [];

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = JSON.parse(xmlhttp.responseText);
        overallArr = myArr;
        var p;
        for(p = 0; p < myArr.length; p++) {
            var tempDate = new Date(overallArr[p].time);
            timeArr[p] = tempDate;
        }
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

google.load('visualization', '1', {packages: ['corechart', 'line']});
google.setOnLoadCallback(drawBasic);

function drawBasic() {

      var data = new google.visualization.DataTable();
      data.addColumn('datetime', 'X');
      data.addColumn('number', 'CPU 1');
      
      var t;
      for(t = 0; t < timeArr.length; t++) {
      data.addRows([
        [timeArr[t], overallArr[t].percent]
      ]);
      }

      var options = {
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: '%CPU Usage'
        },
        'width':1000,
        'height':400
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

      chart.draw(data, options);
    }