var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep, map) {
        if(creep.harvest(creep.pos.findClosestByPath(FIND_SOURCES)) < 0) {
            if (creep.memory.mySpot == undefined) {
                var flag = false;
                var i = 0;
                while (!flag && i < map.miningSpots.length) {
                    var spot = map.miningSpots[i];
                    var creep = room.lookForAt(LOOK_CREEPS,spot.x,spot.y);
                    if (!spot.reserved && !((creep.length > 0 && creep[0].memory.role == 'miner'))) {
                        spot.reserved = true;
                        flag = true;
                    }
                    i++;
                }
            } else {
                spot = {x: creep.memory.mySpot[0], y: creep.memory.mySpot[1]};
            }
            if (creep.pos.x != spot.x || creep.pos.y != spot.y) {
                creep.memory.mySpot = undefined;
                creep.moveTo(spot.x, spot.y);
            } else {
                creep.memory.mySpot = [spot.x, spot.y];
                creep.harvest(creep.pos.findClosestByPath(FIND_SOURCES));
            }
        } else {
            creep.memory.mySpot = [creep.pos.x, creep.pos.y];
        }
    }
};

module.exports = roleMiner;