import builder from './builder'
import harvester from './harvester'

export default {
    run(creep: Creep) {
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.working = false
        } else if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
            creep.memory.working = true
        }

        if (creep.memory.working === true) {
            const damagedStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: structure => structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_WALL
            })

            if (damagedStructure) {
                if (creep.repair(damagedStructure) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(damagedStructure)
                }
            } else {
                builder.run(creep)
            }
        } else {
            const source = creep.pos.findClosestByPath(FIND_SOURCES)
            if (source != null && creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source)
            }
        }
    }
}
