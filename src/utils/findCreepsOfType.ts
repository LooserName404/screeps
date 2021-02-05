export default (type: string): number =>
    _.filter(Game.creeps, (creep: Creep) =>
        creep.memory.role === type).length
