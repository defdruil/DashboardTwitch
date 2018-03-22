const http = require("http");
const baseURL = "http://localhost:8080/"

var interval;

var totalPopulation;

// #region All 25 game variables from API
var totalZombies;
var totalLiving;
var weekNumber;
var numberOfLivingsKilled;
var numberOfZombiesKilled;
var DiedWithoutBeingZombified;

var livingsDeadByGun;
var zombiesDeadByGun;

var livingsDeadByAccident;
var zombiesDeadByAccident;

var livingsDeadByFire;
var zombiesDeadByFire;

var livingsDeadByDesease;

var livingsDeadByHunger;
var zombiesDeadByHunger;

var livingsDeadByDehydratation;

var livingsDeadByBladedWeapon;
var zombiesDeadByBladedWeapon;

var livingsDeadByTrap;
var zombiesDeadByTrap;

var livingsDeadByZombieBite;

var livingsDeadFromOtherReason;

var day;
var month;
var year;
// #endregion

// #region Historised data
var totalZombiesHistory;
var totalLivingHistory;
var weekNumberHistory;
var numberOfLivingsKilledHistory;
var numberOfZombiesKilledHistory;
var DiedWithoutBeingZombifiedHistory;

var livingsDeadByGunHistory;
var zombiesDeadByGunHistory;

var livingsDeadByAccidentHistory;
var zombiesDeadByAccidentHistory;

var livingsDeadByFireHistory;
var zombiesDeadByFireHistory;

var livingsDeadByDeseaseHistory;

var livingsDeadByHungerHistory;
var zombiesDeadByHungerHistory;

var livingsDeadByDehydratationHistory;

var livingsDeadByBladedWeaponHistory;
var zombiesDeadByBladedWeaponHistory;

var livingsDeadByTrapHistory;
var zombiesDeadByTrapHistory;

var livingsDeadByZombieBiteHistory;

var livingsDeadFromOtherReasonHistory;

var dayHistory;
var monthHistory;
var yearHistory;
// #endregion

if (interval){
	clearInterval(interval);
}
interval = setInterval(getCurrentValues, 200);
resetHistoryVariables();

