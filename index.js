const button = document.getElementById('btn');
const textarea = document.getElementById('input');
const answer = document.getElementById('answer');
const loader = document.getElementById('loader');

button.addEventListener('click', async () => {
	answer.innerHTML = '';
	loader.style.display = 'block';
	const text = textarea.value;
	if (text === '') {
		loader.style.display = 'none';
		answer.innerHTML = '';
		textarea.value = '';
		alert('Please enter some text');
		return;
	}
	//FETCH API
	let result = await getCommitMessage(text);
	textarea.value = 'ANSWER : ' + result;
	loader.style.display = 'none';
});

async function getCommitMessage(text) {
	let query = `Rewrite this text in tone :conversational,spartan,very less corporate jargon : "${text}"`;
	let _body = {
		model: 'gpt-3.5-turbo',
		messages: [{ role: 'user', content: query }],
	};
	try {
		let _result = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				//prettier-ignore
				"Authorization": `Bearer YOUR-OPENAI-API-KEY`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(_body),
		});
		let result = await _result.json();
		console.log(result);
		let finalAns = result.choices[0].message.content;
		return finalAns;
	} catch (error) {
		console.log(error);
	}
}
