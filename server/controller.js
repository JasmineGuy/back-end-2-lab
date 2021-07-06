const houses = require('./db.json')
let houseId = 4
module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses)
    },
    deleteHouse: (req, res) => {
        let { id } = req.params
        let index = houses.findIndex((house) => {
            return house.id === +id
        })
        houses.splice(index, 1)
        res.status(200).send(houses)
    },
    createHouse: (req, res) => {
        let { address, price, imageURL } = req.body
        let newHouse = {
            id: houseId,
            address: address,
            price: price,
            imageURL: imageURL
        }
        houses.push(newHouse)
        res.status(200).send(houses)
        houseId++
    },
    updateHouse: (req, res) => {
        let { id } = req.params
        let { type } = req.body
        let index = houses.findIndex((house => {
            return house.id === +id
        }))

        if(houses[index].price === 10000000 && type ==='plus'){
            res.status(400).send(`No one could afford such a house`)
        } else if (houses[index].price === 0 && type ==='minus'){
            res.status(400).send(`You cannot be paid for a house`)
        } else if (type ==='plus'){
            houses[index].price += 10000
            res.status(200).send(houses)
        } else if (type ==='minus'){
            houses[index].price -= 10000
            res.status(200).send(houses)
        } else {
            res.sendStatus(400)
        }
    }    
}
