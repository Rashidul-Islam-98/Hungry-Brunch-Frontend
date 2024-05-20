export interface ITable {
    id: number,
    tableNumber: string,
    numberOfSeats: number,
    isOccupied: boolean,
    image: string,
    employees: {
        employeeTableId: number,
        employeeId: string,
        name: string
    }[]
}