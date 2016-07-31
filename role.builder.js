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
            target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, (c) => c.structureType == STRUCTURE_EXTENSION);
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
            var target = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
            if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
};

module.exports = roleBuilder;