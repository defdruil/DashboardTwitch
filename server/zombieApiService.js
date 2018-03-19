const http = require("http");
const baseURL = "http://localhost:8080/"

var interval;

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

interval = setInterval(getCurrentValues, 100);

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
		});
	});
	} catch (err) {
		console.log(err);
	}
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
	getServerVariable: function(variableName){
		toReturn = 0;
		switch (new Date().getDay()) {
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
		}
		return toReturn;
	}
});