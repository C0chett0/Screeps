var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
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
                        var seed = _.floor(_.random() * (3)) + min;
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
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                        }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
};

module.exports = roleHarvester;