var trainingMaxArr = [0, 0, 0, 0];
var schemaHeaderArr = ["Percent of TM", "Squat", "Bench", "Deadlift", "Press", "Reps"];
var traditionalCycle = [[0.4, 0.5, 0.6, 0.65, 0.75, 0.85],[0.4, 0.5, 0.6, 0.70, 0.80, 0.90], [0.4, 0.5, 0.6, 0.75, 0.85, 0.95]];
var traditionalReps = [[5, 5, 3, 5, 5, "5+"],[5, 5, 3, 3, 3, "3+"], [5, 5, 3, 5, 3, "1+"]];

//Function to calculate one rep max in lbs given provided weight/rep values
function getOneRepMax(){
  var weight = parseInt(document.getElementById("orm_test_weight").value), reps = parseInt(document.getElementById("orm_test_reps").value), modifier = 0.0333, max = weight * reps * modifier + weight;
  document.getElementById("outputMax").innerHTML = "One Rep Max (rounded): " + Math.round(max) +" lbs";
}
  
function getTrainingMax(){
  var percentage = document.getElementById("tm").value, squat = parseInt(document.getElementById("squatMax").value), bench = parseInt(document.getElementById("benchMax").value), deadlift = parseInt(document.getElementById("deadliftMax").value), press = parseInt(document.getElementById("pressMax").value);
  document.getElementById("squatMax").value = squat;
  document.getElementById("benchMax").value = bench;
  document.getElementById("deadliftMax").value = deadlift;
  document.getElementById("pressMax").value = press;
  squat = squat * percentage;
  bench = bench * percentage;
  deadlift = deadlift * percentage;
  press = press * percentage;
  document.getElementById("squatTM").value = Math.round(squat);
  document.getElementById("benchTM").value = Math.round(bench);
  document.getElementById("deadliftTM").value = Math.round(deadlift);
  document.getElementById("pressTM").value = Math.round(press);
}

//include cycle parameter?
function createMainLiftTables(){
  //Update values from html
  trainingMaxArr[0] = parseInt(document.getElementById("squatTM").value);
  trainingMaxArr[1] = parseInt(document.getElementById("benchTM").value);
  trainingMaxArr[2] = parseInt(document.getElementById("deadliftTM").value);
  trainingMaxArr[3] = parseInt(document.getElementById("pressTM").value);
  
  var tableDiv = document.getElementById("mainLiftTables");
  
  //Remove previous table data.
  while(tableDiv.childElementCount > 0){
    tableDiv.removeChild(tableDiv.lastChild);
  }
 
  var cycle = traditionalCycle;
  var reps = traditionalReps;
  for (let i = 0; i < cycle.length; i++){
    var header = document.createElement("H4");
    header.innerHTML = "Week " + (i + 1) + ":";
    tableDiv.appendChild(header);
    addTable(tableDiv, cycle, i, reps);
  }
}

function addTable(div, cycle, weekIndex, reps){
  var table = document.createElement("TABLE");
  addHeader(table);
  for (let i = 0; i < cycle[weekIndex].length; i++){
    var row = table.insertRow(i+1);
    for(let j = 0; j <= trainingMaxArr.length + 1; j++){
      var cell = row.insertCell(j);
      if (j == 0){
        cell.innerHTML = cycle[weekIndex][i] * 100 + "%";
      } else if(j == trainingMaxArr.length + 1){
        cell.innerHTML = reps[weekIndex][i];
      } else{
        cell.innerHTML = Math.round(trainingMaxArr[j - 1] * cycle[weekIndex][i]) +" lbs";
      }
    }
  }
  div.appendChild(table);
}

function addHeader(table){
  var header = table.createTHead();
  var row = header.insertRow(0);
  for (let i = 0; i < schemaHeaderArr.length; i ++){
    var cell = row.insertCell(i);
    cell.innerHTML = "<b>" + schemaHeaderArr[i] + "</b>";
  }
}