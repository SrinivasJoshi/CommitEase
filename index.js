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
	answer.innerHTML = result;
	textarea.value = '';
	loader.style.display = 'none';
});

async function getCommitMessage(text) {
	let query = `Generate a concise and clear commit message with a max limit of 50 characters.I suggest focus on making it more clear and use word limit. Text : "${text}"`;
	let _body = {
		model: 'gpt-3.5-turbo',
		messages: [{ role: 'user', content: query }],
	};
	try {
		let _result = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				//prettier-ignore
				"Authorization": `Bearer TODO: add your api key here`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(_body),
		});
		let result = await _result.json();
		let finalAns = result.choices[0].message.content;
		return finalAns;
	} catch (error) {
		console.log(error);
	}
}
