var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep, map) {
        if(creep.memory.mySpot == undefined) {
            for (let spot in map.miningSpots) {
                if (!spot.reserved || Game.creeps[spot.reserved] == undefined)
                {
                    creep.memory.mySpot = [spot.x, spot.y];
                    spot.reserved = creep.name;
                }
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