function getCurrentValues(){
	try {
		http.get(baseURL + "currentValues", res => {
			res.setEncoding("utf8");
			let body = "";
			res.on("data", data => {
				body += data;
			});
			res.on("end", () => {
				body = JSON.parse(body);
				// Get all needed informations and memorize them
				totalZombies = body.totalZombies;
				totalLiving = body.totalLiving;
				weekNumber = body.weekNumber;
				numberOfLivingsKilled = body.numberOfLivingsKilled;
				numberOfZombiesKilled = body.numberOfZombiesKilled;
				DiedWithoutBeingZombified = body.DiedWithoutBeingZombified;
				livingsDeadByZombieBite = body.deathReasons.livingsDeadByZombieBite;
				livingsDeadByGun = body.deathReasons.livingsDeadByGun;
				livingsDeadByAccident = body.deathReasons.livingsDeadByAccident;
				livingsDeadByFire = body.deathReasons.livingsDeadByFire;
				livingsDeadByHunger = body.deathReasons.livingsDeadByHunger;
				livingsDeadByDesease = body.deathReasons.livingsDeadByDesease;
				livingsDeadByDehydratation = body.deathReasons.livingsDeadByDehydratation;
				livingsDeadByBladedWeapon = body.deathReasons.livingsDeadByBladedWeapon;
				livingsDeadByTrap = body.deathReasons.livingsDeadByTrap;
				livingsDeadFromOtherReason = body.deathReasons.livingsDeadFromOtherReason;
				zombiesDeadByGun = body.deathReasons.zombiesDeadByGun;
				zombiesDeadByAccident = body.deathReasons.zombiesDeadByAccident;
				zombiesDeadByFire = body.deathReasons.zombiesDeadByFire;
				zombiesDeadByHunger = body.deathReasons.zombiesDeadByHunger;
				zombiesDeadByBladedWeapon = body.deathReasons.zombiesDeadByBladedWeapon;
				zombiesDeadByTrap = body.deathReasons.zombiesDeadByTrap;
				day = body.day;
				month = body.month;
				year = body.year;

				totalPopulation = totalZombies + totalLiving;
				
				// History Request
				http.get(baseURL + "getHistory", res => {
					res.setEncoding("utf8");
					let body = "";
					res.on("data", data => {
						body += data;
					});
					res.on("end", () => {
						body = JSON.parse(body);
						// Get all needed informations and memorize them*
						totalZombiesHistoryTemp = Array();
						totalLivingHistoryTemp = Array();
						weekNumberHistoryTemp = Array();
						numberOfLivingsKilledHistoryTemp = Array();
						numberOfZombiesKilledHistoryTemp = Array();
						DiedWithoutBeingZombifiedHistoryTemp = Array();
						livingsDeadByZombieBiteHistoryTemp = Array();
						livingsDeadByGunHistoryTemp = Array();
						livingsDeadByAccidentHistoryTemp = Array();
						livingsDeadByFireHistoryTemp = Array();
						livingsDeadByHungerHistoryTemp = Array();
						livingsDeadByDeseaseHistoryTemp = Array();
						livingsDeadByDehydratationHistoryTemp = Array();
						livingsDeadByBladedWeaponHistoryTemp = Array();
						livingsDeadByTrapHistoryTemp = Array();
						livingsDeadFromOtherReasonHistoryTemp = Array();
						zombiesDeadByGunHistoryTemp = Array();
						zombiesDeadByAccidentHistoryTemp = Array();
						zombiesDeadByFireHistoryTemp = Array();
						zombiesDeadByHungerHistoryTemp = Array();
						zombiesDeadByBladedWeaponHistoryTemp = Array();
						zombiesDeadByTrapHistoryTemp = Array();
						dayHistoryTemp = Array();
						monthHistoryTemp = Array();
						yearHistoryTemp = Array();
						
						for (var i = 0 ; i < body.length ; i++) {
							totalZombiesHistoryTemp.push(body[i].totalZombies);
							totalLivingHistoryTemp.push(body[i].totalLiving);
							weekNumberHistoryTemp.push(body[i].weekNumber);
							numberOfLivingsKilledHistoryTemp.push(body[i].numberOfLivingsKilled);
							numberOfZombiesKilledHistoryTemp.push(body[i].numberOfZombiesKilled);
							DiedWithoutBeingZombifiedHistoryTemp.push(body[i].DiedWithoutBeingZombified);
							livingsDeadByZombieBiteHistoryTemp.push(body[i].deathReasons.livingsDeadByZombieBite);
							livingsDeadByGunHistoryTemp.push(body[i].deathReasons.livingsDeadByGun);
							livingsDeadByAccidentHistoryTemp.push(body[i].deathReasons.livingsDeadByAccident);
							livingsDeadByFireHistoryTemp.push(body[i].deathReasons.livingsDeadByFire);
							livingsDeadByHungerHistoryTemp.push(body[i].deathReasons.livingsDeadByHunger);
							livingsDeadByDeseaseHistoryTemp.push(body[i].deathReasons.livingsDeadByDesease);
							livingsDeadByDehydratationHistoryTemp.push(body[i].deathReasons.livingsDeadByDehydratation);
							livingsDeadByBladedWeaponHistoryTemp.push(body[i].deathReasons.livingsDeadByBladedWeapon);
							livingsDeadByTrapHistoryTemp.push(body[i].deathReasons.livingsDeadByTrap);
							livingsDeadFromOtherReasonHistoryTemp.push(body[i].deathReasons.livingsDeadFromOtherReason);
							zombiesDeadByGunHistoryTemp.push(body[i].deathReasons.zombiesDeadByGun);
							zombiesDeadByAccidentHistoryTemp.push(body[i].deathReasons.zombiesDeadByAccident);
							zombiesDeadByFireHistoryTemp.push(body[i].deathReasons.zombiesDeadByFire);
							zombiesDeadByHungerHistoryTemp.push(body[i].deathReasons.zombiesDeadByHunger);
							zombiesDeadByBladedWeaponHistoryTemp.push(body[i].deathReasons.zombiesDeadByBladedWeapon);
							zombiesDeadByTrapHistoryTemp.push(body[i].deathReasons.zombiesDeadByTrap);
							dayHistoryTemp.push(body[i].day);
							monthHistoryTemp.push(body[i].month);
							yearHistoryTemp.push(body[i].year);
						}
						totalZombiesHistory = totalZombiesHistoryTemp;
						totalLivingHistory = totalLivingHistoryTemp;
						weekNumberHistory = weekNumberHistoryTemp;
						numberOfLivingsKilledHistory = numberOfLivingsKilledHistoryTemp;
						numberOfZombiesKilledHistory = numberOfZombiesKilledHistoryTemp;
						DiedWithoutBeingZombifiedHistory = DiedWithoutBeingZombifiedHistoryTemp;
						livingsDeadByZombieBiteHistory = livingsDeadByZombieBiteHistoryTemp;
						livingsDeadByGunHistory = livingsDeadByGunHistoryTemp;
						livingsDeadByAccidentHistory = livingsDeadByAccidentHistoryTemp;
						livingsDeadByFireHistory = livingsDeadByFireHistoryTemp;
						livingsDeadByHungerHistory = livingsDeadByHungerHistoryTemp;
						livingsDeadByDeseaseHistory = livingsDeadByDeseaseHistoryTemp;
						livingsDeadByDehydratationHistory = livingsDeadByDehydratationHistoryTemp;
						livingsDeadByBladedWeaponHistory = livingsDeadByBladedWeaponHistoryTemp;
						livingsDeadByTrapHistory = livingsDeadByTrapHistoryTemp;
						livingsDeadFromOtherReasonHistory = livingsDeadFromOtherReasonHistoryTemp;
						zombiesDeadByGunHistory = zombiesDeadByGunHistoryTemp;
						zombiesDeadByAccidentHistory = zombiesDeadByAccidentHistoryTemp;
						zombiesDeadByFireHistory = zombiesDeadByFireHistoryTemp;
						zombiesDeadByHungerHistory = zombiesDeadByHungerHistoryTemp;
						zombiesDeadByBladedWeaponHistory = zombiesDeadByBladedWeaponHistoryTemp;
						zombiesDeadByTrapHistory = zombiesDeadByTrapHistoryTemp;
						dayHistory = dayHistoryTemp;
						monthHistory = monthHistoryTemp;
						yearHistory = yearHistoryTemp;
					});
				});
			});
		});
	} catch (err) {
		console.log(err);
	}
}

