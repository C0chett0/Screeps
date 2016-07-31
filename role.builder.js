var roleHarvester = require('role.harvester');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('building');
        }

        if(creep.memory.building) {
            target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {filter: (c) => c.structureType == STRUCTURE_EXTENSION});
            if (target != undefined) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                } else {
                    console.log(creep.name + " building " + target.structureType);
                }
            } else {
                roleHarvester.run(creep);
            }
        }
        else {
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

module.exports = roleBuilder;