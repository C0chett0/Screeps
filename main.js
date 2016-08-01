var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');
var roleMiner = require('role.miner');
var roleDefender = require('role.defender');
var utilMaps = require('utils.map');
var towerUtils = require('utils.tower');

var Spawn1 = 'Maizon';

module.exports.loop = function () {

    var room = Game.rooms['W48S4'];
    if(utilMaps.initialized != true) {
        utilMaps.init(room);
    }
    var maxCreeps = {
        harvesters: 7,
        miners: utilMaps.miningSpots.length,
        upgraders: 5,
        builders: 5,
        repairers: 2,
        defenders: 10
    };

    var towers = room.find(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER && s.energy > 10});
    for(var tower in towers) {
        towerUtils.run(tower, room);
    }

    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            console.log('Clearing non-existing creep memory:', name, '(' + Memory.creeps[name].role.trim() + ')');
            delete Memory.creeps[name];
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
    console.log(
        'harvesters :',harvesters.length+'/'+maxCreeps.harvesters,
        'upgraders :',upgraders.length+'/'+maxCreeps.upgraders,
        'miners :',miners.length+'/'+maxCreeps.miners,
        'repairers :',repairers.length+'/'+maxCreeps.repairers,
        'builders :',builders.length+'/'+maxCreeps.builders,
        'defenders :',defenders.length+'/'+maxCreeps.defenders
    )

    var extensions = room.find(FIND_MY_STRUCTURES, {filter: (i) => i.structureType == STRUCTURE_EXTENSION /*&& i.energy > 0*/});
    var availableEnergy = Game.spawns[Spawn1].energy;
    for (var i = extensions.length - 1; i >= 0; i--) {
        //console.log("Extension a " + extensions[i].energy);
        availableEnergy += extensions[i].energy;
    }

//console.log('availableEnergy: ' + availableEnergy);
    if (availableEnergy >= 350) {

        if (harvesters.length < maxCreeps.harvesters) {
            var newName = Game.spawns[Spawn1].createCreep([CARRY, MOVE, WORK, MOVE, CARRY, MOVE], undefined, {role: 'harvester'});
            console.log('Spawning new harvester: ' + newName);
        }
        else if (miners.length < maxCreeps.miners) {
            var newName = Game.spawns[Spawn1].createCreep([WORK, WORK, WORK, MOVE], undefined, {role: 'miner'});
            console.log('Spawning new miner: ' + newName);
        }

        else if (upgraders.length < maxCreeps.upgraders) {
            var newName = Game.spawns[Spawn1].createCreep([WORK, CARRY, CARRY, MOVE, MOVE, MOVE], undefined, {role: 'upgrader'});
            console.log('Spawning new upgrader: ' + newName);
        }

        else if (builders.length < maxCreeps.builders) {
            var newName = Game.spawns[Spawn1].createCreep([WORK, CARRY, CARRY, MOVE, MOVE, MOVE], undefined, {role: 'builder'});
            console.log('Spawning new builder: ' + newName);
        }
        else if (repairers.length < maxCreeps.repairers) {
            var newName = Game.spawns[Spawn1].createCreep([WORK, CARRY, CARRY, MOVE, MOVE, MOVE], undefined, {role: 'repair'});
            console.log('Spawning new repair: ' + newName);
        }
        else if (defenders.length < maxCreeps.defenders) {
            var newName = Game.spawns[Spawn1].createCreep([MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK], undefined, {role: 'defender'});
            console.log('Spawning new defender: ' + newName);
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
        if (creep.memory.role == 'defender') {
            roleDefender.run(creep);
        }
    }
}