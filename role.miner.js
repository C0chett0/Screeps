var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep, map) {
        if(creep.memory.mySpot == undefined) {
            var flag = false;
            var i = 0;
            while(!flag && i < map.miningSpots.length) {
                var spot = map.miningSpots[i];
                if (!spot.reserved || Game.creeps[spot.reserved] == undefined)
                {
                    creep.memory.mySpot = [spot.x, spot.y];
                    spot.reserved = creep.name;
                    flag = true;
                }
                i++;
            }
        }
        if (creep.pos.x != creep.memory.mySpot[0] || creep.pos.y != creep.memory.mySpot[1]) {
            creep.moveTo(creep.memory.mySpot[0], creep.memory.mySpot[1]);
        } else {
            creep.harvest(creep.pos.findClosestByPath(FIND_SOURCES));
        }
    }
};

module.exports = roleMiner;