function resetHistoryVariables(){
	totalLivingHistory = Array();
	totalZombiesHistory = Array();
	weekNumberHistory = Array();
	numberOfLivingsKilledHistory = Array();
	numberOfZombiesKilledHistory = Array();
	DiedWithoutBeingZombifiedHistory = Array();
	livingsDeadByZombieBiteHistory = Array();
	livingsDeadByGunHistory = Array();
	livingsDeadByAccidentHistory = Array();
	livingsDeadByFireHistory = Array();
	livingsDeadByHungerHistory = Array();
	livingsDeadByDeseaseHistory = Array();
	livingsDeadByDehydratationHistory = Array();
	livingsDeadByBladedWeaponHistory = Array();
	livingsDeadByTrapHistory = Array();
	livingsDeadFromOtherReasonHistory = Array();
	zombiesDeadByGunHistory = Array();
	zombiesDeadByAccidentHistory = Array();
	zombiesDeadByFireHistory = Array();
	zombiesDeadByHungerHistory = Array();
	zombiesDeadByBladedWeaponHistory = Array();
	zombiesDeadByTrapHistory = Array();
	dayHistory = Array();
	monthHistory = Array();
	yearHistory = Array();
}

function getVariableLabel(variableName){
		toReturn = "DEFAULT VARIABLE LABEL";
		switch (variableName) {
			case "totalZombies":
				toReturn = "Nombre total de Zombies";
				break;
			case "totalLiving":
				toReturn = "Nombre total d'Humains";
				break;
			case "weekNumber":
				toReturn = "Numéro de semaine";
				break;
			case "numberOfLivingsKilled":
				toReturn = "Nombre d'Humains tués";
				break;
			case "numberOfZombiesKilled":
				toReturn = "Nombre de Zombies tués";
				break;
			case "DiedWithoutBeingZombified":
				toReturn = "Nombre d'Humains tués sans être Zombifiés";
				break;
			case "livingsDeadByGun":
				toReturn = "Nombre d'Humains tués par arme à feu";
				break;
			case "zombiesDeadByGun":
				toReturn = "Nombre de Zombies tués par arme à feu";
				break;
			case "livingsDeadByAccident":
				toReturn = "Nombre d'Humains tués par accident";
				break;
			case "zombiesDeadByAccident":
				toReturn = "Nombre de Zombies tués par accident";
				break;
			case "livingsDeadByFire":
				toReturn = "Nombre d'Humains tués par le feu";
				break;
			case "zombiesDeadByFire":
				toReturn = "Nombrede Zombies tués par le feu";
				break;
			case "livingsDeadByDesease":
				toReturn = "Nombre d'Humains tués par la maladie";
				break;
			case "livingsDeadByHunger":
				toReturn = "Nombre d'Humains tués par la famine";
				break;
			case "zombiesDeadByHunger":
				toReturn = "Nombre de Zombies tués par la famine";
				break;
			case "livingsDeadByDehydratation":
				toReturn = "Nombre d'Humains tués par la déshydratation";
				break;
			case "livingsDeadByBladedWeapon":
				toReturn = "Nombre d'Humains tués par arme blanche";
				break;
			case "zombiesDeadByBladedWeapon":
				toReturn = "Nombre de Zombies tués par arme blanche";
				break;
			case "livingsDeadByTrap":
				toReturn = "Nombre d'Humains tués par des pièges";
				break;
			case "zombiesDeadByTrap":
				toReturn = "Nombre de Zombies tués par des pièges";
				break;
			case "livingsDeadByZombieBite":
				toReturn = "Nombre d'Humains tués par morsure de Zombie";
				break;
			case "livingsDeadFromOtherReason":
				toReturn = "Nombre d'Humains tués pour d'autres raisons";
				break;
			case "day":
				toReturn = "Jour";
				break;
			case "month":
				toReturn = "Mois";
				break;
			case "year":
				toReturn = "Année";
				break;
			case "totalZombiesHistory":
				toReturn = "Historique du nombre total de Zombies";
				break;
			case "totalLivingHistory":
				toReturn = "Historique du nombre total d'Humains";
				break;
			case "weekNumberHistory":
				toReturn = "Historique du numéro de semaine";
				break;
			case "numberOfLivingsKilledHistory":
				toReturn = "Historique du nombre d'Humains tués";
				break;
			case "numberOfZombiesKilledHistory":
				toReturn = "Historique du nombre de Zombies tués";
				break;
			case "DiedWithoutBeingZombifiedHistory":
				toReturn = "Historique du nombre d'Humains tués sans être Zombifiés";
				break;
			case "livingsDeadByGunHistory":
				toReturn = "Historique du nombre d'Humains tués par arme à feu";
				break;
			case "zombiesDeadByGunHistory":
				toReturn = "Historique du nombre de Zombies tués par arme à feu";
				break;
			case "livingsDeadByAccidentHistory":
				toReturn = "Historique du nombre d'Humains tués par accident";
				break;
			case "zombiesDeadByAccidentHistory":
				toReturn = "Historique du nombre de Zombies tués par accident";
				break;
			case "livingsDeadByFireHistory":
				toReturn = "Historique du nombre d'Humains tués par le feu";
				break;
			case "zombiesDeadByFireHistory":
				toReturn = "Historique du nombrede Zombies tués par le feu";
				break;
			case "livingsDeadByDeseaseHistory":
				toReturn = "Historique du nombre d'Humains tués par la maladie";
				break;
			case "livingsDeadByHungerHistory":
				toReturn = "Historique du nombre d'Humains tués par la famine";
				break;
			case "zombiesDeadByHungerHistory":
				toReturn = "Historique du nombre de Zombies tués par la famine";
				break;
			case "livingsDeadByDehydratationHistory":
				toReturn = "Historique du nombre d'Humains tués par la déshydratation";
				break;
			case "livingsDeadByBladedWeaponHistory":
				toReturn = "Historique du nombre d'Humains tués par arme blanche";
				break;
			case "zombiesDeadByBladedWeaponHistory":
				toReturn = "Historique du nombre de Zombies tués par arme blanche";
				break;
			case "livingsDeadByTrapHistory":
				toReturn = "Historique du nombre d'Humains tués par des pièges";
				break;
			case "zombiesDeadByTrapHistory":
				toReturn = "Historique du nombre de Zombies tués par des pièges";
				break;
			case "livingsDeadByZombieBiteHistory":
				toReturn = "Historique du nombre d'Humains tués par morsure de Zombie";
				break;
			case "livingsDeadFromOtherReasonHistory":
				toReturn = "Historique du nombre d'Humains tués pour d'autres raisons";
				break;
			case "dayHistory":
				toReturn = "Historique des Jours";
				break;
			case "monthHistory":
				toReturn = "Historique des Mois";
				break;
			case "yearHistory":
				toReturn = "Historique des Années";
				break;
		}
		return {value: variableName, label : toReturn};
}

