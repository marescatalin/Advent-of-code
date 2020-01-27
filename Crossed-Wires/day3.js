class Location {
    constructor(direction, magnitude) {
        this.direction = direction
        this.magnitude = magnitude
    }
}

class Coordinates {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class Day3 {
    constructor(input) {
        this.input = input
    }

    resolve() {
        var inputArr = this.parseInput()
        var locations = inputArr.map(wire => wire.map(location => this.parseLocation(location)))
        var startCoordinate = new Coordinates(0, 0)

        var arr = []

        locations.forEach((wireLocations, wireIndex) => {
            if (arr[wireIndex] == undefined) {
                arr[wireIndex] = [startCoordinate]
            }
            wireLocations.forEach((location, _) => {
                arr[wireIndex] = arr[wireIndex].concat(this.getEndCoordinate(arr[wireIndex][arr[wireIndex].length - 1], location))
            })
        })
        
        var nonUnique = []
        for (let index = 0; index < arr[0].length; index++) {
            var wire1L = arr[0][index]

            for (let index2 = 0; index2 < arr[1].length; index2++) {
                var wire2L = arr[1][index2]

                if(wire1L.x == wire2L.x && wire1L.y == wire2L.y) {
                    nonUnique.push(wire1L)
                    break;
                }
            }
        }

        var intersectionPoints = nonUnique.filter(coordinate => coordinate != startCoordinate)
        var manhattanValues = intersectionPoints.map(point => this.manhattan(point))

        return Math.min(...manhattanValues)
    }

    manhattan(coordonate) {
        return (Math.abs(coordonate.x) + Math.abs(coordonate.y))
    }

    parseInput() {
        var wires = this.input.split(/\n/)
        return wires.map(wire => wire.split(','))
    }

    parseLocation(location) {
        var step = location.slice(0, 1)
        var magnitude = parseInt(location.slice(1, location.length))

        return new Location(step, magnitude)
    }

    getEndCoordinate(coordinate, endLocation) {
        var map = {
            "U": { x: 0, y: 1},
            "R": { x: 1, y: 0},
            "D": { x: 0, y: -1},
            "L": { x: -1, y: 0}
        }

        var k = map[endLocation.direction]

        return Array.from(
            Array(endLocation.magnitude), (d, i) => new Coordinates(coordinate.x + (i*k.x) + k.x, coordinate.y + (i*k.y) + k.y)
        )
    }
}

module.exports = { Day3, Location, Coordinates };