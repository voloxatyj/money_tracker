const getDate = new Date();
const dateNow = new Date(
		getDate.getTime() - getDate.getTimezoneOffset() * 60000
	)
	.toISOString()
	.split("T")[0];

export const category = [{
		title: "Salary",
		icon: "money-bill-alt" 
	}, {
		title: "Accessories",
		icon: "ring" 
	}, {
		title: "Clothes",
		icon: "tshirt" 
	}, {
		title: "Electronics",
		icon: "laptop"	
	}, {
		title: "Sport",
		icon: "volleyball-ball"	
	}, {
		title: "Food",
		icon: "apple-alt"	
	}, {
		title: "Restaurant",
		icon: "utensils"	
	}, {
		title: "Bills",
		icon: "faucet"	
	}, {
		title: "Pets",
		icon: "paw"	
	}, {
		title: "Vacation",
		icon: "plane"	
	}, {
		title: "Other",
		icon: "question"
	}]

export const getCategory = [{
		id: "1",
		description: "Dinner with John",
		category: "Food",
		price: 1000,
		date: `${dateNow}`,
	},
	{
		id: "2",
		description: "Suit",
		category: "Clothes",
		price: 8,
		date: `${dateNow}`,
	},

	{
		id: "3",
		description: "Earrings",
		category: "Accessories",
		price: 150,
		date: `${dateNow}`,
	},
	{
		id: "4",
		description: "Blender",
		category: "Electronic",
		price: 120,
		date: `${dateNow}`,
	},
	{
		id: "5",
		description: "Fitness with Ann",
		category: "Sport",
		price: 38,
		date: `${dateNow}`,
	},
	{
		id: "6",
		description: "Weekend in Georgia",
		category: "Vacation",
		price: 120,
		date: `${dateNow}`,
	},
	{
		id: "7",
		description: "donate for my favourite online game",
		category: "Another category",
		price: 120,
		date: `${dateNow}`,
	},
];