var towerUitls = {
    run: function (tower, room) {
        var badGuys = room.find(FIND_HOSTILE_CREEPS);
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
                var damagedStructures = room.find(FIND_MY_STRUCTURES, {filter: (s) => s.hits < s.hitsMax});
                var closestDamagedStructure;
                if(damagedStructures.length > 0) {
                    closestDamagedStructure = damagedStructures[0];
                }
                if (closestDamagedStructure != undefined) {
                    tower.repair(closestDamagedStructure);
                }
            }
        }
    }
};

module.exports = towerUitls;