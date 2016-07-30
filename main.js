var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
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
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');
    //console.log('Harvesters: ' + harvesters.length);

    /*if(repairers.length < 1 && Game.spawns[Spawn1].energy >= 300) {
        var newName = Game.spawns[Spawn1].createCreep([WORK,CARRY,MOVE], undefined, {role: 'repair'});
        console.log('Spawning new harvester: ' + newName);
    }*/

    if(harvesters.length < 2 && Game.spawns[Spawn1].energy >= 250) {
        var newName = Game.spawns[Spawn1].createCreep([WORK,MOVE,CARRY,MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    }
    if(upgraders.length < 1 && Game.spawns[Spawn1].energy >= 300) {
        var newName = Game.spawns[Spawn1].createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}