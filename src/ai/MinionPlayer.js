const PlayerTracker = require('../server/PlayerTracker');

class MinionPlayer extends PlayerTracker {
    constructor(server, socket, owner) {
        super(server, socket);
        this.owner = owner;
        this.isMi = true;
        this.socket.isConnected = true;
    }
    remove() {
        this.socket.close();
        this.isRemoved = true;
        while (this.cells.length)
            this.server.removeNode(this.cells[0]);
    }
    checkConnection() {
        if (this.socket.isCloseRequest ||
            !this.owner.socket.isConnected ||
            !this.owner.hasMinions) return this.remove();

        if (!this.cells.length)
            this.server.mode.onPlayerSpawn(this.server, this);

        this.frozen = this.owner.minionFrozen;
        this.socket.packetHandler.pressSpace = this.owner.minionSplit;
        this.socket.packetHandler.pressW = this.owner.minionEject;

        this.mouse = this.owner.mouse.clone();
    }
}

module.exports = MinionPlayer;
