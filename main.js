var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');
var roleMiner = require('role.miner');
var utilMaps = require('utils.map');

var Spawn1 = 'Maizon';

module.exports.loop = function () {

    utilMaps.init(Game.rooms['W48S4']);

    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            console.log('Clearing non-existing creep memory: ', name, ' (', Memory.creeps[name].role.trim(),')');
            delete Memory.creeps[name];
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    //console.log('Harvesters: ' + harvesters.length);
    if (Game.spawns[Spawn1].energy >= 300) {

        if (harvesters.length < 8) {
            var newName = Game.spawns[Spawn1].createCreep([CARRY, MOVE, WORK, MOVE], undefined, {role: 'harvester'});
            console.log('Spawning new harvester: ' + newName);
        }
        else if (miners.length < 4) {
            var newName = Game.spawns[Spawn1].createCreep([WORK, WORK, MOVE], undefined, {role: 'miner'});
            console.log('Spawning new miner: ' + newName);
        }

        else if (upgraders.length < 5) {
            var newName = Game.spawns[Spawn1].createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'upgrader'});
            console.log('Spawning new upgrader: ' + newName);
        }

        else if (builders.length < 10) {
            var newName = Game.spawns[Spawn1].createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'builder'});
            console.log('Spawning new builder: ' + newName);
        }
        else if (repairers.length < 2) {
            var newName = Game.spawns[Spawn1].createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'repair'});
            console.log('Spawning new repair: ' + newName);
        }
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