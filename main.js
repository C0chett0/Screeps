var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var Spawn1 = 'Maizon';

module.exports.loop = function () {


    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    //console.log('Harvesters: ' + harvesters.length);


    if(harvesters.length < 8 && Game.spawns[Spawn1].energy >= 250) {
        var newName = Game.spawns[Spawn1].createCreep([WORK,MOVE,CARRY,MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    }
    if(upgraders.length < 8 && Game.spawns[Spawn1].energy >= 300) {
        var newName = Game.spawns[Spawn1].createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    }

    if(builders.length < 1 && Game.spawns[Spawn1].energy >= 300) {
     var newName = Game.spawns[Spawn1].createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
     console.log('Spawning new harvester: ' + newName);
     }
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}