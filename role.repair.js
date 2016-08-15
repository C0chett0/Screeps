var roleHarvester = require('role.harvester');

var roleRepair = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var minLifeRamparts = 35000;

        if (creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('harvesting');
        }
        if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.destination = undefined;
            creep.memory.repairing = true;
            creep.say('repairing');
        }

        if (creep.memory.repairing) {
            target = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
                filter: (creep) => {
                    return (creep.hits < creep.hitsMax);
                }
            });
            if (target != undefined) {
                if (creep.heal(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                } else {
                    console.log(creep.name + " healing " + target.name);
                }
            } else {
                var damagedStructures = creep.room.find(FIND_STRUCTURES, {filter: (s) => (s.hits < s.hitsMax && s.structureType != STRUCTURE_RAMPART)});
                var closestDamagedStructure;
                if(damagedStructures.length > 0) {
                    closestDamagedStructure = damagedStructures[0];
                } else {
                    var damagedWalls = creep.room.find(FIND_STRUCTURES, {filter: (s) => (s.hits < minLifeRamparts) && s.structureType == STRUCTURE_RAMPART});
                    if (damagedWalls) {
                        closestDamagedStructure = damagedWalls[0];
                        for (let wall of damagedWalls) {
                            if (wall.hits < closestDamagedStructure.hits) {
                                closestDamagedStructure = wall;
                            }
                        }
                    }
                }
                if (closestDamagedStructure != undefined) {
                    if(creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestDamagedStructure);
                    }
                }
            }
        } else {
            var target;
            if (creep.memory.destination != undefined) {
                target = Game.getObjectById(creep.memory.destination);
            }
            if (target == undefined) {
                var targets = creep.room.find(FIND_DROPPED_ENERGY);
                var opti = {'id': undefined, 'qty': undefined};
                for(var i = targets.length - 1; i>=0; i--) {
                    if(opti.id == undefined || opti.qty < targets[i].amount) {
                        opti.id = targets[i].id;
                        opti.qty = targets[i].energy;
                    }
                }
                if(opti.id != undefined) {
                    target = Game.getObjectById(opti.id);
                    creep.memory.destination = opti.id;
                }
            }
            if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
};

module.exports = roleRepair;