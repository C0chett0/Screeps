var roleHarvester = require('role.harvester');

var roleRepair = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('harvesting');
        }
        if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
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
                target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.hits < structure.hitsMax);
                    }
                });
                if (target != undefined) {
                    if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    } else {
                        console.log(creep.name + " repairing " + target.name);
                    }
                } else {
                    roleHarvester.run(creep);
                }
            }
        } else {
            var target = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
            if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
};

module.exports = roleRepair;