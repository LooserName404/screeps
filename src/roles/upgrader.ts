export default {
    run(creep: Creep) {
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.working = false
        } else if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
            creep.memory.working = true
        }

        if (creep.memory.working === true) {
            if (creep.room.controller && creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller)
            }
        } else {
            let source = creep.pos.findClosestByPath(FIND_SOURCES)
            if (source != null && creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source)
            }
        }
    }
}
