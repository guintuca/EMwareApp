export const MockDataPieChart: any[] = [
	{room: "Living Room", energyConsumptionP: 20},
	{room: "Kitchen", energyConsumptionP: 44},
	{room: "Bedroom 1", energyConsumptionP: 10},
	{room: "Bedroom 2", energyConsumptionP: 14},
	{room: "Bathroom 1", energyConsumptionP: 12},
];

export interface energyConsumption {
	room: string,
	kwh: number
}

export const MockDataBarChart: energyConsumption[] = [
	{room: "Living Room", kwh: 100},
	{room: "Kitchen", kwh: 120},
	{room: "Bedroom 1", kwh: 84},
	{room: "Bedroom 2", kwh: 68},
	{room: "Bathroom 1", kwh: 50}
];

