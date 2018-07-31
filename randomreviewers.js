if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}

var submitButton = document.getElementById("generate");
var resultsField = document.getElementById("results");

submitButton.addEventListener("submit", function(e) {
  e.preventDefault();
  var form = {
    names: trimNames(document.getElementById("names").value.split(",")),
    numOfReviewers: document.getElementById("numReviewers").value,
    numOfProposals: document.getElementById("numProposals").value
  };
  var generatedNames = generateNames(form.names, form.numOfReviewers, form.numOfProposals);

  results.innerHTML = namesToCSV(generatedNames);

});

function trimNames(names) {
  var trimmedNames = [];
  for (var i = 0; i < names.length; i++) {
    trimmedNames.push(names[i].trim());
  }
  return trimmedNames;
}


//produce a csv file so you can copy/paste names to a sheet.
function namesToCSV(names) {
  var csvString = "";
  for (var i = 0; i < names.length; i++) {
    csvString += names[i].join("\t") + "\n";
  }
  return csvString;
}

//generates the names and makes sure we don't have any duplicate names. returns array of arrays,
function generateNames(names, numOfReviewers, numOfProposals) {
  response = [];
  if ((names.length >= 1) && (numOfReviewers >= 1) && (numOfProposals >= 1)) {
    for (var i = 0; i < numOfProposals; i++) {
      var pair = randomName(numOfReviewers,names);
      var j = 0; //j used to break out of endless loop
      while ((j < 100) && (pair.filter(onlyUnique).length != pair.length)) {
        pair = randomName(numOfReviewers, names);
        j++;
      }
      response.push(pair);
      console.log(j, pair);
    }
  }
  return response;
}
/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 From: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//select a random name from the array of names
function randomName(numOfNames, names) {
  console.log(numOfNames);
  var reviewers = [];
  for (var i = 0; i < numOfNames; i++) {
    reviewers.push(names[getRandomInt(0, (names.length - 1))]);
  }
  return reviewers;
}

//from SO: https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
//returns unique values from an array
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
