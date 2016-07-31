var roleHarvester = require('role.harvester');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.destination = undefined;
            creep.memory.building = true;
            creep.say('building');
        }

        if(creep.memory.building) {
            target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {filter: (c) => c.structureType == STRUCTURE_ROAD});
            if (target != undefined) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                roleHarvester.run(creep);
            }
        }
        else {
            var target;
            if (creep.memory.destination != undefined) {
                target = Game.getObjectById(creep.memory.destination);
            } else {
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

module.exports = roleBuilder;