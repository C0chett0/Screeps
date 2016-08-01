var roleHarvester = require('role.harvester');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('building');
        }

        if (creep.memory.building) {
            creep.memory.destination = undefined;
            target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (target != undefined) {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                var tower = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity});
                if (tower != undefined) {
                    if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(tower);
                    }
                } else {
                    roleHarvester.run(creep);
                }
            }
        }
        else {
            var target;
            if (creep.memory.destination != undefined) {
                target = Game.getObjectById(creep.memory.destination);
            }
            if (target == undefined) {
                var closestContainer = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0});
                if (closestContainer != undefined) {
                    target = closestContainer;
                    creep.memory.destination = closestContainer.id;
                } else {
                    var closestDropped = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
                    if (closestDropped != undefined) {
                        target = closestDropped;
                        //creep.memory.destination = closestDropped.id;
                    } else {
                        var targets = creep.room.find(FIND_DROPPED_ENERGY);
                        var opti = {'id': undefined, 'qty': undefined};
                        for (var i = targets.length - 1; i >= 0; i--) {
                            if (opti.id == undefined || opti.qty < targets[i].amount) {
                                opti.id = targets[i].id;
                                opti.qty = targets[i].energy;
                            }
                        }
                        if (opti.id != undefined) {
                            target = Game.getObjectById(opti.id);
                            creep.memory.destination = opti.id;
                        }
                    }
                }

            }
            if (creep.pickup(target) == ERR_NOT_IN_RANGE || creep.withdraw(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
};

module.exports = roleBuilder;