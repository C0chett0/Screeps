var towerUitls = {
    run: function (tower, room) {
        var closestBadGuy = room.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestBadGuy != undefined) {
            tower.attack(closestBadGuy);
        } else {
            var closestGoodGuy = tower.pos.findClosestByRange(FIND_MY_CREEPS, {filter: (c) => c.hits < c.hitsMax});
            if (closestGoodGuy != undefined) {
                tower.heal(closestGoodGuy);
            } else {
                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_MY_STRUCTURES, {filter: (s) => s.hits < s.hitsMax});
                if (closestDamagedStructure != undefined) {
                    tower.repair(closestDamagedStructure);
                }
            }
        }
    }
};

module.exports = towerUitls;