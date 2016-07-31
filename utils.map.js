var mapUitls = {
    sources: [],
    miningSpots: [],

    init: function (room) {
        var sources = room.find(FIND_SOURCES);
        sources.forEach((source) => {
            this.sources.push({
                id: source.id,
            });
            var tiles = room.lookForAtArea(LOOK_TERRAIN, source.pos.y-1, source.pos.x-1,source.pos.y+1, source.pos.x+1, true);
            tiles.forEach((tile) => {
                if (tile.terrain != 'wall') {
                    this.miningSpots.push({
                        x: tile.x,
                        y: tile.y,
                        reserved: false
                    });
                }
            });

        });

    }
};

module.exports = mapUitls;