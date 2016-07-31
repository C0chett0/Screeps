var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep, map) {
        if(creep.memory.mySpot == undefined) {
            var flag = false;
            var i = 0;
            while(!flag && i < map.miningSpots.length) {
                var spot = map.miningSpots[i];
                if (!spot.reserved)
                {
                    spot.reserved = true;
                    flag = true;
                }
                i++;
            }
        }
        if (creep.pos.x != spot.x || creep.pos.y != spot.y) {
            creep.memory.mySpot = [spot.x, spot.y] = undefined;
            creep.moveTo(spot.x, spot.y);
        } else {
            creep.memory.mySpot = [spot.x, spot.y]
            creep.harvest(creep.pos.findClosestByPath(FIND_SOURCES));
        }
    }
};

module.exports = roleMiner;