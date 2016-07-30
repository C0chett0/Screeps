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
            if (target = creep.pos.findInRange(FIND_SOURCES, 1)) {
                creep.harvest(target);
                creep.memory.sourceDestination = undefined;
            } else {
                if (creep.memory.sourceDestination) {
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
    }
}
;

module.exports = roleUpgrader;