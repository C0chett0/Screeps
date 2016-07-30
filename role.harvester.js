var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            if (target = creep.pos.findInRange(FIND_SOURCES,1)) {
                creep.harvest(target);
                creep.memory.sourceDestination = undefined;
            } else {
                if(creep.memory.sourceDestination) {
                    creep.moveTo(creep.memory.sourceDestination);
                } else {
                    var sources = creep.room.find(FIND_SOURCES);
                    if (sources.length > 0) {
                        var seed = _.floor(_.random() * (sources.length - 1));

                        console.log("seed : " + seed);
                        creep.memory.sourceDestination = sources[seed];
                        creep.moveTo(creep.memory.sourceDestination);
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