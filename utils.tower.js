var towerUitls = {
    run: function (tower, room) {
        var badGuys = room.find(FIND_HOSTILE_CREEPS);
        var minLifeRamparts = 35000;
        var closestBadGuy;
        if(badGuys.length > 0) {
            closestBadGuy = badGuys[0];
        }
        if (closestBadGuy != undefined) {
            tower.attack(closestBadGuy);
        } else {
            var goodGuys = room.find(FIND_MY_CREEPS, {filter: (c) => c.hits < c.hitsMax});
            var closestGoodGuy;
            if(goodGuys.length > 0) {
                closestGoodGuy = goodGuys[0];
            }
            if (closestGoodGuy != undefined) {
                tower.heal(closestGoodGuy);
            } else {
                var damagedStructures = room.find(FIND_STRUCTURES, {filter: (s) => (s.hits < s.hitsMax && s.structureType != STRUCTURE_RAMPART)});
                var closestDamagedStructure;
                if(damagedStructures.length > 0) {
                    closestDamagedStructure = damagedStructures[0];
                } else {
                    var damagedWalls = room.find(FIND_STRUCTURES, {filter: (s) => (s.hits < minLifeRamparts) && s.structureType == STRUCTURE_RAMPART});
                    if (damagedWalls) {
                        closestDamagedStructure = damagedWalls[0];
                        for (let wall of damagedWalls) {
                            if (wall.hits < closestDamagedStructure.hits) {
                                closestDamagedStructure = wall;
                            }
                        }
                    }
                }
                if (closestDamagedStructure != undefined) {
                    tower.repair(closestDamagedStructure);
                }
            }
        }
    }
};

module.exports = towerUitls;