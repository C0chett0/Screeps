var map = {
    sources: [],
    miningSpots: [],

    init: function (room) {
        var sources = room.find(FIND_SOURCES);
        for (let source in sources) {
            this.sources.push({
                id: source.id,
                dist: room.findPath(source.pos, room.storage).length
            });
            var tiles = room.lookForAtArea(LOOK_TERRAIN, source.pos.y-1, source.pos.x-1,source.pos.y+1, source.pos.x+1, true);
            for (let tile in tiles) {
                if (tile.terrain != 'wall') {
                    this.miningSpots.push({
                        x: tile.x,
                        y: tile.y,
                        reserved: false
                    });
                }
            }
        }

    }
};

module.exports = map;