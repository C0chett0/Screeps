var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
        }
        if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrading');
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
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
}
;

module.exports = roleUpgrader;