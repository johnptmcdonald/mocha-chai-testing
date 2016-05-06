var expect = require('chai').expect

describe('checkForShip', function(){
	var checkForShip = require('../game_logic/ship_methods').checkForShip;
	var player;
	before(function(){
		player = {
			ships: [
				{
					locations: [[0,0], [0,1], [0,2]]
				},
				{
					locations: [[2,2], [3,2], [4,2]]
				}
			]
		}	
	})

	it('should correctly report no ship at a given player\'s co-ordinate', function(){
		expect(checkForShip(player, [9,9])).to.be.false
	})

	it('should correctly report a ship at a given player\'s co-ordinate', function(){
		expect(checkForShip(player, [0,1])).to.deep.equal(player.ships[0])
	})
	it('should handle multiple ships', function(){
		expect(checkForShip(player, [3,2])).to.deep.equal(player.ships[1])
	})

})

describe('damageShip', function(){
	var damageShip = require('../game_logic/ship_methods').damageShip;
	var ship;
	beforeEach(function(){
		ship = {
			locations: [[0,0], [0,1], [0,2]],
			damage: []
		}
	})

	it('should register damage on a given ship at a given location', function(){
		damageShip(ship, [0,0]);
		expect(ship.damage).to.not.be.empty
	})

	it('should register damaged area on a given ship at a given location', function(){

		damageShip(ship, [0,1]);
		expect(ship.damage[0]).to.deep.equal([0,1])
		expect(ship.damage).to.not.deep.equal([0,0])
	})
})


describe('fire', function(){
	var fire = require('../game_logic/ship_methods').fire
	var player;
	beforeEach(function(){
		player = {
			ships: [
				{
					locations: [[0,0], [0,1], [0,2]],
					damage: []
				},
				{
					locations: [[2,2], [3,2], [4,2]],
					damage: []
				}
			]
		}
	})
	after(function(){
		console.log("test suite finished")
	})
	afterEach(function(){
		console.log("1 unit test completed")
	})

	it('should damage a ship if given correct coordinates', function(){
		var coordinates = [2,2]
		fire(player, coordinates)
		expect(player.ships[1].damage[0]).to.deep.equal([2,2])
		expect(player.ships[0].damage).to.be.empty
	})

	it('shouldn\'t damage a ship twice if given correct coordinates a second time', function(){

		var coordinates = [2,2]
		fire(player, coordinates)
		fire(player, coordinates)
		fire(player, coordinates)
		expect(player.ships[1].damage).to.have.length(1)
	})
	it('should damage a ship completely if given correct coordinates all times', function(){

		fire(player, [2,2])
		fire(player, [3,2])
		fire(player, [4,2])
		expect(player.ships[1].damage).to.have.length(3)
	})
})


describe('shouldSink', function(){
	var player;
	beforeEach(function(){
		player = {
			ships: [
				{
					locations: [[0,0], [0,1], [0,2]],
					damage: [],
					sunk: false
				},
				{
					locations: [[2,2], [3,2], [4,2]],
					damage: [],
					sunk: false
				}
			]
		}
	})
	it('should not sink a ship when the ship is not completely damaged', function(){
		var shouldSink = require('../game_logic/ship_methods').shouldSink

		var ship = player.ships[1]
		expect(shouldSink(ship)).to.be.false

	})

	it('should sink a ship when the ship is completely damaged', function(){
		var shouldSink = require('../game_logic/ship_methods').shouldSink


		var ship = {
			locations: [[0,0], [0,1], [0,2]],
			damage: [[0,0], [0,1], [0,2]],
			sunk: false
		}

		expect(shouldSink(ship)).to.be.true

		
		
	})

}) 



