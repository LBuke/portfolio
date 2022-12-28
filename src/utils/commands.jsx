import neofetch from "@utils/neofetch";
//eslint-disable-next-line

const compileResponseHTML = styleMap => {
	return styleMap
		.map(item => {
			return `<span class="${
				item.folder
					? `style3`
					: `${item.executable ? `style2` : `style1`}`
			}">${
				item.link
					? `<a target="_blank" href="${item.link}">${item.name}</a>`
					: `${item.name}`
			}</span>`;
		})
		.join("  ");
};

const getSpaces = commandList => {
	let defaultSpaces = "\t";
	let lengthList = commandList.map(item => {
		return item.name.length;
	});
	// console.log(commandList)
	let max = Math.max(...lengthList);
	let what = commandList.map(item => {
		return Array(max - item.name.length + 1).join(" ") + defaultSpaces;
	});
	return what;
};

const compileCommandHTML = (commandList) => {
	let defArgs = [
		{
			name: "ls",
			description: "lists directory content",
		},
		{
			name: "clear",
			description: "clears the terminal screen",
		},
	];
	let argList = [
		...defArgs,
		...commandList.map(item => {
			let extra = " ";
			if (item.subPathStrict[0]) {
				extra += item.subPathStrict[1].name;
			}
			return {
				name: item.name[0] + extra,
				description: item.description,
			};
		}),
	];
	let spaceList = getSpaces(argList);
	let response = `These shell commands are defined internally.\n<span class="style2">Below is a list of supported commands!</span>\n\n`;
	argList.forEach((item, idx) => {
		let temp = `<span class="style2">${item.name}</span>${spaceList[idx]}${item.description}\n`;
		response += temp;
	});
	return (
		`${response}\nAnd more "hidden" commands...`
	)
};

let commandList = [
	{
		name: ["whoami", "./whoami", "whoami.sh", "./whoami.sh"],
		action: { WHOAMI: "" },
		response: "",
		subPathStrict: [true, { name: ".", response: "" }],
		description: "learn more about me",
	},
	{
		name: ["git"],
		action: true,
		response: "",
		subPathStrict: [true, { name: "log", response: "" }],
		description: "lists my github projects",
	},
	{
		name: ["twitter"],
		action: true,
		response: 'Visit: <a href="https://twitter.com/Ted25519">Ted25519</a>',
		subPathStrict: [false],
		description: "checkout my Twitter profile",
	  },
	  {
		name: ["github"],
		action: true,
		response: 'Visit: <a href="https://github.com/Lbuke">Lbuke</a>',
		subPathStrict: [false],
		description: "checkout my github profile",
	  },
	{
		name: ["help"],
		action: true,
		response: "",
		subPathStrict: [false],
		description: "displays this message ",
	},
];

commandList = commandList.map(item => {
	if (item.name[0].trim().toLowerCase() === "help") {
		item.response = `<pre>${compileCommandHTML(commandList, true)}</pre>`;
	}
	return item;
});

const fileList = [
	{
		name: ".github",
		link: "https://github.com/Lbuke",
		folder: true,
		executable: false,
	},
	{
		name: "src",
		link: "https://github.com/Lbuke/portfolio",
		folder: true,
		executable: false,
	},
	{
		name: "whoami.sh",
		link: "",
		folder: false,
		executable: true,
	},
	{
		name: "projects.app",
		link: "",
		folder: false,
		executable: true,
	},
];

const getCommandList = commandList => {
	let finalCommandList = {};
	commandList.forEach(item => {
		//eslint-disable-next-line
		let commandBuilder = {};
		item.name.forEach(elem => {
			let action = item.action
				? { [item.name[0].toUpperCase()]: "" }
				: null;
			let resp = item.response;
			commandBuilder = {
				[elem]: {
					validArgs: {
						_dir: {
							action: action,
							response: resp,
						},
						default: {
							action: action,
							response: resp,
						},
					},
				},
			};
			if (item.subPathStrict[0]) {
				commandBuilder[elem].validArgs[item.subPathStrict[1].name] = {
					action: action,
					response: item.subPathStrict[1].response,
				};
			}
			finalCommandList = { ...commandBuilder, ...finalCommandList };
		});
	});
	// console.log(finalCommandList)
	return finalCommandList;
};

const commands = {
	ls: {
		validArgs: {
			"/": {
				action: null,
				response:
					"ls: cannot access System Volume Information: Permission Denied",
			},
			_dir: {
				action: null,
				response: compileResponseHTML(fileList),
			},
			default: {
				action: null,
				response: "ls: cannot access %arg%: Permission Denied",
			},
		},
	},
	...getCommandList(commandList),
};

export default commands;