function getVariableValue(variableName){
	toReturn = 0;
	switch (variableName) {
		case "totalZombies":
			toReturn = totalZombies;
			break;
		case "totalLiving":
			toReturn = totalLiving;
			break;
		case "weekNumber":
			toReturn = weekNumber;
			break;
		case "numberOfLivingsKilled":
			toReturn = numberOfLivingsKilled;
			break;
		case "numberOfZombiesKilled":
			toReturn = numberOfZombiesKilled;
			break;
		case "DiedWithoutBeingZombified":
			toReturn = DiedWithoutBeingZombified;
			break;
		case "livingsDeadByGun":
			toReturn = livingsDeadByGun;
			break;
		case "zombiesDeadByGun":
			toReturn = zombiesDeadByGun;
			break;
		case "livingsDeadByAccident":
			toReturn = livingsDeadByAccident;
			break;
		case "zombiesDeadByAccident":
			toReturn = zombiesDeadByAccident;
			break;
		case "livingsDeadByFire":
			toReturn = livingsDeadByFire;
			break;
		case "zombiesDeadByFire":
			toReturn = zombiesDeadByFire;
			break;
		case "livingsDeadByDesease":
			toReturn = livingsDeadByDesease;
			break;
		case "livingsDeadByHunger":
			toReturn = livingsDeadByHunger;
			break;
		case "zombiesDeadByHunger":
			toReturn = zombiesDeadByHunger;
			break;
		case "livingsDeadByDehydratation":
			toReturn = livingsDeadByDehydratation;
			break;
		case "livingsDeadByBladedWeapon":
			toReturn = livingsDeadByBladedWeapon;
			break;
		case "zombiesDeadByBladedWeapon":
			toReturn = zombiesDeadByBladedWeapon;
			break;
		case "livingsDeadByTrap":
			toReturn = livingsDeadByTrap;
			break;
		case "zombiesDeadByTrap":
			toReturn = zombiesDeadByTrap;
			break;
		case "livingsDeadByZombieBite":
			toReturn = livingsDeadByZombieBite;
			break;
		case "livingsDeadFromOtherReason":
			toReturn = livingsDeadFromOtherReason;
			break;
		case "day":
			toReturn = day;
			break;
		case "month":
			toReturn = month;
			break;
		case "year":
			toReturn = year;
			break;
		case "totalZombiesHistory":
			toReturn = totalZombiesHistory;
			break;
		case "totalLivingHistory":
			toReturn = totalLivingHistory;
			break;
		case "weekNumberHistory":
			toReturn = weekNumberHistory;
			break;
		case "numberOfLivingsKilledHistory":
			toReturn = numberOfLivingsKilledHistory;
			break;
		case "numberOfZombiesKilledHistory":
			toReturn = numberOfZombiesKilledHistory;
			break;
		case "DiedWithoutBeingZombifiedHistory":
			toReturn = DiedWithoutBeingZombifiedHistory;
			break;
		case "livingsDeadByGunHistory":
			toReturn = livingsDeadByGunHistory;
			break;
		case "zombiesDeadByGunHistory":
			toReturn = zombiesDeadByGunHistory;
			break;
		case "livingsDeadByAccidentHistory":
			toReturn = livingsDeadByAccidentHistory;
			break;
		case "zombiesDeadByAccidentHistory":
			toReturn = zombiesDeadByAccidentHistory;
			break;
		case "livingsDeadByFireHistory":
			toReturn = livingsDeadByFireHistory;
			break;
		case "zombiesDeadByFireHistory":
			toReturn = zombiesDeadByFireHistory;
			break;
		case "livingsDeadByDeseaseHistory":
			toReturn = livingsDeadByDeseaseHistory;
			break;
		case "livingsDeadByHungerHistory":
			toReturn = livingsDeadByHungerHistory;
			break;
		case "zombiesDeadByHungerHistory":
			toReturn = zombiesDeadByHungerHistory;
			break;
		case "livingsDeadByDehydratationHistory":
			toReturn = livingsDeadByDehydratationHistory;
			break;
		case "livingsDeadByBladedWeaponHistory":
			toReturn = livingsDeadByBladedWeaponHistory;
			break;
		case "zombiesDeadByBladedWeaponHistory":
			toReturn = zombiesDeadByBladedWeaponHistory;
			break;
		case "livingsDeadByTrapHistory":
			toReturn = livingsDeadByTrapHistory;
			break;
		case "zombiesDeadByTrapHistory":
			toReturn = zombiesDeadByTrapHistory;
			break;
		case "livingsDeadByZombieBiteHistory":
			toReturn = livingsDeadByZombieBiteHistory;
			break;
		case "livingsDeadFromOtherReasonHistory":
			toReturn = livingsDeadFromOtherReasonHistory;
			break;
		case "dayHistory":
			toReturn = dayHistory;
			break;
		case "monthHistory":
			toReturn = monthHistory;
			break;
		case "yearHistory":
			toReturn = yearHistory;
			break;
		case "totalPopulation":
			toReturn = totalPopulation;
			break;
	}
	if (variableName == "totalLivingHistory"){
		console.log(toReturn);
	}
	return {name: variableName, value: toReturn};
}

Meteor.methods({
	start: function(){
		try {
			http.get(baseURL + "start", res => {});
		} catch (err) {
			console.log(err);
		}
		return "Start called";
	},
	stop: function(){
		try {
			http.get(baseURL + "stop", res => {});
		} catch (err) {
			console.log(err);
		}
		return "Stop called";
	},
	reset: function(){
		try {
			http.get(baseURL + "reset", res => {});
		} catch (err) {
			console.log(err);
		}
		return "reset called";
	},
	getServerVariableValue: function(variableName){
		return getVariableValue(variableName);
	},
	 getServerVariableLabel: function(variableName){
		 return getVariableLabel(variableName);
	 },
	resetForPopulation: function(populationNumber){
		try {
			http.get(baseURL + "resetForPopulation/" + populationNumber, res => {});
		} catch (err) {
			console.log(err);
		}
		return "Reset for Population Called : " + populationNumber;
	}
});