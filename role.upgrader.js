var roleUpgrader = {

        /** @param {Creep} creep **/
        run: function (creep) {

            if (creep.memory.upgrading && creep.carry.energy == 0) {
                creep.memory.upgrading = false;
                creep.say('harvesting');
            }
            if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
                creep.memory.destination = undefined;
                creep.memory.upgrading = true;
                creep.say('upgrading');
            }

            if (creep.memory.upgrading) {
                creep.memory.destination = undefined;
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
            else {
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
                    } else {
                        target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                    }
                }
                if (creep.pickup(target) == ERR_NOT_IN_RANGE || creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    }
    ;

module.exports = roleUpgrader;