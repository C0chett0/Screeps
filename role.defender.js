var roleDefender = {
    run: function (creep) {
        var closeBadGuys = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
        if (closeBadGuys.length > 0) {
            creep.rangedAttack(closeBadGuys[0]);
        } else {
            var badGuy = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
            if (badGuy != undefined) {
                if (creep.rangedAttack(badGuy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(badGuy);
                }
            } else {
                creep.moveTo(34,20);
            }
        }
    }
};

module.exports = roleDefender;