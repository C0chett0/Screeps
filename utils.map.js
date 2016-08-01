var mapUitls = {
    sources: [],
    miningSpots: [],
    initialized: false,

    init: function (room) {
        var sources = room.find(FIND_SOURCES);
        sources.forEach((source) => {
            this.sources.push({
                id: source.id,
            });
            var tiles = room.lookForAtArea(LOOK_TERRAIN, source.pos.y-1, source.pos.x-1,source.pos.y+1, source.pos.x+1, true);
            tiles.forEach((tile) => {
                if (tile.terrain != 'wall') {
                    var creep = room.lookForAt(LOOK_CREEPS,tile.x,tile.y);
                    var reserved = (creep.length > 0 && creep[0].memory.role == 'miner');
                    this.miningSpots.push({
                        x: tile.x,
                        y: tile.y,
                        reserved: reserved
                    });
                }
            });

        });
        this.initialized = true;
    }
};

module.exports = mapUitls;