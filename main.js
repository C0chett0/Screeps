var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');
var Spawn1 = 'Maizon';

module.exports.loop = function () {


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
    //console.log('Harvesters: ' + harvesters.length);


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
    if (reapirers.length < 2 && Game.spawns[Spawn1].energy >= 300) {
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
    }
}