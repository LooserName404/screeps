import upgrader from "./upgrader"

export default {
    run(creep: Creep) {
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.working = false
        } else if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
            creep.memory.working = true
        }

        if (creep.memory.working === true) {
            const structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: structure =>
                    (structure.structureType === STRUCTURE_SPAWN ||
                    structure.structureType === STRUCTURE_EXTENSION ||
                    structure.structureType === STRUCTURE_TOWER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            })
            if (structure && creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(structure)
            }
            if (!structure) {
                upgrader.run(creep)
            }
        } else {
            let source = creep.pos.findClosestByPath(FIND_SOURCES, {
                filter: src => src.energy > 0
            })
            if (source != null && creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source)
            }
        }
    }
}
