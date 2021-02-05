import builder from "roles/builder"
import harvester from "roles/harvester"
import repairer from "roles/repairer"
import upgrader from "roles/upgrader"
import { ErrorMapper } from "utils/ErrorMapper"
import findCreepsOfType from "utils/findCreepsOfType"

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    for (let name in Game.creeps) {
        let creep = Game.creeps[name]

        if (creep.memory.role === 'harvester') {
            harvester.run(creep)
        }
        if (creep.memory.role === 'upgrader') {
            upgrader.run(creep)
        }
        if (creep.memory.role === 'builder') {
            builder.run(creep)
        }
        if (creep.memory.role === 'repairer') {
            repairer.run(creep)
        }
    }

    const defaultBody = [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE]

    const minimumRepairers = 3
    const minimumBuilders = 5
    const minimumUpgraders = 5
    const minimumHarvesters = 5

    const repairersCount = findCreepsOfType('repairer')
    const buildersCount = findCreepsOfType('builder')
    const upgradersCount = findCreepsOfType('upgrader')
    const harvestersCount = findCreepsOfType('harvester')

    console.log('Repairers', repairersCount, '/', minimumRepairers)
    console.log('Builders', buildersCount, '/', minimumBuilders)
    console.log('Upgraders', upgradersCount, '/', minimumUpgraders)
    console.log('Harvesters', harvestersCount, '/', minimumHarvesters)

    if (repairersCount < minimumRepairers) {
        Game.spawns.Spawn1.spawnCreep(defaultBody, `RP${Game.time}`, { memory: { role: 'repairer', working: false, room: Game.spawns.Spawn1.room.name }})
    } else if (buildersCount < minimumBuilders) {
        Game.spawns.Spawn1.spawnCreep(defaultBody, `BD${Game.time}`, { memory: { role: 'builder', working: false, room: Game.spawns.Spawn1.room.name }})
    } else if (upgradersCount < minimumUpgraders) {
        Game.spawns.Spawn1.spawnCreep(defaultBody, `UP${Game.time}`, { memory: { role: 'upgrader', working: false, room: Game.spawns.Spawn1.room.name }})
    } else if (harvestersCount < minimumHarvesters) {
        Game.spawns.Spawn1.spawnCreep(defaultBody, `HV${Game.time}`, { memory: { role: 'harvester', working: false, room: Game.spawns.Spawn1.room.name} })
    }
})
