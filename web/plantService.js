
const fs = require('fs')
const md5 = require('md5')
const path = require('path');

const plants_db = path.resolve(__dirname, '../resources/plants.json')

function get_plant(plants, plant_name) {
    for (const plant of plants) {
        if (plant.name == plant_name) 
            return plant
    }
    
    return null
  }

function add_entry(plants, data) {
    for (const plant of plants) {
        if (plant.name == data.name) {
            plant.entries.push({
                "content": data.content, 
                'hash': md5(JSON.stringify([plant.name, data.content]))
            })
        }
    }

    return plants
}

function change_entry(plants, data) {
    for (const plant of plants) {
        if (plant.name == data.name) {
            for (let entry of plant.entries) {
                if (entry.hash == data.hash) {
                    entry.content = data.content
                    entry.hash = md5(JSON.stringify([plant.name, data.content]))
                }
            }
        }
    }

    return plants
}

function add_plant(plants, data) {
    plants.push({
        "name": data.content,
        "entries": []
    })

    return plants
}

function change_plant(plants, data) {
    for (let plant of plants) {
        if (plant.name == data.name) {
            plant.name = data.content
        }
    }

    return plants
}

function remove_plant(plants, data) {
    return plants.filter(plant => plant.name != data.content)
}

function reading(callback) {
    const read_plants_str = fs.readFileSync(plants_db)

    const plants = JSON.parse(read_plants_str)

    return callback(plants)
}

function writing(callback) {
    const read_plants_str = fs.readFileSync(plants_db)

    let plants = JSON.parse(read_plants_str)

    plants = callback(plants)

    let write_plants_str = JSON.stringify(plants, null, 2);

    fs.writeFileSync(plants_db, write_plants_str)

    return plants
}

const plantService = {
    get_plant: get_plant,
    add_entry: add_entry,
    change_entry: change_entry,
    add_plant: add_plant,
    change_plant: change_plant,
    remove_plant: remove_plant,
    reading: reading,
    writing: writing
};

module.exports = plantService
