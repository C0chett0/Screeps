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
            targets = creep.pos.findInRange(FIND_SOURCES, 1)
            if (targets.length > 0) {
                creep.harvest(targets[0]);
                creep.memory.sourceDestination = undefined;
            } else {
                if (creep.memory.sourceDestination != undefined) {
                    creep.moveTo(Game.getObjectById(creep.memory.sourceDestination));
                } else {
                    var sources = creep.room.find(FIND_SOURCES);
                    if (sources.length > 0) {
                        var seed = _.floor(_.random() * (3)) + 1;
                        if (seed > 1) {
                            idTab = 0
                        } else {
                            idTab = 1
                        }

                        creep.memory.sourceDestination = sources[idTab].id;
                        creep.moveTo(sources[seed]);
                    }
                }
            }
        }
    }
};

module.exports = roleRepair;