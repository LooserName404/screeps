import harvester from './harvester'

export default {
    run(creep: Creep) {
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.working = false
        } else if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
            creep.memory.working = true
        }

        if (creep.memory.working === true) {
            const constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES)
            if (constructionSite) {
                if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite)
                }
            } else {
                harvester.run(creep)
            }
        } else {
            const source = creep.pos.findClosestByPath(FIND_SOURCES)
            if (source != null && creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source)
            }
        }
    }
}
