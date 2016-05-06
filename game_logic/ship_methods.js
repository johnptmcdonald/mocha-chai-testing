function checkForShip(player, coordinates){
	var ships = player.ships

	for(var i = 0; i < ships.length; i++){
		var isHit = ships[i].locations.filter(function(shipLocation){
			return shipLocation.toString() === coordinates.toString()
		})[0]
		if(isHit){
			return ships[i]
		}
	}
	return false
	
}


function damageShip(ship, coordinates){
	ship.damage.push(coordinates)
}

function fire(player, coordinates){
	// if the ship is hit...
	if(checkForShip(player, coordinates)){
		// find the ship:
		var ship = checkForShip(player, coordinates)

		// check to see if it has already been damaged there:
		var alreadyDamaged;
		for(var i = 0; i < ship.damage.length; i++){
			if(ship.damage[i].toString() === coordinates.toString()){
				alreadyDamaged = true
			} else {
				alreadyDamaged = false
			}
		}
		if(!alreadyDamaged){
			damageShip(ship, coordinates)
		}
	}

}

function shouldSink(ship){
	return ship.damage.length === ship.locations.length

}


module.exports = {
	checkForShip: checkForShip,
	damageShip: damageShip,
	fire: fire,
	shouldSink: shouldSink
}