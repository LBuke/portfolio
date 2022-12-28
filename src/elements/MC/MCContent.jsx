import React from "react";
import styled from "styled-components";
import BodyContent from "@elements/Window/BodyContent";

const Iframe = styled.iframe`
	width: 100%;
	height: 95%;
	border: none;
`;

const MCContent = () => {
	const alphabet = "abcdefghijklmnopqrstuvwxyz"
	const generateRandomLetter = () => {
		return alphabet[Math.floor(Math.random() * alphabet.length)]
	}

	const randomNumber = (min, max)  => {
		return Math.random() * (max - min) + min;
	}

	let name = ""
	for (let i = 0; i < randomNumber(4, 15); i++) {
		name += generateRandomLetter()
	}

	return (
		<BodyContent>
			<Iframe
				src={"https://minecraft.js.org/?nick=" + name}
				frameBorder="0"
				title="MC"
			></Iframe>
		</BodyContent>
	);
};

export default MCContent;
