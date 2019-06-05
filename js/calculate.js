function addRow(tableID) {
	var table = document.getElementById(tableID);
	var rowCount = table.rows.length;
	var row = table.insertRow(rowCount);

	var colCount = table.rows[0].cells.length;

	for(var i=0; i<colCount; i++) {

		var newcell	= row.insertCell(i);

		newcell.innerHTML = table.rows[0].cells[i].innerHTML;
		switch(newcell.childNodes[0].type) {
			case "text":
					newcell.childNodes[0].value = "";
					break;
			case "checkbox":
					newcell.childNodes[0].checked = false;
					break;
			case "select-one":
					newcell.childNodes[0].selectedIndex = 0;
					break;
		}
	}
}

function deleteRow(tableID) {
	try {
	var table = document.getElementById(tableID);
	var rowCount = table.rows.length;

	for(var i=0; i<rowCount; i++) {
		var row = table.rows[i];
		var chkbox = row.cells[0].childNodes[0];
		if(null != chkbox && true == chkbox.checked) {
			if(rowCount <= 1) {
				alert("Cannot delete all the rows.");
				break;
			}
			table.deleteRow(i);
			rowCount--;
			i--;
		}


	}
	}catch(e) {
		alert(e);
	}
}


function calculate(tableID) {
		var table = document.getElementById(tableID);
	var rows = table.rows.length;
	var totalparts = 0;
	var parts = 0;
	var perpart = 0;
	var converted = [];
		for (i=0; i < rows; i++) {
			var cell = table.rows[i].cells[1];
			var parts = cell.childNodes[0].value;
			if (parts.length>1) {
				//parse
				document.getElementById("tparts").innerHTML = parts;
			}
			totalparts = totalparts + parseInt(parts);
		}
		var upp = document.getElementById("amount").value;
		perpart = parseInt(upp)/totalparts;

		for (i=0; i < rows; i++) {
			var parts = table.rows[i].cells[1].firstChild.value;
			converted[i] = (parseInt(parts)*perpart).toFixed(2);
		}

		document.getElementById("parts").innerHTML = "YOU NEED: <br>\n";
		var units = document.getElementById("units").value;

		if(units=="Gallons") {
			units="Quarts";
			for (i=0; i < rows; i++) {
			converted[i] = converted[i]*4;
			}
		}
		for (i=0; i<rows; i++) {
			document.getElementById("parts").innerHTML += converted[i] + " " + String(units) + " of " + table.rows[i].cells[2].children[0].value + "<br>\n";
		}
	}
