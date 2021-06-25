
let profBonus = 3;

<!-- Str, Dex, Con, Int, Wis, Cha -->
let abilityScores = [8, 17, 14, 8, 12, 18];
let savingThrowProfs = [false, false, true, false, false, true];

function copyToClipboard(textToCopy) {
	/* Get the text field */
	var copyText = document.getElementById("rollBox");
	copyText.value = textToCopy;

	/* Select the text field */
	copyText.select();
	copyText.setSelectionRange(0, 99999); /* For mobile devices */

	/* Copy the text inside the text field */
	document.execCommand("copy");
}

function convertScoreToMod(scoreValue) {	
	return (Math.floor(scoreValue / 2) - 5);
}

function saveThrowPressed(index) {
	
	let modToUse = convertScoreToMod(abilityScores[index]);
	
	if(savingThrowProfs[index]) {
		modToUse += profBonus;
	}
	
	if(modToUse > 0) {
		copyToClipboard("/r 1d20 + " + modToUse);
	}
	else if(modToUse < 0) {
		copyToClipboard("/r 1d20" + modToUse);
	}else {
		copyToClipboard("/r 1d20");
	}
}

function rollInit() {
	
	let modToUse = convertScoreToMod(abilityScores[1]);
		
	if(modToUse > 0) {
		copyToClipboard("/r 1d20 + " + modToUse);
	}
	else if(modToUse < 0) {
		copyToClipboard("/r 1d20" + modToUse);
	}else {
		copyToClipboard("/r 1d20");
	}
}

function rollHitDie() {
	
	let currentBox = document.getElementById("hitDieSpinBox");
	let toUseBox = document.getElementById("hitDieToUseSpinBox");
	
	let numToUse = toUseBox.value;
	
	currentBox.value = currentBox.value - numToUse;
	
	copyToClipboard("/r " + numToUse + "d6");
	
}

function skillRoll(abilityIndex, isProf) {
	
	let modToUse = convertScoreToMod(abilityScores[abilityIndex]);
	
	if(isProf) {
		modToUse += profBonus;
	}
	
	if(modToUse > 0) {
		copyToClipboard("/r 1d20 + " + modToUse);
	}
	else if(modToUse < 0) {
		copyToClipboard("/r 1d20" + modToUse);
	}else {
		copyToClipboard("/r 1d20");
	}
}

function makeAttackRoll(attackRoll, damageRoll, level) {
	copyToClipboard(attackRoll + "\n"+ damageRoll);
	
	if(level == 1) {
		if(document.getElementById("spellsSlots1").value > 0)
			document.getElementById("spellsSlots1").value = document.getElementById("spellsSlots1").value - 1;
	}
	if(level == 2) {
		if(document.getElementById("spellsSlots2").value > 0)
			document.getElementById("spellsSlots2").value = document.getElementById("spellsSlots2").value - 1;
	}
	if(level == 3) {
		if(document.getElementById("spellsSlots3").value > 0)
			document.getElementById("spellsSlots3").value = document.getElementById("spellsSlots3").value - 1;
	}
	if(level == 4) {
		if(document.getElementById("spellsSlots4").value > 0)
			document.getElementById("spellsSlots4").value = document.getElementById("spellsSlots4").value - 1;
	}
	if(level == 5) {
		if(document.getElementById("spellsSlots5").value > 0)
			document.getElementById("spellsSlots5").value = document.getElementById("spellsSlots5").value - 1;
	}
	if(level == 6) {
		if(document.getElementById("spellsSlots6").value > 0)
			document.getElementById("spellsSlots6").value = document.getElementById("spellsSlots6").value - 1;
	}
	if(level == 7) {
		if(document.getElementById("spellsSlots7").value > 0)
			document.getElementById("spellsSlots7").value = document.getElementById("spellsSlots7").value - 1;
	}
	if(level == 8) {
		if(document.getElementById("spellsSlots8").value > 0)
			document.getElementById("spellsSlots8").value = document.getElementById("spellsSlots8").value - 1;
	}
	if(level == 9) {
		if(document.getElementById("spellsSlots9").value > 0)
			document.getElementById("spellsSlots9").value = document.getElementById("spellsSlots9").value - 1;
	}
}

function initSheet() {
	
	document.getElementById('inputfile')
            .addEventListener('change', function() {
              
            var fr=new FileReader();
            fr.onload=function(){
				
				var myData = JSON.parse(fr.result);
				
				document.getElementById("spellsSlots1").value = myData.CurrentSlots1;
				document.getElementById("spellsSlots2").value = myData.CurrentSlots2;
				document.getElementById("spellsSlots3").value = myData.CurrentSlots3;
				document.getElementById("spellsSlots4").value = myData.CurrentSlots4;
				document.getElementById("hpSpinBox").value = myData.CurrentHP;
				document.getElementById("hitDieSpinBox").value = myData.CurrentHitDie;
				document.getElementById("hitDieToUseSpinBox").value = 1;
				document.getElementById("wildMagic").value = myData.WildMagic;
				document.getElementById("sorcereryPoints").value = myData.SorcereryPoints;
				document.getElementById("bugStaff").value = myData.BugStaff;
				document.getElementById("tempHP").value = myData.TempHP;
            }
              
            fr.readAsText(this.files[0]);
        });
}

function openHelp(address) {
	console.log("Help");
	let newWindowObj = window.open(address, "Lookup");
}

function saveData() {
						
	let newData =`{
	"CurrentHP": ` + document.getElementById("hpSpinBox").value + `,
	"CurrentHitDie": ` +document.getElementById("hitDieSpinBox").value+ `,
	"CurrentSlots1": `+document.getElementById("spellsSlots1").value+`,
	"CurrentSlots2": `+document.getElementById("spellsSlots2").value+`,
	"CurrentSlots3": `+document.getElementById("spellsSlots3").value+`,
	"CurrentSlots4": `+document.getElementById("spellsSlots4").value+`,
	"WildMagic": `+document.getElementById("wildMagic").value+`,
	"SorcereryPoints": `+document.getElementById("sorcereryPoints").value+`,
	"BugStaff": `+document.getElementById("bugStaff").value+`,
	"TempHP": `+document.getElementById("tempHP").value+`
	}`;
		
	return newData;
}

function download() {
	
	let filename = "SaveData.json";
	let text = saveData();
	
	  var element = document.createElement('a');
	  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	  element.setAttribute('download', filename);

	  element.style.display = 'none';
	  document.body.appendChild(element);

	  element.click();

	  document.body.removeChild(element);
}
