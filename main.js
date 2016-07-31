var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');
var roleMiner = require('role.miner');
var utilMaps = require('utils.map');

var Spawn1 = 'Maizon';

module.exports.loop = function () {
    console.log(typeof Game.rooms['W47S28']);

    utilMaps.init(Game.rooms['W47S28']);

    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var reapirers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    //console.log('Harvesters: ' + harvesters.length);

    if (miners.length < utilMaps.miningSpots && Game.spawns[Spawn1].energy >= 250) {
        var newName = Game.spawns[Spawn1].createCreep([WORK, WORK, MOVE], undefined, {role: 'miner'});
        console.log('Spawning new miner: ' + newName);
    }

    if (harvesters.length < 5 && Game.spawns[Spawn1].energy >= 300) {
        var newName = Game.spawns[Spawn1].createCreep([WORK, WORK, CARRY, MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    }
    if (upgraders.length < 5 && Game.spawns[Spawn1].energy >= 300) {
        var newName = Game.spawns[Spawn1].createCreep([WORK, WORK, CARRY, MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    }

    if (builders.length < 2 && Game.spawns[Spawn1].energy >= 300) {
        var newName = Game.spawns[Spawn1].createCreep([WORK, CARRY, MOVE], undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
    }
    if (reapirers.length < 1 && Game.spawns[Spawn1].energy >= 300) {
        var newName = Game.spawns[Spawn1].createCreep([WORK, CARRY, MOVE], undefined, {role: 'repair'});
        console.log('Spawning new repair: ' + newName);
    }
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'repair') {
            roleRepair.run(creep);
        }
        if (creep.memory.role == 'miner') {
            roleMiner.run(creep, utilMaps);
        }
    }
}